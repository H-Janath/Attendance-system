import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const prisma = new PrismaClient();
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
