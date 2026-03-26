"use client";

import { useEffect, useState } from "react";

interface GateLog {
  id: string;
  type: string;
  gateLocation: string;
  timestamp: string;
  notes: string | null;
  laptop: { serialNumber: string; brand: string; model: string; student: { name: string; regNumber: string } };
  verifiedBy: { name: string };
}

export default function LogsPage() {
  const [logs, setLogs] = useState<GateLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [gate, setGate] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [page, gate, type]);

  async function fetchLogs() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (gate) params.set("gate", gate);
    if (type) params.set("type", type);

    const res = await fetch(`/api/gate-logs?${params}`);
    const data = await res.json();
    setLogs(data.logs);
    setTotal(data.total);
    setLoading(false);
  }

  const totalPages = Math.ceil(total / 20);

  function renderPageNumbers() {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Gate Logs <span className="text-muted font-normal text-lg">({total})</span>
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <svg className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select
            value={gate}
            onChange={(e) => { setGate(e.target.value); setPage(1); }}
            className="pl-9 pr-8 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm appearance-none cursor-pointer"
          >
            <option value="">All Gates</option>
            <option value="Main Gate">Main Gate</option>
            <option value="East Gate">East Gate</option>
            <option value="West Gate">West Gate</option>
            <option value="North Gate">North Gate</option>
            <option value="South Gate">South Gate</option>
          </select>
        </div>
        <select
          value={type}
          onChange={(e) => { setType(e.target.value); setPage(1); }}
          className="px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm appearance-none cursor-pointer pr-8"
        >
          <option value="">All Types</option>
          <option value="ENTRY">Entry</option>
          <option value="EXIT">Exit</option>
        </select>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-5 w-16 bg-muted-light rounded-full" />
                <div className="h-4 w-28 bg-muted-light rounded" />
                <div className="h-4 w-24 bg-muted-light rounded" />
                <div className="h-4 w-32 bg-muted-light rounded" />
                <div className="h-4 w-28 bg-muted-light rounded" />
                <div className="h-4 w-20 bg-muted-light rounded" />
                <div className="h-4 w-24 bg-muted-light rounded" />
                <div className="h-4 w-36 bg-muted-light rounded" />
              </div>
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-muted-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="text-muted font-medium">No logs found</p>
            <p className="text-muted text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted-light text-xs text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Student</th>
                  <th className="px-6 py-3 text-left font-medium">Reg Number</th>
                  <th className="px-6 py-3 text-left font-medium">Laptop</th>
                  <th className="px-6 py-3 text-left font-medium">Serial Number</th>
                  <th className="px-6 py-3 text-left font-medium">Gate</th>
                  <th className="px-6 py-3 text-left font-medium">Verified By</th>
                  <th className="px-6 py-3 text-left font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted-light/50 transition-colors">
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${log.type === "ENTRY" ? "bg-success-light text-success" : "bg-warning-light text-warning"}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{log.laptop.student.name}</td>
                    <td className="px-6 py-3 text-sm font-mono text-muted">{log.laptop.student.regNumber}</td>
                    <td className="px-6 py-3 text-sm text-muted">{log.laptop.brand} {log.laptop.model}</td>
                    <td className="px-6 py-3 text-sm font-mono text-muted">{log.laptop.serialNumber}</td>
                    <td className="px-6 py-3 text-sm text-muted">{log.gateLocation}</td>
                    <td className="px-6 py-3 text-sm text-muted">{log.verifiedBy.name}</td>
                    <td className="px-6 py-3 text-sm text-muted">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted">
              Page {page} of {totalPages} ({total} logs)
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-40 hover:bg-muted-light transition-colors text-muted"
              >
                Previous
              </button>
              {renderPageNumbers().map((p, i) =>
                typeof p === "string" ? (
                  <span key={`dots-${i}`} className="px-2 text-muted text-sm">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-sm rounded-lg font-medium transition-colors ${
                      page === p
                        ? "bg-primary text-white"
                        : "text-muted hover:bg-muted-light border border-border"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-40 hover:bg-muted-light transition-colors text-muted"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
