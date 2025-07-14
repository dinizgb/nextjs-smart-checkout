# E-commerce Platform - Next.js Application

A modern, responsive e-commerce platform built with Next.js 15, TypeScript, and Tailwind CSS. This application demonstrates advanced discount logic, state management, and user experience patterns for both common and VIP customers.

### Live demo

- Common user: https://nextjs-smart-checkout.vercel.app/
- VIP user: https://nextjs-smart-checkout.vercel.app/?type=vip

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Use npm as package manager

### Installation & Setup

1. **Clone and install dependencies:**
\`\`\`bash
git clone <repository-url>
cd nextjs-smart-checkout
npm install
\`\`\`

2. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

3. **Open your browser:**
- Common user: `http://localhost:3000`
- VIP user: `http://localhost:3000?type=vip`

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run Jest tests
\`\`\`

## 🏗️ Architecture & Design Decisions

### **Project Structure**

```
├── app/                # Next.js App Router
│   ├── page.tsx        # Main application page
│   ├── layout.tsx      # Root layout (provided by shadcn)
│   ├── loading.tsx     # Root loading component
│   └── globals.css     # Global styles
├── components/         # React components
│   └── ui/             # shadcn/ui components
├── resources/          # Static data and text content
├── types/              # TypeScript type definitions
├── utils/              # Business logic utilities
├── reducers/           # Reducers for useReducer hooks
└── __tests__/          # Test suites
    ├── components/     # Component tests
    ├── utils/          # Utility function tests
    └── integration/    # End-to-end flow tests
```

### **Key Decisions**

#### **1. Next.js App Router**
- **Choice**: Next.js 15 with App Router over Pages Router
- **Rationale**: Modern routing system with better performance, built-in layouts, and improved developer experience
- **Implementation**: Single-page application using query parameters for user type detection

#### **2. State Management with useReducer**
- **Choice**: `useReducer` instead of `useState` for cart management
- **Rationale**: Complex state logic with multiple actions (UPDATE_QUANTITY, RESET_CART) benefits from reducer pattern
- **Benefits**: Predictable state updates, easier testing, better separation of concerns

#### **3. Absolute Imports Configuration**
- **Choice**: `@/` prefix for all internal imports
- **Rationale**: Cleaner imports, easier refactoring, better IDE support
- **Configuration**: Set up in `tsconfig.json` with baseUrl and paths mapping

#### **4. Component Architecture**

##### **Separation of Concerns**
- **Presentation Components**: Focus on UI rendering (Header, Logo, Footer)
- **Container Components**: Handle business logic and state (ProductsTable, PlaceOrderButton)
- **Utility Functions**: Pure functions for calculations (calculateOrderDetails)

#### **5. TypeScript Implementation**

##### **Strict Type Safety**
- **Union Types**: `UserType = "common" | "vip"`
- **Interface Composition**: Reusable type definitions
- **Generic Constraints**: Type-safe reducer actions

#### **6. Accessibility Features**
- **Semantic HTML**: Proper table structure, form labels
- **ARIA Attributes**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes

#### **7. Testing Strategy**

##### **Test Pyramid Implementation**
```
Integration Tests (Few)    ← User flow scenarios
    ↑
Component Tests (Some)     ← UI component behavior  
    ↑
Unit Tests (Many)          ← Business logic, utilities
```

#### **8. Performance Optimizations**

##### **Memoization Strategy**
```
const orderDetails = useMemo(() => {
  return calculateOrderDetails(cart, userType)
}, [cart, userType])  // Only recalculate when dependencies change
```

#### **9. Developer Experience**

##### **Code Organization**
- **Single Responsibility**: Each file has one clear purpose
- **Consistent Naming**: 
  - kebab-case for files, CSS Classes and Variables, html ids. 
  - PascalCase for components, function, interfaces, and types names.
- **Clear Dependencies**: Explicit imports, no circular dependencies

## 🔧 Technical Specifications

### **Core Technologies**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui
- **Testing**: Jest + React Testing Library
- **State Management**: React useReducer
- **Pre-commit**: Husky

## 🤝 Contributing

### **Development Workflow**
1. Create a feature, fix or doc branch from main branch(e.g. git checkout -b feat/your-feature-name, git checkout -b fix/your-fix-name, git checkout -b doc/your-doc-update-name).
2. Implement changes with tests if possible
3. Commit your changes (e.g. git commit -m "Feat: Message", git commit -m "Fix: Message", git commit -m "Doc: Message").
4. Open a pull request against the Dev branch with the appropriate label.