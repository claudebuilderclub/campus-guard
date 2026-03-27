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

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:inline">Campus Guard</span>
            </div>

            {/* Gate location badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-ring" />
              {session?.user?.gateLocation || "Gate"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:inline">{session?.user?.name}</span>
            <Link
              href="/register"
              className="px-3.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors focus-ring"
            >
              + Register Laptop
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-3.5 py-1.5 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors focus-ring"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3.5 py-1.5 text-sm font-medium text-muted hover:text-foreground hover:bg-muted-light rounded-lg transition-colors focus-ring"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Search Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Verify Student</h2>
          <p className="text-sm text-muted">Search by registration number or laptop serial number</p>
        </div>

        <form onSubmit={handleSearch} className="mb-10 animate-slide-up">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter registration number or serial number..."
                className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl focus-ring outline-none text-xl text-foreground bg-card placeholder:text-muted/60 transition-shadow"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-8 py-3.5 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark disabled:opacity-50 transition-all focus-ring shadow-lg shadow-primary/25"
            >
              {searching ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Searching
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>

        {/* Search Error */}
        {searchError && (
          <div className="mb-8 max-w-2xl mx-auto animate-scale-in">
            <div className="bg-danger-light border border-danger/20 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-danger text-sm">Student Not Found</h4>
                <p className="text-danger/80 text-sm mt-0.5">
                  {searchError} &mdash; This laptop or student is not registered in the system.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Log Success Message */}
        {logMessage && (
          <div className="mb-8 max-w-2xl mx-auto animate-scale-in">
            <div
              className={`rounded-xl px-5 py-3.5 flex items-center gap-3 ${
                logMessage.includes("success")
                  ? "bg-success-light border border-success/20"
                  : "bg-danger-light border border-danger/20"
              }`}
            >
              {logMessage.includes("success") ? (
                <svg className="w-5 h-5 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-danger shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span
                className={`text-sm font-semibold ${
                  logMessage.includes("success") ? "text-success" : "text-danger"
                }`}
              >
                {logMessage}
              </span>
            </div>
          </div>
        )}

        {/* Student Result */}
        {student && (
          <div className="mb-10 animate-scale-in">
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              {/* Green verified header */}
              <div className="bg-success-light border-b border-success/20 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-success text-base">Verified Student</h3>
                  <p className="text-xs text-success/70">Student found in the system</p>
                </div>
              </div>

              {/* Student info */}
              <div className="p-6">
                <div className="flex items-start gap-5 mb-6">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">{getInitials(student.name)}</span>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 flex-1 min-w-0">
                    <div>
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-0.5">Name</p>
                      <p className="font-semibold text-foreground text-sm truncate">{student.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-0.5">Reg Number</p>
                      <p className="font-semibold text-foreground text-sm font-mono">{student.regNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-0.5">Department</p>
                      <p className="font-semibold text-foreground text-sm truncate">{student.department}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-0.5">Phone</p>
                      <p className="font-semibold text-foreground text-sm">{student.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Laptops */}
                <div className="border-t border-border pt-5">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Registered Laptops ({student.laptops.length})
                  </h4>
                  <div className="space-y-3">
                    {student.laptops.map((laptop) => (
                      <div
                        key={laptop.id}
                        className="border border-border rounded-xl p-4 bg-background/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground text-sm">
                                {laptop.brand} {laptop.model}
                              </p>
                              <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                                {laptop.color}
                              </span>
                            </div>
                            <p className="text-xs text-muted font-mono">
                              S/N: {laptop.serialNumber}
                            </p>
                            {laptop.gateLogs.length > 0 && (
                              <p className="text-[11px] text-muted/70 mt-1.5 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Last: {laptop.gateLogs[0].type} at {laptop.gateLogs[0].gateLocation} &mdash;{" "}
                                {new Date(laptop.gateLogs[0].timestamp).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleLog(laptop.id, "ENTRY")}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-success text-white rounded-lg text-sm font-semibold hover:bg-success/90 transition-all focus-ring shadow-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                              Entry
                            </button>
                            <button
                              onClick={() => handleLog(laptop.id, "EXIT")}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-warning text-white rounded-lg text-sm font-semibold hover:bg-warning/90 transition-all focus-ring shadow-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Exit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Logs */}
        <div className="animate-fade-in">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-2">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="font-bold text-foreground text-sm">Recent Gate Logs</h3>
            </div>
            {recentLogs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted-light mb-3">
                  <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-muted">No logs yet</p>
                <p className="text-xs text-muted/60 mt-0.5">Gate activity will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted-light/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Type</th>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Student</th>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Laptop</th>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Gate</th>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Verified By</th>
                      <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted uppercase tracking-widest">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted-light/30 transition-colors">
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                              log.type === "ENTRY"
                                ? "bg-success-light text-success border border-success/20"
                                : "bg-warning-light text-warning border border-warning/20"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${log.type === "ENTRY" ? "bg-success" : "bg-warning"}`} />
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <p className="text-sm font-semibold text-foreground">{log.laptop.student.name}</p>
                          <p className="text-xs text-muted font-mono">{log.laptop.student.regNumber}</p>
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground/80">
                          {log.laptop.brand} {log.laptop.model}
                        </td>
                        <td className="px-6 py-3 text-sm text-foreground/80">{log.gateLocation}</td>
                        <td className="px-6 py-3 text-sm text-foreground/80">{log.verifiedBy.name}</td>
                        <td className="px-6 py-3 text-xs text-muted">
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
      </main>
    </div>
  );
}
