import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const userRole = session?.user?.role;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userTickets =
      userRole === "ADMIN"
        ? await prisma.tickets.findMany({
            orderBy: {
              createAt: "desc",
            },
          })
        : await prisma.tickets.findMany({
            where: {
              author: {
                email: userEmail,
              },
            },
            orderBy: {
              createAt: "desc",
            },
          });

    return NextResponse.json(userTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
