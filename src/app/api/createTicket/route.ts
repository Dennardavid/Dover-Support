import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, category, priority } = body;

    if (!title || !description || !category || !priority) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newTicket = await prisma.tickets.create({
      data: {
        title,
        description,
        category,
        priority,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "New Ticket Created", ticket: newTicket },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
