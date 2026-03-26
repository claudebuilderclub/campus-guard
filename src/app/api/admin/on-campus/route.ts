import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const where: any = {};
    if (q) {
      where.student = {
        OR: [
          { name: { contains: q } },
          { regNumber: { contains: q } },
        ],
      };
    }

    const laptops = await prisma.laptop.findMany({
      where,
      include: {
        student: true,
        gateLogs: {
          orderBy: { timestamp: "desc" as const },
          take: 1,
          include: { verifiedBy: { select: { name: true } } },
        },
      },
    });

    const onCampusLaptops = laptops
      .filter((laptop) => laptop.gateLogs[0]?.type === "ENTRY")
      .map((laptop) => ({
        id: laptop.id,
        serialNumber: laptop.serialNumber,
        brand: laptop.brand,
        model: laptop.model,
        color: laptop.color,
        student: {
          id: laptop.student.id,
          name: laptop.student.name,
          regNumber: laptop.student.regNumber,
          department: laptop.student.department,
        },
        entryGate: laptop.gateLogs[0].gateLocation,
        entryTime: laptop.gateLogs[0].timestamp,
        verifiedBy: laptop.gateLogs[0].verifiedBy?.name || null,
      }));

    return NextResponse.json({
      laptops: onCampusLaptops,
      total: onCampusLaptops.length,
    });
  } catch (error) {
    console.error("On-campus query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch on-campus laptops" },
      { status: 500 }
    );
  }
}
