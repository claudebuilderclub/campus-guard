"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      regNumber: formData.get("regNumber"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      department: formData.get("department"),
      serialNumber: formData.get("serialNumber"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      color: formData.get("color"),
    };

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Registration failed");
      } else {
        setSuccess(result);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background mesh-gradient">
        {/* Nav */}
        <nav className="glass sticky top-0 z-50 border-b border-border/50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="font-bold text-foreground text-lg">Campus Guard</span>
            </Link>
            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-center px-4 py-20">
          <div className="max-w-lg w-full text-center animate-scale-in">
            {/* Confetti-like decorative dots */}
            <div className="relative inline-block mb-6">
              <div className="absolute -top-3 -left-3 w-3 h-3 bg-primary rounded-full animate-fade-in stagger-1" />
              <div className="absolute -top-1 -right-4 w-2 h-2 bg-accent rounded-full animate-fade-in stagger-2" />
              <div className="absolute -bottom-2 -left-5 w-2 h-2 bg-warning rounded-full animate-fade-in stagger-3" />
              <div className="absolute -bottom-3 right-0 w-3 h-3 bg-success rounded-full animate-fade-in stagger-4" />
              <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-danger rounded-full animate-fade-in stagger-2" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 w-2 h-2 bg-primary rounded-full animate-fade-in stagger-3" />

              {/* Green checkmark */}
              <div className="w-20 h-20 bg-success-light rounded-full flex items-center justify-center mx-auto border-2 border-success/20">
                <svg className="w-10 h-10 text-success animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted mb-8">{success.message}</p>

            {/* Summary card */}
            <div className="bg-card border border-border rounded-2xl p-6 text-left mb-8 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Registered Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted">Student</span>
                  <span className="text-sm font-medium text-foreground">{success.student.name}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted">Reg Number</span>
                  <span className="text-sm font-mono font-medium text-foreground bg-muted-light px-2.5 py-0.5 rounded-lg">{success.student.regNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setSuccess(null); setError(""); }}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/25"
              >
                Register Another Laptop
              </button>
              <Link
                href="/"
                className="flex-1 py-3 bg-muted-light text-foreground rounded-xl font-semibold hover:bg-border transition-colors text-center"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background mesh-gradient">
      {/* Nav */}
      <nav className="glass sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="font-bold text-foreground text-lg">Campus Guard</span>
          </Link>
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Register Your Laptop</h1>
          <p className="text-muted max-w-lg mx-auto">
            Fill in your details and laptop information to get registered in the campus verification system.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-10 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md shadow-primary/25">
              1
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">Student Info</span>
          </div>
          <div className="w-10 h-px bg-border" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-muted-light text-muted rounded-full flex items-center justify-center text-sm font-semibold border border-border">
              2
            </div>
            <span className="text-sm font-medium text-muted hidden sm:inline">Laptop Info</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-danger-light border border-danger/20 text-danger rounded-xl flex items-center gap-3 animate-scale-in">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Student Information */}
          <div className="bg-card rounded-2xl shadow-lg shadow-black/5 border border-border p-6 sm:p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Student Information</h2>
                <p className="text-xs text-muted">Your personal and academic details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Registration Number</label>
                <input
                  name="regNumber"
                  type="text"
                  required
                  pattern="\d{9}"
                  title="Must be exactly 9 digits"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="223019918"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
                <input
                  name="department"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="john@student.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="08012345678"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Laptop Information */}
          <div className="bg-card rounded-2xl shadow-lg shadow-black/5 border border-border p-6 sm:p-8 animate-slide-up stagger-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Laptop Information</h2>
                <p className="text-xs text-muted">Details about your laptop device</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Serial Number</label>
                <input
                  name="serialNumber"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="SN-XXXX-XXXX-XXXX"
                />
                <p className="text-xs text-muted mt-1.5">Usually found on the bottom of your laptop or in system settings</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Brand</label>
                <select
                  name="brand"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground bg-background appearance-none"
                  defaultValue=""
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                >
                  <option value="" disabled>Select brand</option>
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Apple">Apple</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Toshiba">Toshiba</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Model</label>
                <input
                  name="model"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="Pavilion 15, ThinkPad X1, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Color</label>
                <input
                  name="color"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-foreground placeholder:text-muted/60 bg-background"
                  placeholder="Silver, Black, etc."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg shadow-lg shadow-primary/25"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registering...
              </span>
            ) : (
              "Register Laptop"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
