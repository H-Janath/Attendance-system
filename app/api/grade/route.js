import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
export async function GET(req){

    const prisma = new PrismaClient();

    const result = await prisma.grade.findMany();
    return NextResponse.json(result)
}