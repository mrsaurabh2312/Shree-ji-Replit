# replit.md

## Overview

This is a full-stack e-commerce application for a spiritual/religious products store called "Sacred Essentials". It's built with a modern React frontend and Express.js backend, featuring a complete shopping cart system, order management, and product catalog specifically tailored for pooja samgri and spiritual items.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom spiritual-themed color scheme (saffron, gold, maroon)
- **UI Components**: Radix UI components via shadcn/ui for accessibility and consistency
- **State Management**: TanStack Query for server state, React Context for cart management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Simple session-based cart using localStorage session IDs

### Project Structure
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
│   └── schema.ts        # Drizzle database schema
└── migrations/          # Database migrations
```

## Key Components

### Database Schema
- **Categories**: Product categorization with slugs and descriptions
- **Products**: Full product catalog with pricing, stock, images, and category relationships
- **Cart Items**: Session-based shopping cart with product references
- **Orders**: Customer orders with contact information and status tracking
- **Order Items**: Line items for each order with product and quantity details

### API Endpoints
- **GET /api/categories**: List all product categories
- **GET /api/products**: Product listing with filtering (category, search, featured)
- **GET /api/cart**: Session-based cart retrieval
- **POST /api/cart**: Add items to cart
- **PUT /api/cart/:id**: Update cart item quantities
- **DELETE /api/cart/:id**: Remove cart items
- **POST /api/orders**: Create new orders from cart
- **GET /api/orders/:orderNumber**: Order tracking and details

### Frontend Pages
- **Home**: Hero section, featured products, categories showcase
- **Products**: Product catalog with filtering, search, and sorting
- **Cart**: Shopping cart management with quantity updates
- **Checkout**: Order placement form with customer details
- **Orders**: Order confirmation and tracking

## Data Flow

1. **Product Browsing**: Users browse products filtered by category or search terms
2. **Cart Management**: Items are added to session-based cart stored in localStorage
3. **Checkout Process**: Cart items are converted to orders with customer information
4. **Order Tracking**: Orders are assigned unique numbers for customer reference

### Session Management
- Frontend generates unique session IDs stored in localStorage
- Session IDs are sent with cart-related API requests via `x-session-id` header
- Cart items are associated with session IDs in the database

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Extensive Radix UI component library
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight routing

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database serverless
- **Validation**: Zod for schema validation
- **Session Storage**: Basic session management without external stores

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full TypeScript support across frontend and backend
- **Database Migrations**: Drizzle Kit for schema management
- **Development**: Hot reload and runtime error overlay

## Deployment Strategy

### Production Build
- Frontend builds to `dist/public` directory
- Backend compiles to `dist/index.js` with ESBuild
- Static assets served from Express in production

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development and production modes with different serving strategies
- Replit-specific development features and error handling

### Development vs Production
- **Development**: Vite dev server with HMR and middleware mode
- **Production**: Express serves static files and API routes
- **Database**: PostgreSQL via Neon Database in both environments

The application follows a clean separation of concerns with shared TypeScript types, centralized database schema, and a RESTful API design optimized for an e-commerce shopping experience.