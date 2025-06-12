import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { writeFile } from "fs/promises";
import path from "path";

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

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const priority = formData.get("priority");
    const file = formData.get("upload") as File | null;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof category !== "string" ||
      typeof priority !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      );
    }

    if (!title || !description || !category || !priority) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    /* Uplaod to folder */
    const fileName = file?.name ?? null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(process.cwd(), "public/uploads", file.name);
      await writeFile(filePath, buffer);
    }

    const newTicket = await prisma.tickets.create({
      data: {
        title,
        description,
        category,
        priority,
        screenshot: fileName,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    /* Send the eamil using Automate */
    const automateAPI = process.env.NEXT_PUBLIC_API_URL_CREATE;
    try {
      await fetch(`${automateAPI}`, {
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
      });
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
