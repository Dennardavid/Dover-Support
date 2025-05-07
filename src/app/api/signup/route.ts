import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, discipline, password } = body;

    if (!name || !email || !discipline || !password) {
      return NextResponse.json(
        { message: "All form fields are required" },
        { status: 400 }
      );
    }


    /* Check if User already Exists on the Database */
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 }
      );
    }


    /* Hashing password */
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        discipline,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "User Exists", error },
      { status: 500 }
    );
  }
}
