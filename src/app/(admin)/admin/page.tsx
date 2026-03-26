"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalStudents: number;
  totalLaptops: number;
  totalGatemen: number;
  logsToday: number;
  recentLogs: any[];
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-muted-light" />
        <div className="space-y-2">
          <div className="h-7 w-16 bg-muted-light rounded" />
          <div className="h-4 w-24 bg-muted-light rounded" />
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="px-6 py-4 border-b border-border">
        <div className="h-5 w-32 bg-muted-light rounded" />
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 w-16 bg-muted-light rounded" />
            <div className="h-4 w-32 bg-muted-light rounded" />
            <div className="h-4 w-24 bg-muted-light rounded" />
            <div className="h-4 w-20 bg-muted-light rounded" />
            <div className="h-4 w-28 bg-muted-light rounded" />
            <div className="h-4 w-36 bg-muted-light rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonTable />
      </div>
    );
  }

  const cards = [
    {
      label: "Students",
      value: stats.totalStudents,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Laptops",
      value: stats.totalLaptops,
      iconBg: "bg-success-light",
      iconColor: "text-success",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Gate Staff",
      value: stats.totalGatemen,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: "Today's Logs",
      value: stats.logsToday,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`bg-card rounded-2xl border border-border p-6 animate-slide-up stagger-${i + 1} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
                <p className="text-sm text-muted">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Activity
          </h3>
        </div>
        {stats.recentLogs.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-muted-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-muted">No activity yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted-light text-xs text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Student</th>
                  <th className="px-6 py-3 text-left font-medium">Laptop</th>
                  <th className="px-6 py-3 text-left font-medium">Gate</th>
                  <th className="px-6 py-3 text-left font-medium">Verified By</th>
                  <th className="px-6 py-3 text-left font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentLogs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-muted-light/50 transition-colors">
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${log.type === "ENTRY" ? "bg-success-light text-success" : "bg-warning-light text-warning"}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <p className="font-medium text-foreground">{log.laptop.student.name}</p>
                      <p className="text-muted text-xs">{log.laptop.student.regNumber}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted">
                      {log.laptop.brand} {log.laptop.model}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted">{log.gateLocation}</td>
                    <td className="px-6 py-3 text-sm text-muted">{log.verifiedBy.name}</td>
                    <td className="px-6 py-3 text-sm text-muted">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
