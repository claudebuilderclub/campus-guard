"use client";

import { useEffect, useState } from "react";

interface Gateman {
  id: string;
  name: string;
  email: string;
  gateLocation: string | null;
  createdAt: string;
  _count: { gateLogs: number };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function GatemenPage() {
  const [gatemen, setGatemen] = useState<Gateman[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchGatemen();
  }, []);

  async function fetchGatemen() {
    setLoading(true);
    const res = await fetch("/api/gatemen");
    const data = await res.json();
    setGatemen(data.gatemen);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      gateLocation: formData.get("gateLocation"),
    };

    const res = await fetch("/api/gatemen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowForm(false);
      fetchGatemen();
    } else {
      const data = await res.json();
      setFormError(data.error || "Failed to create");
    }
    setFormLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove ${name} from gate staff?`)) return;

    await fetch(`/api/gatemen?id=${id}`, { method: "DELETE" });
    fetchGatemen();
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gate Staff</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            showForm
              ? "bg-muted-light text-muted hover:bg-border"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {showForm ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Gate Staff
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-scale-in">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            New Gate Staff Member
          </h3>
          {formError && (
            <div className="mb-4 p-3 bg-danger-light text-danger rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formError}
            </div>
          )}
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input name="name" required className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input name="email" type="email" required className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input name="password" type="password" required minLength={6} className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm" placeholder="Min. 6 characters" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Assigned Gate</label>
              <select name="gateLocation" required className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-foreground focus-ring text-sm">
                <option value="">Select gate</option>
                <option value="Main Gate">Main Gate</option>
                <option value="East Gate">East Gate</option>
                <option value="West Gate">West Gate</option>
                <option value="North Gate">North Gate</option>
                <option value="South Gate">South Gate</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={formLoading}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark disabled:opacity-50 transition-colors"
              >
                {formLoading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-muted-light" />
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-muted-light rounded" />
                  <div className="h-3 w-36 bg-muted-light rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-muted-light rounded" />
                <div className="h-3 w-20 bg-muted-light rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : gatemen.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <svg className="w-12 h-12 text-muted-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-muted font-medium">No gate staff members yet</p>
          <p className="text-muted text-sm mt-1">Click "Add Gate Staff" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gatemen.map((g, i) => (
            <div
              key={g.id}
              className={`bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow animate-slide-up stagger-${Math.min(i + 1, 4)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">
                    {getInitials(g.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{g.name}</p>
                    <p className="text-muted text-sm">{g.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(g.id, g.name)}
                  className="p-1.5 text-muted hover:text-danger hover:bg-danger-light rounded-lg transition-colors"
                  title="Remove staff member"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {g.gateLocation ? (
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
                      {g.gateLocation}
                    </span>
                  ) : (
                    <span className="text-sm text-muted">Unassigned</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{g._count.gateLogs} verifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Joined {new Date(g.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
