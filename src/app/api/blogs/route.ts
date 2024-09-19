import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const blogs = await prisma.user.findMany();

  return NextResponse.json({
    status: 200,
    message: "get blogs success",
    data: blogs,
  });
}

export async function POST() {
  return NextResponse.json({
    status: 400,
    message: "service not found",
  });
}
