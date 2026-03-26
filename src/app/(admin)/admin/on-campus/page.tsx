"use client";

import { useEffect, useState } from "react";

interface OnCampusLaptop {
  id: string;
  serialNumber: string;
  brand: string;
  model: string;
  entryTime: string;
  entryGate: string;
  student: {
    name: string;
    regNumber: string;
  };
}

function getDuration(entryTime: string) {
  const ms = Date.now() - new Date(entryTime).getTime();
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  return { hours, mins, totalHours: ms / 3600000, label: `${hours}h ${mins}m` };
}

function getStatusInfo(totalHours: number) {
  if (totalHours >= 12) {
    return { color: "bg-danger", textColor: "text-danger", label: "Alert", pulse: true };
  }
  if (totalHours >= 8) {
    return { color: "bg-orange-500", textColor: "text-orange-600", label: "Long", pulse: false };
  }
  if (totalHours >= 4) {
    return { color: "bg-warning", textColor: "text-warning", label: "Extended", pulse: false };
  }
  return { color: "bg-success", textColor: "text-success", label: "Normal", pulse: false };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted-light" />
          <div className="space-y-1.5">
            <div className="h-4 w-28 bg-muted-light rounded" />
            <div className="h-3 w-20 bg-muted-light rounded" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1.5">
          <div className="h-4 w-24 bg-muted-light rounded" />
          <div className="h-3 w-32 bg-muted-light rounded" />
        </div>
      </td>
      <td className="px-6 py-4"><div className="h-6 w-20 bg-muted-light rounded-full" /></td>
      <td className="px-6 py-4"><div className="h-4 w-32 bg-muted-light rounded" /></td>
      <td className="px-6 py-4"><div className="h-4 w-16 bg-muted-light rounded" /></td>
      <td className="px-6 py-4"><div className="h-6 w-20 bg-muted-light rounded-full" /></td>
    </tr>
  );
}

export default function OnCampusPage() {
  const [laptops, setLaptops] = useState<OnCampusLaptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [, setTick] = useState(0);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/on-campus${search ? `?q=${encodeURIComponent(search)}` : ""}`
      );
      const data = await res.json();
      setLaptops(data.laptops ?? []);
    } catch {
      setLaptops([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Re-render every minute to keep durations fresh
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchData();
  }

  const alertCount = laptops.filter((l) => getDuration(l.entryTime).totalHours > 12).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Laptops On Campus</h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-light text-primary">
            {laptops.length} laptop{laptops.length !== 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Alert banner */}
      {alertCount > 0 && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-danger-light border border-danger/20 rounded-xl animate-scale-in">
          <div className="w-2 h-2 rounded-full bg-danger animate-pulse shrink-0" />
          <svg className="w-5 h-5 text-danger shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium text-danger">
            {alertCount} laptop{alertCount !== 1 ? "s" : ""} on campus for over 12 hours
          </p>
        </div>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-md">
          <svg
            className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by student name or reg number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm placeholder:text-muted"
          />
        </div>
      </form>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted-light text-xs text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Student</th>
                  <th className="px-6 py-3 text-left font-medium">Laptop</th>
                  <th className="px-6 py-3 text-left font-medium">Entry Gate</th>
                  <th className="px-6 py-3 text-left font-medium">Entry Time</th>
                  <th className="px-6 py-3 text-left font-medium">Duration</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : laptops.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="w-12 h-12 text-muted-light mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="text-muted font-medium">No laptops currently on campus</p>
            <p className="text-muted text-sm mt-1">All clear! No active entries recorded.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted-light text-xs text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Student</th>
                  <th className="px-6 py-3 text-left font-medium">Laptop</th>
                  <th className="px-6 py-3 text-left font-medium">Entry Gate</th>
                  <th className="px-6 py-3 text-left font-medium">Entry Time</th>
                  <th className="px-6 py-3 text-left font-medium">Duration</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {laptops.map((laptop) => {
                  const duration = getDuration(laptop.entryTime);
                  const status = getStatusInfo(duration.totalHours);

                  return (
                    <tr key={laptop.id} className="hover:bg-muted-light/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm font-bold shrink-0">
                            {getInitials(laptop.student.name)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{laptop.student.name}</p>
                            <p className="text-xs text-muted">{laptop.student.regNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">
                          {laptop.brand} {laptop.model}
                        </p>
                        <p className="text-xs font-mono text-muted">{laptop.serialNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                          {laptop.entryGate}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">
                        {new Date(laptop.entryTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {duration.label}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${status.color} ${status.pulse ? "animate-pulse" : ""}`}
                          />
                          <span className={`text-xs font-semibold ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
