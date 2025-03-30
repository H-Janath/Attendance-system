import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const gradeParam = searchParams.get('grade');
    const monthParam = searchParams.get('month'); // e.g., "2025-03"

    if (!gradeParam || !monthParam) {
        return NextResponse.json({ error: "grade and month are required" }, { status: 400 });
    }

    // Get students with that grade
    const students = await prisma.student.findMany({
        where: {
            grade: {
                grade: gradeParam
            }
        },
        include: {
            grade: true,
            attendance: {
                where: {
                    date: {
                        startsWith: monthParam // example: '2025-03'
                    }
                }
            }
        }
    });

    // Flatten the data
    const result = students.flatMap((student) => {
        if (student.attendance.length === 0) {
            return [{
                studentId: student.id,
                name: student.name,
                grade: student.grade.grade,
                attendance: null,
                present: null,
                day: null,
                date: null
            }];
        }

        return student.attendance.map((att) => ({
            studentId: student.id,
            name: student.name,
            grade: student.grade.grade,
            attendance: att.id,
            present: att.present,
            day: att.day,
            date: att.date
        }));
    });

    return NextResponse.json(result);
}
