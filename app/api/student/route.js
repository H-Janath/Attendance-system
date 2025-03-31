import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req, res) {
    
    const data = await req.json();

    const gradeRecord = await prisma.grade.findFirst({
        where: {
            grade: data.grade
        }
    });
    
    if (!gradeRecord) {
        throw new Error("Grade not found");
    }
    const result = await prisma.student.create({
        data: {
            name: data.name,
            gradeId: gradeRecord.id,
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

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
   
    const result = await prisma.student.delete({
       where: { id: Number(id) } // assuming 'id' is a number
    });
        return NextResponse.json(result);
   
}
