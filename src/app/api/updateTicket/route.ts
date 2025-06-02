import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const { id, message } = await req.json();
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

    // Fetch the ticket first to get the title
    const ticket = await prisma.tickets.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const updatedTicket = await prisma.tickets.update({
      where: { id },
      data: {
        status: "closed",
        updatedAt: new Date(),
        workNote: message,
      },
    });

    // Notify Power Automate with title instead of ID
    await fetch(
      "https://prod-113.westeurope.logic.azure.com:443/workflows/f0657930896640c7a4464975baf15b6b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ef9vjDxMSuFqPB4gTIl2MFdSBPp8XCd-Cy0St12TI7M",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: ticket.title,
          status: "closed",
          closedAt: updatedTicket.updatedAt,
          workNote: message,
          recipient: {
            name: ticket.author.name,
            email: ticket.author.email,
          },
        }),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to close ticket", { status: 500 });
  }
}
