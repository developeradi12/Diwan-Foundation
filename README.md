# 🌿 Diwan Foundation

> An official full-stack web platform for **Diwan Foundation** — a community-driven NGO supporting social initiatives, donations, memberships, and impact programs.

---

## ✨ Features at a Glance

| Area | What it does |
|---|---|
| 🌐 **Public Website** | Home, About, Blog, Services, Gallery, Contact |
| 💸 **Donations** | Cashfree payment gateway integration with webhook verification |
| 👤 **Member Portal** | Profile, ID Card, Achievement & Member Certificates |
| 🎁 **Donor Portal** | Donor dashboard, Donor ID card |
| 🛠️ **Admin Panel** | Full CRUD — Members, Users, Blogs, Gallery, Testimonials, Banners, Videos, Services, Donations, Certificates |
| 📄 **PDF Generation** | Member ID cards & certificates generated via `pdf-lib` |
| 📧 **Email Notifications** | Automated emails via Nodemailer |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16+ (App Router) |
| **Language** | TypeScript |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (jose) — custom session handling |
| **Payments** | Cashfree Payments |
| **UI** | Tailwind CSS v4 + shadcn/ui + Radix UI |
| **Forms** | React Hook Form + Zod |
| **Rich Text** | Tiptap |
| **Animations** | Framer Motion |
| **PDF** | pdf-lib |
| **Email** | Nodemailer |
| **Charts** | Recharts |
| **Tables** | TanStack Table |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A MongoDB instance (local or MongoDB Atlas)
- A Cashfree merchant account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/diwan-foundation.git
cd diwan-foundation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root and fill in the required values:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret_key

# Cashfree Payments
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENV=sandbox   # or "production"

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
.
├── app/
│   ├── (pages)/           # Public-facing pages
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── donate/
│   │   ├── gallery/
│   │   ├── members/
│   │   ├── services/
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── (admin)/           # Admin panel (protected)
│   │   └── admin/
│   ├── member/            # Member portal (protected)
│   ├── donor/             # Donor portal (protected)
│   ├── login/             # Shared login page
│   └── api/v1/            # REST API routes
├── components/
│   ├── sections/          # Page-level section components
│   ├── ui/                # shadcn/ui components
│   └── animations/
├── models/                # Mongoose schemas
├── schemas/               # Zod validation schemas
├── lib/                   # DB connection, mailer, axios
├── utils/                 # JWT, sessions, image upload, helpers
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

---

## 🔐 Authentication & Roles

The platform supports three user roles, each with its own protected portal:

- **Admin** — full access to the admin dashboard
- **Member** — access to member portal (ID card, certificates, profile)
- **Donor** — access to donor dashboard and donor ID

Authentication is handled with JWT tokens stored in HTTP-only cookies.

---

## 💳 Payments

Donations are processed using **Cashfree Payments**. The flow is:

1. User fills the donation form → order is initiated via `/api/v1/donations/initiate`
2. Cashfree checkout opens in the browser
3. On success, Cashfree calls the webhook at `/api/v1/donations/webhook`
4. Order is verified at `/api/v1/donations/verify`

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

© 2026 Diwan Foundation. All rights reserved.
This project is proprietary and may not be copied, modified, or redistributed without explicit permission.

---

## 👨‍💻 Author

Developed by **Aditya Gangil**
Built to support the mission of **Diwan Foundation**.
