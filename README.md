# SGV Recycle - Corporate Website

A high-end, functional corporate website for SGV Recycle, a UK-based recycling company. Built with Next.js 14 (App Router) and designed with an "Eco-Tech" & "Premium Industrial" aesthetic.

## Tech Stack

- **Framework:** Next.js 14 (App Router) - Compatible with Node.js 18.x
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** Manrope (Headings) & Inter (Body) from Google Fonts
- **Language:** TypeScript

## Design System

### Colors
- **Primary Background:** Slate-50 (Light grey) for content
- **Dark Background:** Slate-950 (Dark charcoal) for Footer/Hero
- **Accent Green:** `#7CC444` - Used for CTAs and icon highlights
- **Forest Green:** `#3A7D33` - Used for hover states

### Components
- **GlassCard:** Reusable card component with glassmorphism effect
- **BentoGrid:** CSS grid layout for services section
- **Navbar:** Sticky navigation with backdrop blur

## Getting Started

### Prerequisites
- Node.js 18.x (or compatible version)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and global components
│   ├── page.tsx            # Home page with Hero and Services
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── services/
│   │   ├── tyres/page.tsx  # Tyres service page
│   │   ├── rubber/page.tsx # Rubber service page
│   │   └── plastics/page.tsx # Plastics service page
│   └── purchasing/
│       └── page.tsx        # Purchasing page with valuation form
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   └── ui/
│       └── GlassCard.tsx   # Reusable glassmorphism card
└── tailwind.config.ts      # Tailwind configuration with custom colors
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Glassmorphism UI components
- ✅ Smooth animations with Framer Motion
- ✅ SEO-friendly structure
- ✅ Accessible navigation
- ✅ Contact form for valuations
- ✅ Service pages with detailed information

## Company Information

- **Company:** SGV Recycle
- **Address:** 110 Plashet Road, Plaistow, London, England, E13 0QS
- **Legal:** Registered in England & Wales. Incorporated 2018.

## License

Private project for SGV Recycle.

