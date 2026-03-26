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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gate Logs ({total})</h1>

      <div className="flex gap-3 mb-6">
        <select
          value={gate}
          onChange={(e) => { setGate(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Gates</option>
          <option value="Main Gate">Main Gate</option>
          <option value="East Gate">East Gate</option>
          <option value="West Gate">West Gate</option>
          <option value="North Gate">North Gate</option>
          <option value="South Gate">South Gate</option>
        </select>
        <select
          value={type}
          onChange={(e) => { setType(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Types</option>
          <option value="ENTRY">Entry</option>
          <option value="EXIT">Exit</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No logs found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Student</th>
                  <th className="px-6 py-3 text-left">Reg Number</th>
                  <th className="px-6 py-3 text-left">Laptop</th>
                  <th className="px-6 py-3 text-left">Serial Number</th>
                  <th className="px-6 py-3 text-left">Gate</th>
                  <th className="px-6 py-3 text-left">Verified By</th>
                  <th className="px-6 py-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${log.type === "ENTRY" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{log.laptop.student.name}</td>
                    <td className="px-6 py-3 text-sm font-mono text-gray-700">{log.laptop.student.regNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.laptop.brand} {log.laptop.model}</td>
                    <td className="px-6 py-3 text-sm font-mono text-gray-500">{log.laptop.serialNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.gateLocation}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.verifiedBy.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
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
