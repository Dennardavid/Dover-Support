
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { id, message } = await req.json();

  try {
    await prisma.tickets.update({
      where: { id },
      data: {
        status: "closed",
        updatedAt: new Date(),
        workNote: message
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to close ticket", { status: 500 });
  }
}
