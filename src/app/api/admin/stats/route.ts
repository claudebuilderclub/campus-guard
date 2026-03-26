import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalStudents, totalLaptops, totalGatemen, logsToday, recentLogs, allLaptopsWithLastLog] = await Promise.all([
    prisma.student.count(),
    prisma.laptop.count(),
    prisma.user.count({ where: { role: "GATEMAN" } }),
    prisma.gateLog.count({ where: { timestamp: { gte: today } } }),
    prisma.gateLog.findMany({
      take: 10,
      orderBy: { timestamp: "desc" },
      include: {
        laptop: { include: { student: true } },
        verifiedBy: { select: { name: true } },
      },
    }),
    prisma.laptop.findMany({
      include: {
        gateLogs: {
          orderBy: { timestamp: "desc" as const },
          take: 1,
        },
      },
    }),
  ]);

  const onCampusCount = allLaptopsWithLastLog.filter(
    (l) => l.gateLogs[0]?.type === "ENTRY"
  ).length;

  return NextResponse.json({
    totalStudents,
    totalLaptops,
    totalGatemen,
    logsToday,
    recentLogs,
    onCampusCount,
  });
}
