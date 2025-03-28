import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req, res) {
    
    const data = await req.json();
        const result = await prisma.student.create({
            data: {
                name: data.name,
                grade: data.grade,
                address: data.address,
                contact: data.contact
            }
        });

        return NextResponse.json(result);
}

export async function GET(req) {

    const result = await prisma.student.findMany();
    return NextResponse.json(result);
}