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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gate Staff</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Gate Staff"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">New Gate Staff Member</h3>
          {formError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{formError}</div>
          )}
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required minLength={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Gate</label>
              <select name="gateLocation" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {formLoading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : gatemen.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No gate staff members yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Assigned Gate</th>
                  <th className="px-6 py-3 text-left">Verifications</th>
                  <th className="px-6 py-3 text-left">Joined</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gatemen.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{g.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{g.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{g.gateLocation || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{g._count.gateLogs}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(g.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(g.id, g.name)}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
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
