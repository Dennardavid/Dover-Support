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

    try {
      await fetch(
        "https://prod-240.westeurope.logic.azure.com:443/workflows/fc620f3f75514582908ae47ddce451e3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QUGS699C0FFE8Pm19Bh5OlEtaVdIMcqyiDa67awJIWU",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category,
            priority,
            user: {
              name: user.name,
              email: user.email,
            },
          }),
        }
      );
    } catch (automateError) {
      console.error("Power Automate error:", automateError);
    }

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
