<div align="center">

# 🌟 OSS Vision Community

**منصة مجتمع رؤية المصدر المفتوح**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7-FFCA28?logo=firebase)](https://firebase.google.com/)

[العربية](#نظرة-عامة) | [English](#overview)

</div>

---

## نظرة عامة

منصة ويب لمجتمع OSS Vision تتيح للطلاب والمطورين التقدم للانضمام إلى المجتمع عبر نموذج تسجيل متكامل. تم بناء المنصة باستخدام أحدث التقنيات مع التركيز على الأمان وتجربة المستخدم.

## Overview

A web platform for the OSS Vision Community that allows students and developers to apply for membership through an integrated registration form. Built with modern technologies focusing on security and user experience.

---

## ✨ Features | المميزات

- 📝 **Application Form** - نموذج تقديم طلب انضمام متكامل
- 📄 **Resume Upload** - رفع السيرة الذاتية (PDF)
- ✅ **Form Validation** - تحقق من صحة البيانات (Client + Server)
- 🔒 **Security** - حماية متقدمة مع Rate Limiting
- 📱 **Responsive Design** - تصميم متجاوب
- 🌐 **RTL Support** - دعم اللغة العربية

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | MongoDB 7.0 |
| **File Storage** | Firebase Storage |
| **Validation** | Zod + React Hook Form |
| **Deployment** | VPS |

---

## 📁 Project Structure

```
oss-vision-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── applications/     # API endpoints
│   │   │       └── route.ts
│   │   ├── join/                 # Join page
│   │   ├── privacy/              # Privacy policy
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── forms/
│   │   │   └── JoinForm.tsx      # Application form
│   │   └── sections/             # Landing page sections
│   │       ├── Hero.tsx
│   │       ├── AboutSection.tsx
│   │       ├── OrganizationSection.tsx
│   │       ├── CTASection.tsx
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   └── lib/
│       ├── constants.ts          # App constants
│       ├── firebase.ts           # Firebase config
│       ├── mongodb.ts            # MongoDB connection
│       ├── types.ts              # TypeScript types
│       └── validations.ts        # Zod schemas
├── public/                       # Static assets
├── Docs/                         # Documentation
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB Atlas account
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oss-vision-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example.secure .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   
   # API Security
   API_SECRET_KEY=generate-a-strong-random-key
   ```

4. **Generate API Secret Key**
   ```bash
   openssl rand -hex 32
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔌 API Endpoints

### POST `/api/applications`
Submit a new application.

**Request Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "phoneNumber": "string",
  "university": "string",
  "major": "string",
  "graduationYear": "number",
  "interestedDepartment": "string",
  "motivation": "string",
  "githubProfile": "string (optional)",
  "linkedinProfile": "string (optional)",
  "portfolioUrl": "string (optional)",
  "resumeUrl": "string (optional)"
}
```

**Response:**
```json
{
  "message": "تم تقديم طلبك بنجاح",
  "id": "application-id"
}
```

### GET `/api/applications`
Retrieve all applications (protected).

**Headers:**
```
x-api-key: your-api-secret-key
```

---

## 🔒 Security Features

- ✅ **Server-side validation** with Zod schemas
- ✅ **Rate limiting** (5 requests/minute per IP)
- ✅ **Input sanitization** to prevent XSS
- ✅ **API key authentication** for protected endpoints
- ✅ **Security headers** (HSTS, X-Frame-Options, CSP, etc.)
- ✅ **Environment variable protection**

---

## 🏢 Departments | الأقسام

| Department | الاسم |
|------------|-------|
| Technical Innovation | الابتكار التقني |
| Design & Media | التصميم والإعلام |
| Planning & Execution | التخطيط والتنفيذ |
| Member Development | تطوير الأعضاء |
| Public Relations | العلاقات العامة |
| Human Resources | الموارد البشرية |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `MONGODB_URI`
- `NEXT_PUBLIC_FIREBASE_*` (all Firebase config)
- `API_SECRET_KEY`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary to OSS Vision Community.

---

## 📞 Contact

- **Community**: OSS Vision
- **Website**: [Coming Soon]
- **Email**: [Contact Email]

---

<div align="center">

**Built with ❤️ by OSS Vision Community**

</div>
