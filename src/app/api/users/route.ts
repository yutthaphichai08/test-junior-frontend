import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return NextResponse.json({
    status: 200,
    message: "get users success",
    data: users,
  });
}

export async function POST() {
  return NextResponse.json({
    status: 400,
    message: "service not found",
  });
}
