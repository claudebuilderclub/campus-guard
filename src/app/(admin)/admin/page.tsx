"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalStudents: number;
  totalLaptops: number;
  totalGatemen: number;
  logsToday: number;
  recentLogs: any[];
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return <div className="flex items-center justify-center py-20 text-gray-400">Loading...</div>;
  }

  const cards = [
    { label: "Total Students", value: stats.totalStudents, color: "blue" },
    { label: "Total Laptops", value: stats.totalLaptops, color: "green" },
    { label: "Gate Staff", value: stats.totalGatemen, color: "purple" },
    { label: "Logs Today", value: stats.logsToday, color: "orange" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${colorMap[card.color]?.split(" ")[1] || "text-gray-900"}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        </div>
        {stats.recentLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No activity yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Student</th>
                  <th className="px-6 py-3 text-left">Laptop</th>
                  <th className="px-6 py-3 text-left">Gate</th>
                  <th className="px-6 py-3 text-left">Verified By</th>
                  <th className="px-6 py-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentLogs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${log.type === "ENTRY" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <p className="font-medium">{log.laptop.student.name}</p>
                      <p className="text-gray-500">{log.laptop.student.regNumber}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {log.laptop.brand} {log.laptop.model}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.gateLocation}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.verifiedBy.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">
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
