import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { laptopId, type, notes } = await request.json();

    if (!laptopId || !type || !["ENTRY", "EXIT"].includes(type)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const gateLog = await prisma.gateLog.create({
      data: {
        type,
        gateLocation: session.user.gateLocation || "Main Gate",
        notes,
        laptopId,
        verifiedById: session.user.id,
      },
      include: {
        laptop: { include: { student: true } },
        verifiedBy: { select: { name: true } },
      },
    });

    return NextResponse.json({ gateLog });
  } catch (error) {
    console.error("Gate log error:", error);
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const gate = searchParams.get("gate") || "";
  const type = searchParams.get("type") || "";

  const where: any = {};
  if (gate) where.gateLocation = gate;
  if (type) where.type = type;

  const [logs, total] = await Promise.all([
    prisma.gateLog.findMany({
      where,
      include: {
        laptop: { include: { student: true } },
        verifiedBy: { select: { name: true } },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { timestamp: "desc" },
    }),
    prisma.gateLog.count({ where }),
  ]);

  return NextResponse.json({ logs, total, page, limit });
}
