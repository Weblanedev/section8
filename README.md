# Section Eight - E-commerce Website

A modern, responsive e-commerce website built with Next.js 14 and Tailwind CSS.

## Features

- 🛍️ Product catalog with hover zoom effects
- 🛒 Shopping cart functionality
- 💳 Checkout with payment form
- 📱 Fully responsive design
- 🎨 Custom color scheme (White, Graphite Black, Soft Gray, Apple Blue)

## Pages

- **Home** - Hero section and featured products
- **Products** - Full product catalog with descriptions
- **About Us** - Company information
- **Contact** - Contact form and information
- **Checkout** - Shopping cart and payment processing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
section8/
├── app/              # Next.js app directory
│   ├── about/       # About Us page
│   ├── checkout/    # Checkout page
│   ├── contact/     # Contact page
│   ├── products/    # Products page
│   └── page.tsx     # Home page
├── components/      # React components
│   ├── Navbar.tsx   # Navigation bar
│   └── ProductCard.tsx
├── context/         # React context
│   └── CartContext.tsx
├── public/          # Static assets
│   └── productImg/  # Product images
└── types/           # TypeScript types
```

## Color Scheme

- **Background**: #FFFFFF (pure white)
- **Primary**: #1C1C1E (graphite black)
- **Secondary**: #F2F2F7 (soft gray)
- **Accent**: #007AFF (apple blue)

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
