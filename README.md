# 🦈 WalkShark Community Rewards ("WalkShark Finn Community")

> **Official rewards-points community web application for WalkShark members.**  
> Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.  
> Designed with the modern **"Soft Rectangles"** aesthetic featuring the WalkShark character mascot **Mr. Finn**.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom **"Soft Rectangles"** design tokens:
  - **Strict 3-Color Brand Palette**:
    - **Fog Grey `#EDEDED`**: Page canvas, quiet tiles, dividers, inactive states
    - **Workshop Teal `#12789C`**: Primary brand accent, buttons, active states, key cards, progress fills
    - **Deep Navy `#0C2342`**: All primary text, dark cards, icons, active navigation indicators
    - **Neutral White `#FFFFFF`**: Card surface backgrounds and high-contrast text on Teal/Navy
  - **Card & Tile Radii**: 40px hero, 28px cards, 20px tiles, 16px buttons and inputs, 999px pills
  - **Diffused Soft Shadows**: `0 10px 30px rgba(12,35,66,0.08)`
  - **Colored Glows**: Teal `0 18px 30px -10px rgba(18,120,156,0.40)` and Navy `0 18px 30px -10px rgba(12,35,66,0.35)`
- **Typography (Strict 2 Families)**:
  - **Headings & Big Numbers**: Bricolage Grotesque Bold 700 (`next/font/google`)
  - **Body & UI**: Helvetica World (with fallbacks `Helvetica, Arial, sans-serif`)
  - **Sentence Case**: Strict sentence case across all buttons, chips, tags, and tabs
- **Motion & Mascot**: Framer Motion animations (cursor/scroll tracking for hero Mr. Finn, liquid progress bars, spring button physics, infinite marquee, count-up numbers, celebration confetti)
- **Database & Auth**: Supabase Postgres with Row Level Security (RLS) + Append-only points ledger calculation. Seamless out-of-the-box local demo mode when running without Supabase credentials.
- **Deployment**: Vercel-ready with zero server dependencies.

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/vishnujagirdhar/Walkshark-Community.git
cd Walkshark-Community

# Install dependencies
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production / Vercel
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables

Create or update `.env.local` with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: If `NEXT_PUBLIC_SUPABASE_URL` is omitted or contains placeholder values, the application automatically switches to **Interactive Demo Store Mode** with pre-seeded member and admin accounts. Everything (submission, approval, ledger calculations, redemptions) works out-of-the-box!

---

## 🎨 Brand Customization Guide

### 1. How to Adjust Brand Colors
All colors are defined as CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`:
```css
:root {
  --color-canvas: #EDEDED;
  --color-fog: #EDEDED;
  --color-teal: #12789C;
  --color-navy: #0C2342;
  --color-white: #FFFFFF;
}
```

### 2. How to Swap the Mr. Finn Mascot & 3D Assets
- **Mascot Renders**: Located in `/public/mascot/`
  - `/public/mascot/front.png`: Celebrating / idle pose
  - `/public/mascot/with package.png`: Hero pose with WalkShark shoebox
  - `/public/mascot/left.png`: Walking / motion pose
  - `/public/mascot/right.png`: Reviewing / magnifying pose
- **3D Glossy Metric Illustrations**: Located in `/public/illustrations/`
  - `/public/illustrations/coin-stack.svg`: Glossy coin stack in teal, white, and navy
  - `/public/illustrations/trophy-3d.svg`: Glossy 3D trophy in teal and white tones
  - `/public/illustrations/check-badge.svg`: Glossy 3D check badge in teal

---

## 📊 Points System & Database Engine

### Conversion Formula
$$\mathbf{100\text{ Points} = ₹250} \implies \mathbf{1\text{ Point} = ₹2.50}$$
$$\text{Reward Value} = \text{Points} \times 2.50$$

### Configured Activities
| Activity | Points | Reward Value (INR) | Requirements |
| :--- | :---: | :---: | :--- |
| **Instagram Story** | **20 pts** | ₹50 | Approved story tagging `@walkshark` |
| **Instagram Reel** | **30 pts** | ₹75 | Public original reel showcasing WalkShark product |
| **Instagram Post** | **30 pts** | ₹75 | High-quality feed post featuring WalkShark |
| **Travel + WalkShark** | **50 pts** | ₹125 | Outdoor or travel content featuring product |
| **Family Walk** | **80 pts** | ₹200 | Family walking moment, footwear visibly in use |
| **Birthday Wish** | **10 pts** | ₹25 | Approved birthday / community shoutout |

### Append-Only Ledger Design
Points are **never directly overwritten** on the user row. Every credit (earned) or debit (redeemed) is written as an immutable row to `points_ledger`. The member's balance and metrics are computed deterministically:
$$\text{Current Points Balance} = \sum \text{Earned} - \sum \text{Redeemed}$$

---

## 🛡️ Community Rules (The 8 Pillars)
1. **Original content only** (no copied, stolen, or reposted third-party media).
2. **One submission, one reward** (strict anti-duplicate URL suppression).
3. **Product clearly visible** for all product-based activities.
4. **Member submits public Instagram link or approved screenshot proof**.
5. **WalkShark may reject misleading, offensive, unsafe, or irrelevant content**.
6. **Zero artificial engagement** (purchased likes, fake views, bot pods).
7. **Points are credited ONLY after admin verification**.
8. **Points represent community reward value redeemable per active WalkShark policy**.

---

## 🗄️ Supabase Postgres Migration
To apply the database schema, open the SQL Editor in your Supabase project dashboard and execute:
```sql
-- Located at: supabase/migrations/001_initial_schema.sql
```
This sets up tables (`profiles`, `activity_types`, `submissions`, `points_ledger`, `milestones`, `redemptions`, `settings`), triggers, and Row Level Security (RLS) policies.
