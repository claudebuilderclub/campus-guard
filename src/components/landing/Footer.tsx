import Link from "next/link";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Staff Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function Footer() {
  return (
    <footer>
      {/* Top gradient border */}
      <div
        className="h-[2px]"
        style={{
          background: "linear-gradient(90deg, var(--primary), var(--accent))",
        }}
      />

      <div
        className="py-16 px-4"
        style={{ backgroundColor: "#0f172a", color: "rgba(255,255,255,0.6)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#da7756"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-white font-bold text-lg">
                  Campus Guard
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                A modern campus laptop security system that makes gate
                verification fast, reliable, and transparent.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Built with */}
            <div>
              <h4 className="text-white font-semibold mb-4">Built With</h4>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Built with Claude
              </div>
              <p className="mt-3 text-sm">Claude Builder Club</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p>&copy; 2026 Campus Guard. All rights reserved.</p>
            <p>
              Built with{" "}
              <span role="img" aria-label="love">
                &#10084;&#65039;
              </span>{" "}
              by Claude Builder Club
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
