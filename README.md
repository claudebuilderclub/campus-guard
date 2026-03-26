<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet?style=for-the-badge" alt="Built with Claude Code" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
</p>

# 🛡️ Campus Guard

**A centralized laptop verification system for campus security gates.**

Campus Guard replaces the old-school paper logbooks used at campus gates to verify laptop ownership. Students register their laptops once, and gate staff can instantly verify ownership at any gate — preventing theft and keeping the campus secure.

> **🏗️ Claude Builder Club Project** — This project was built collaboratively by the [Claude Builder Club](https://github.com/claudebuilderclub). We welcome contributions from all members and the wider community!

---

## ✨ Features

- **🎓 Student Registration** — Students register with their details and laptop information (serial number, brand, model, color)
- **🔍 Instant Verification** — Gate staff search by registration number or laptop serial and get immediate results
- **📋 Entry/Exit Logging** — Every laptop movement is logged with timestamp, gate location, and verifying officer
- **👨‍💼 Admin Dashboard** — Overview stats, student management, gate staff management, and full audit logs
- **🔐 Role-Based Access** — Admin and Gateman roles with protected routes
- **📱 Responsive Design** — Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Auth.js v5** | Authentication (credentials provider, JWT) |
| **Prisma ORM** | Database access |
| **SQLite** | Database (easy setup, no server needed) |
| **Zod** | Input validation |
| **bcryptjs** | Password hashing |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/claudebuilderclub/campus-guard.git
cd campus-guard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Or create .env manually with:
#   DATABASE_URL="file:./dev.db"
#   NEXTAUTH_SECRET="your-secret-key-change-in-production"
#   NEXTAUTH_URL="http://localhost:3000"

# 4. Run database migrations
npx prisma migrate dev

# 5. Seed the default admin account
npx tsx prisma/seed.ts

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Admin Login

| Field | Value |
|---|---|
| Email | `admin@campus.edu` |
| Password | `admin123` |

> ⚠️ Change the admin password immediately in production!

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── login/page.tsx              # Staff login
│   ├── (public)/register/page.tsx  # Student laptop registration
│   ├── (gate)/dashboard/page.tsx   # Gate verification dashboard
│   ├── (admin)/admin/
│   │   ├── page.tsx                # Admin overview & stats
│   │   ├── students/page.tsx       # Student management
│   │   ├── gatemen/page.tsx        # Gate staff management
│   │   └── logs/page.tsx           # Gate log history
│   └── api/
│       ├── auth/[...nextauth]/     # Auth.js route handler
│       ├── students/               # Student CRUD
│       ├── verify/                 # Laptop verification search
│       ├── gate-logs/              # Entry/exit logging
│       └── gatemen/                # Gate staff CRUD
├── components/
│   ├── AdminNav.tsx                # Admin navigation bar
│   └── Providers.tsx               # Session provider wrapper
├── lib/
│   ├── auth.ts                     # Auth.js configuration
│   └── prisma.ts                   # Prisma client singleton
└── middleware.ts                   # Route protection
```

## 🤝 Contributing

This is a **Claude Builder Club** community project and we'd love your help! Whether you're a beginner or experienced developer, there's something for everyone.

### Ways to Contribute

- **🐛 Bug fixes** — Found something broken? Fix it and submit a PR
- **✨ New features** — Check the issues tab for feature requests or propose your own
- **🎨 UI/UX improvements** — Better designs, animations, accessibility
- **📝 Documentation** — Improve README, add comments, write guides
- **🧪 Testing** — Add unit tests, integration tests, E2E tests
- **🌍 Internationalization** — Add support for other languages
- **📱 Mobile app** — Build a companion mobile app
- **🔧 DevOps** — Docker setup, CI/CD, deployment guides

### Ideas for New Features

- [ ] QR code scanning for quick laptop lookup
- [ ] Photo upload for student ID and laptop images
- [ ] Email/SMS notifications for suspicious activity
- [ ] Bulk student import from CSV/Excel
- [ ] Gate staff shift management
- [ ] Analytics dashboard with charts and trends
- [ ] Export reports (PDF/Excel)
- [ ] Dark mode
- [ ] PWA support for offline gate verification
- [ ] API rate limiting and security hardening
- [ ] Student self-service portal (view their own logs)
- [ ] Multi-campus support

### How to Contribute

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure your code:
- Follows the existing code style (TypeScript, Tailwind CSS)
- Includes appropriate error handling
- Works on mobile and desktop
- Doesn't break existing functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Claude Code](https://claude.ai/claude-code) by [Anthropic](https://anthropic.com)
- Developed by the **Claude Builder Club** community
- Powered by [Next.js](https://nextjs.org), [Prisma](https://prisma.io), and [Auth.js](https://authjs.dev)

---

<p align="center">
  <strong>⭐ Star this repo if you find it useful!</strong><br/>
  <sub>Made with ❤️ by the Claude Builder Club</sub>
</p>
