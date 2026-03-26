import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 });
  }

  // Search by reg number or serial number
  const student = await prisma.student.findFirst({
    where: {
      OR: [
        { regNumber: { equals: q } },
        { laptops: { some: { serialNumber: { equals: q } } } },
      ],
    },
    include: {
      laptops: {
        include: {
          gateLogs: {
            take: 5,
            orderBy: { timestamp: "desc" },
            include: { verifiedBy: { select: { name: true } } },
          },
        },
      },
    },
  });

  if (!student) {
    // Also try partial match
    const partialStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { regNumber: { contains: q } },
          { name: { contains: q } },
          { laptops: { some: { serialNumber: { contains: q } } } },
        ],
      },
      include: {
        laptops: {
          include: {
            gateLogs: {
              take: 5,
              orderBy: { timestamp: "desc" },
              include: { verifiedBy: { select: { name: true } } },
            },
          },
        },
      },
    });

    if (!partialStudent) {
      return NextResponse.json({ error: "No student or laptop found" }, { status: 404 });
    }

    return NextResponse.json({ student: partialStudent });
  }

  return NextResponse.json({ student });
}
