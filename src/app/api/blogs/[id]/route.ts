import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const prisma = new PrismaClient();

    // Check if the ID is a valid number
    if (isNaN(id)) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    // Check if the blog exists in the database
    const blogExists = await prisma.user.count({
      where: { id },
    });

    if (blogExists === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Fetch the user details
    const blog = await prisma.user.findUnique({
      where: { id },
    });

    return NextResponse.json({
      status: 200,
      message: "Get user success",
      data: blog,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function POST() {
  return NextResponse.json({
    status: 400,
    message: "service not found",
  });
}
