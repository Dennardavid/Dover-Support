import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.tickets.update({
      where: { id },
      data: {
        status: "open",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to Reopen ticket", { status: 500 });
  }
}
