import { prisma } from "@/lib/prisma";
import { hash, genSalt } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: "En bruker med samme e-postadresse eksisterer allerede.",
        }),
        {
          status: 409,
        }
      );
    }

    const salt = await genSalt(12);
    const hashed = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    return new NextResponse(
      JSON.stringify({
        user: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: user.role,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
