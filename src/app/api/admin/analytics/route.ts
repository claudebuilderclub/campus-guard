import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // --- dailyStats (last 14 days) ---
    const dailyStats = [];
    for (let i = 13; i >= 0; i--) {
      const start = new Date();
      start.setDate(start.getDate() - i);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const [entries, exits] = await Promise.all([
        prisma.gateLog.count({
          where: { timestamp: { gte: start, lt: end }, type: "ENTRY" },
        }),
        prisma.gateLog.count({
          where: { timestamp: { gte: start, lt: end }, type: "EXIT" },
        }),
      ]);

      dailyStats.push({
        date: start.toISOString().split("T")[0],
        entries,
        exits,
      });
    }

    // --- gateUsage ---
    const gateData = await prisma.gateLog.groupBy({
      by: ["gateLocation"],
      _count: { id: true },
    });
    const gateUsage = gateData.map((g) => ({
      gate: g.gateLocation,
      count: g._count.id,
    }));

    // --- hourlyActivity ---
    const allLogs = await prisma.gateLog.findMany({
      select: { timestamp: true },
    });
    const hourBuckets = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: 0,
    }));
    for (const log of allLogs) {
      const hour = new Date(log.timestamp).getHours();
      hourBuckets[hour].count++;
    }

    // --- summary ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [entriesToday, exitsToday] = await Promise.all([
      prisma.gateLog.count({
        where: { timestamp: { gte: today, lt: tomorrow }, type: "ENTRY" },
      }),
      prisma.gateLog.count({
        where: { timestamp: { gte: today, lt: tomorrow }, type: "EXIT" },
      }),
    ]);

    // On-campus count: laptops whose most recent log is ENTRY
    const laptops = await prisma.laptop.findMany({
      include: {
        gateLogs: {
          orderBy: { timestamp: "desc" as const },
          take: 1,
        },
      },
    });
    const onCampus = laptops.filter(
      (l) => l.gateLogs[0]?.type === "ENTRY"
    ).length;

    return NextResponse.json({
      dailyStats,
      gateUsage,
      hourlyActivity: hourBuckets,
      summary: {
        onCampus,
        entriesToday,
        exitsToday,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
