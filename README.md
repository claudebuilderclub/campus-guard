<div align="center">

# 🛡️ Campus Guard

### Laptop Verification System for Campus Security

[![Built with Claude Code](https://img.shields.io/badge/Built_with-Claude_Code-blueviolet?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnoiIGZpbGw9IndoaXRlIi8+PC9zdmc+)](https://claude.ai/claude-code)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/claudebuilderclub/campus-guard/pulls)

**Replace paper logbooks with instant digital verification at every campus gate.**

[Getting Started](#-getting-started) · [Features](#-features) · [Contributing](#-contributing) · [License](#-license)

</div>

---

> **🏗️ Claude Builder Club Project** — Built collaboratively by the [Claude Builder Club](https://github.com/claudebuilderclub) community. We welcome contributions from all members and developers worldwide!

## 🎯 The Problem

On many campuses, students must verify laptop ownership at every gate using **paper logbooks** — a process that is slow, error-prone, and impossible to audit. Stolen laptops slip through, and there's no way to track which devices are currently on campus.

## 💡 The Solution

**Campus Guard** is a centralized web platform where students register their laptops once, and gate staff can instantly verify ownership at any gate with a quick search. Every entry and exit is logged, creating a complete audit trail.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 Instant Verification
Search by registration number or laptop serial — get student details and laptop info in milliseconds.

### 🎓 Student Registration
One-time registration with student details and laptop information. Supports multiple laptops per student.

### 📊 Analytics Dashboard
Charts and visualizations showing entry/exit trends, gate usage, peak hours, and activity patterns.

</td>
<td width="50%">

### 👁️ On-Campus Tracking
Real-time view of laptops currently on campus with color-coded urgency alerts for extended stays.

### 📋 Entry/Exit Logging
Every laptop movement is logged with timestamp, gate location, and verifying officer.

### 👨‍💼 Admin Dashboard
Overview stats, student management, gate staff management, and full audit logs.

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|:---:|:---|:---|
| ⚡ | **Next.js 16** | Full-stack React framework (App Router) |
| 🔷 | **TypeScript** | Type safety across the codebase |
| 🎨 | **Tailwind CSS v4** | Utility-first styling with custom design system |
| 📊 | **Recharts** | Data visualization and analytics charts |
| 🔐 | **Auth.js v5** | Authentication with credentials provider + JWT |
| 🗄️ | **Prisma ORM** | Type-safe database access |
| 💾 | **SQLite** | Zero-config database (no server needed) |
| ✅ | **Zod** | Runtime input validation |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/claudebuilderclub/campus-guard.git
cd campus-guard

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations & seed admin account
npx prisma migrate dev
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Then open **http://localhost:3000** 🎉

### Default Admin Credentials

| | |
|:---|:---|
| **Email** | `admin@campus.edu` |
| **Password** | `admin123` |

> ⚠️ **Change this immediately** in production environments!

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                       # 🏠 Landing page
│   ├── login/page.tsx                 # 🔐 Staff login
│   ├── (public)/register/page.tsx     # 📝 Student laptop registration
│   ├── (gate)/dashboard/page.tsx      # 🔍 Gate verification dashboard
│   ├── (admin)/admin/
│   │   ├── page.tsx                   # 📊 Admin overview & stats
│   │   ├── students/page.tsx          # 👥 Student management
│   │   ├── gatemen/page.tsx           # 🛡️ Gate staff management
│   │   ├── logs/page.tsx              # 📋 Gate log history
│   │   ├── on-campus/page.tsx         # 👁️ On-campus laptop tracking
│   │   └── analytics/page.tsx         # 📈 Analytics & charts
│   └── api/
│       ├── auth/[...nextauth]/        # 🔑 Auth.js handler
│       ├── students/                  # Student CRUD
│       ├── verify/                    # Laptop verification search
│       ├── gate-logs/                 # Entry/exit logging
│       ├── gatemen/                   # Gate staff CRUD
│       └── admin/
│           ├── stats/                 # Dashboard statistics
│           ├── on-campus/             # On-campus query
│           └── analytics/             # Analytics aggregations
├── components/
│   ├── AdminNav.tsx                   # Admin navigation bar
│   └── Providers.tsx                  # Session provider wrapper
├── lib/
│   ├── auth.ts                        # Auth.js configuration
│   └── prisma.ts                      # Prisma client singleton
└── middleware.ts                      # Route protection
```

---

## 🤝 Contributing

This is a **Claude Builder Club** community project — contributions of all kinds are welcome!

### 🔰 Good First Issues

Pick something from below and submit a PR:

- [ ] Add dark mode support
- [ ] Add QR code scanning for quick laptop lookup
- [ ] Photo upload for student ID and laptop images
- [ ] Bulk student import from CSV/Excel
- [ ] Export reports to PDF/Excel
- [ ] Email/SMS notifications for suspicious activity
- [ ] PWA support for offline gate verification
- [ ] Student self-service portal (view their own logs)
- [ ] Multi-campus support
- [ ] Gate staff shift management
- [ ] API rate limiting and security hardening
- [ ] Add unit and integration tests

### How to Contribute

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m 'Add my feature'`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

### Code Guidelines

- TypeScript with strict types
- Tailwind CSS for styling (use existing design tokens)
- Follow existing patterns for API routes and pages
- Include error handling and loading states
- Test on mobile and desktop

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🙏 Acknowledgments

Built with [Claude Code](https://claude.ai/claude-code) by [Anthropic](https://anthropic.com)
Developed by the **[Claude Builder Club](https://github.com/claudebuilderclub)** community
Powered by [Next.js](https://nextjs.org) · [Prisma](https://prisma.io) · [Auth.js](https://authjs.dev) · [Recharts](https://recharts.org)

---

**⭐ Star this repo if you find it useful!**

*Made with ❤️ by the Claude Builder Club*

</div>
