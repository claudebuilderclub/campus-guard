import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const studentSchema = z.object({
  regNumber: z.string().regex(/^\d{9}$/, "Registration number must be exactly 9 digits"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  department: z.string().min(2, "Department is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  color: z.string().min(1, "Color is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = studentSchema.parse(body);

    const existingStudent = await prisma.student.findUnique({
      where: { regNumber: data.regNumber },
    });

    const existingLaptop = await prisma.laptop.findUnique({
      where: { serialNumber: data.serialNumber },
    });

    if (existingLaptop) {
      return NextResponse.json(
        { error: "A laptop with this serial number is already registered" },
        { status: 400 }
      );
    }

    if (existingStudent) {
      // Student exists, just add the new laptop
      const laptop = await prisma.laptop.create({
        data: {
          serialNumber: data.serialNumber,
          brand: data.brand,
          model: data.model,
          color: data.color,
          studentId: existingStudent.id,
        },
      });

      return NextResponse.json({
        message: "Laptop added to existing student registration",
        student: existingStudent,
        laptop,
      });
    }

    // Create new student and laptop
    const student = await prisma.student.create({
      data: {
        regNumber: data.regNumber,
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        laptops: {
          create: {
            serialNumber: data.serialNumber,
            brand: data.brand,
            model: data.model,
            color: data.color,
          },
        },
      },
      include: { laptops: true },
    });

    return NextResponse.json({
      message: "Registration successful",
      student,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { regNumber: { contains: search } },
          { email: { contains: search } },
        ],
      }
    : {};

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: { laptops: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.count({ where }),
  ]);

  return NextResponse.json({ students, total, page, limit });
}
