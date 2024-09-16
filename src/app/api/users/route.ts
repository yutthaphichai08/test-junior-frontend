import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return NextResponse.json({
    status: 200,
    message: "get users success",
    data: users,
  });
}


