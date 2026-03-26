"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface Laptop {
  id: string;
  serialNumber: string;
  brand: string;
  model: string;
  color: string;
  gateLogs: {
    id: string;
    type: string;
    gateLocation: string;
    timestamp: string;
    verifiedBy: { name: string };
  }[];
}

interface Student {
  id: string;
  regNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  laptops: Laptop[];
}

interface GateLog {
  id: string;
  type: string;
  gateLocation: string;
  timestamp: string;
  notes: string | null;
  laptop: { serialNumber: string; brand: string; model: string; student: { name: string; regNumber: string } };
  verifiedBy: { name: string };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [recentLogs, setRecentLogs] = useState<GateLog[]>([]);
  const [logMessage, setLogMessage] = useState("");

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  async function fetchRecentLogs() {
    const res = await fetch("/api/gate-logs?limit=10");
    if (res.ok) {
      const data = await res.json();
      setRecentLogs(data.logs);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setSearchError("");
    setStudent(null);
    setLogMessage("");

    try {
      const res = await fetch(`/api/verify?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setSearchError(data.error || "Not found");
      } else {
        setStudent(data.student);
      }
    } catch {
      setSearchError("Network error");
    } finally {
      setSearching(false);
    }
  }

  async function handleLog(laptopId: string, type: "ENTRY" | "EXIT") {
    setLogMessage("");
    try {
      const res = await fetch("/api/gate-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ laptopId, type }),
      });

      if (res.ok) {
        setLogMessage(`${type} logged successfully`);
        fetchRecentLogs();
      } else {
        setLogMessage("Failed to log");
      }
    } catch {
      setLogMessage("Network error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gate Verification Dashboard</h1>
            <p className="text-sm text-gray-500">
              {session?.user?.gateLocation || "Gate"} &middot; {session?.user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter registration number or laptop serial number..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              autoFocus
            />
            <button
              type="submit"
              disabled={searching}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {searching ? "Searching..." : "Verify"}
            </button>
          </div>
        </form>

        {/* Search Error */}
        {searchError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{searchError}</span> — This laptop/student is not registered in the system.
          </div>
        )}

        {/* Log Message */}
        {logMessage && (
          <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${logMessage.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {logMessage}
          </div>
        )}

        {/* Student Result */}
        {student && (
          <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-50 border-b border-green-100 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Verified Student</h3>
                <p className="text-sm text-green-600">Student found in the system</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="font-semibold text-gray-900">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Reg Number</p>
                  <p className="font-semibold text-gray-900">{student.regNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Department</p>
                  <p className="font-semibold text-gray-900">{student.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="font-semibold text-gray-900">{student.phone}</p>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Registered Laptops ({student.laptops.length})</h4>
              <div className="space-y-3">
                {student.laptops.map((laptop) => (
                  <div key={laptop.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {laptop.brand} {laptop.model}
                        </p>
                        <p className="text-sm text-gray-500">
                          S/N: {laptop.serialNumber} &middot; Color: {laptop.color}
                        </p>
                        {laptop.gateLogs.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            Last activity: {laptop.gateLogs[0].type} at {laptop.gateLogs[0].gateLocation} ({new Date(laptop.gateLogs[0].timestamp).toLocaleString()})
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLog(laptop.id, "ENTRY")}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Log Entry
                        </button>
                        <button
                          onClick={() => handleLog(laptop.id, "EXIT")}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                        >
                          Log Exit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Logs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold text-gray-900">Recent Gate Logs</h3>
          </div>
          {recentLogs.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No logs yet</div>
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
                  {recentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${log.type === "ENTRY" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <p className="font-medium text-gray-900">{log.laptop.student.name}</p>
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
      </main>
    </div>
  );
}
