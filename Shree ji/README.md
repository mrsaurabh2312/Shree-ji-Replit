# Shree ji - Sacred Essentials E-commerce Website

A complete e-commerce website for selling pooja samgri (spiritual/religious items) built with React and Express.js.

## Features

- **Product Catalog**: Browse through 8 categories of spiritual products
- **Shopping Cart**: Add items, update quantities, and manage your cart
- **Order Management**: Place orders and track them with unique order numbers
- **Search & Filter**: Find products by name, category, or description
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Spiritual Theme**: Custom color scheme with saffron, gold, and maroon colors

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Radix UI components (shadcn/ui)
- TanStack Query for state management
- Wouter for routing

### Backend
- Node.js with Express.js
- TypeScript
- In-memory storage (MemStorage)
- Session-based cart management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── contexts/    # React contexts (cart)
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database abstraction layer
│   └── vite.ts          # Development server setup
├── shared/              # Shared types and schemas
│   └── schema.ts        # Data schema definitions
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Categories

The website includes the following product categories:
- Diyas & Lamps
- Incense & Dhoop
- Idols & Statues
- Pooja Accessories
- Flowers & Garlands
- Books & Texts
- Bells & Chimes
- Rangoli & Decor

## Sample Products

Each category contains authentic spiritual products with:
- High-quality product images
- Detailed descriptions
- Pricing information
- Stock availability
- Featured product highlights

## Order Flow

1. Browse products by category or search
2. Add items to cart
3. Review cart and proceed to checkout
4. Fill in shipping information
5. Place order and receive confirmation
6. Track order status with unique order number

## Design Theme

The website uses a spiritual color palette:
- **Saffron** (#FF8000) - Primary color for buttons and highlights
- **Gold** (#FFD700) - Accent color for special elements
- **Maroon** (#800000) - Dark accent for headings
- **Cream** (#FDF5E6) - Light background color
- **Warm Gray** - Supporting text color

## Contributing

This is a demo e-commerce website showcasing spiritual products. The project demonstrates modern web development practices with a focus on user experience and authentic spiritual product presentation.