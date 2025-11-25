# Architecture Overview

This document explains the architectural decisions and patterns used in this boilerplate.

## 📐 Project Architecture

### Directory Structure

```
boilerplate-zustand-tailwind/
├── src/                    # Source directory
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx    # Root layout, fonts, metadata
│   │   ├── page.tsx      # Home page (Server Component by default)
│   │   └── globals.css   # Global styles, Tailwind, CSS variables
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/UI components (editable)
│   │   ├── counter-demo.tsx  # Example client component
│   │   └── user-form.tsx     # Example form component
│   ├── stores/          # Zustand state management
│   │   ├── use-counter-store.ts  # Example with persist middleware
│   │   └── use-user-store.ts     # Example with devtools
│   ├── hooks/           # Custom React hooks
│   │   └── use-mounted.ts    # Hydration-safe hook
│   ├── lib/             # Utility functions
│   │   ├── utils.ts    # Shadcn/UI utilities (cn helper)
│   │   └── constants.ts # App-wide constants
│   └── types/          # TypeScript definitions
│       └── index.ts    # Shared type definitions
├── docs/               # Documentation
└── public/            # Static assets
```

## 🏗️ Architecture Decisions

### 1. Next.js App Router

**Why?**

- Better performance with React Server Components
- Improved routing with layouts and loading states
- Native support for streaming and suspense
- Better SEO and initial page load

**Pattern:**

- Server Components by default
- Client Components only when needed (interactivity, hooks, browser APIs)
- Co-locate related files in route folders

### 2. Zustand for State Management

**Why Zustand over Redux/Context?**

- Minimal boilerplate (no providers, actions, reducers)
- Simple API with hooks
- Built-in middleware (persist, devtools)
- Better performance (selective re-renders)
- Small bundle size (~1KB)

**Pattern:**

- One store per domain/feature
- Use TypeScript interfaces for type safety
- Leverage middleware (persist for localStorage, devtools for debugging)
- Keep stores flat and simple

### 3. Shadcn/UI Component Library

**Why Shadcn/UI?**

- Components are copied into your project (full control)
- Built on Radix UI (accessible, unstyled primitives)
- Tailwind CSS for styling
- Customizable without forking
- No external dependency updates needed

**Pattern:**

- Components live in `components/ui/`
- Customize directly in your codebase
- Use as building blocks for feature components

### 4. Tailwind CSS v4

**Why Tailwind?**

- Utility-first approach (faster development)
- Consistent design system
- Excellent mobile-first responsive design
- Smaller production bundle (unused styles purged)
- Great DX with IntelliSense

**Pattern:**

- Use utility classes in JSX
- Extract repeated patterns into components
- Customize via CSS variables in `globals.css`
- Use `cn()` utility for conditional classes

## 🔄 Data Flow

### State Management Flow

```
User Action → Component Event Handler → Zustand Store Action
                                              ↓
                                        State Update
                                              ↓
                                Component Re-renders (via hook)
```

### Example Flow

```typescript
// 1. User clicks button
<Button onClick={increment} />;

// 2. Calls store action
const { increment } = useCounterStore();

// 3. Store updates state
increment: () => set((state) => ({ count: state.count + 1 }));

// 4. Component re-renders with new state
const count = useCounterStore((state) => state.count);
```

## 📦 Component Patterns

### Server Components (Default)

```typescript
// src/app/page.tsx - No "use client" needed
export default function Page() {
  return <div>Server Component</div>;
}
```

**Use for:**

- Static content
- Data fetching
- SEO-critical pages

### Client Components

```typescript
// src/components/counter.tsx
"use client";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Use for:**

- Interactivity (onClick, onChange)
- Browser APIs (localStorage, window)
- React hooks (useState, useEffect)
- Zustand stores

### Composition Pattern

```typescript
// Server Component wraps Client Component
export default function Page() {
  return (
    <div>
      <ServerContent />
      <ClientInteractiveComponent />
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Server Components First

Default to Server Components, only use Client when needed.

### 2. Zustand Store Design

```typescript
// ✅ Good: Focused store
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

// ❌ Bad: Kitchen sink store
interface AppStore {
  user: User;
  todos: Todo[];
  settings: Settings;
  // Too many concerns
}
```

### 3. Component Organization

```typescript
// ✅ Good: Clear separation
src/components/
  ui/              # Reusable UI components
  features/        # Feature-specific components
  layouts/         # Layout components

// ❌ Bad: Everything in one folder
src/components/
  button.tsx
  user-profile.tsx
  header.tsx
  ...
```

### 4. Type Safety

```typescript
// ✅ Good: Explicit types
interface Props {
  user: User;
  onSave: (user: User) => void;
}

export function UserForm({ user, onSave }: Props) {
  // ...
}

// ❌ Bad: Any types
export function UserForm({ user, onSave }: any) {
  // ...
}
```

## 🚀 Performance Considerations

### 1. Code Splitting

Next.js automatically code-splits by route. For heavy components:

```typescript
const HeavyComponent = dynamic(() => import("./heavy-component"), {
  loading: () => <Skeleton />,
});
```

### 2. Zustand Selectors

Only subscribe to needed state:

```typescript
// ✅ Good: Selective subscription
const count = useCounterStore((state) => state.count);

// ❌ Bad: Re-render on any state change
const store = useCounterStore();
```

### 3. Image Optimization

Always use Next.js Image component:

```typescript
import Image from "next/image";

<Image src="/logo.png" alt="Logo" width={100} height={100} />;
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use `NEXT_PUBLIC_` prefix for client-side variables
   - Keep sensitive data server-side only

2. **API Routes**
   - Validate all inputs
   - Use proper authentication
   - Rate limiting for public endpoints

3. **Client-Side State**
   - Don't store sensitive data in Zustand
   - Use server-side sessions for auth

## 📈 Scalability

### Growing the Application

1. **Feature Folders**

```
src/app/
  dashboard/
    components/
    stores/
    types/
    page.tsx
```

2. **Shared Code**

```
src/lib/
  api/           # API clients
  hooks/         # Shared hooks
  utils/         # Helper functions
```

3. **Monorepo (Future)**
   Consider Turborepo for multiple apps sharing code.

## 🔧 Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major version updates
npx npm-check-updates -u
npm install
```

### Code Quality

- Run linter regularly: `npm run lint`
- Type-check: `npm run type-check`
- Test before deploying: `npm run build`

## 📚 Further Reading

- [Next.js App Router](https://nextjs.org/docs/app)
- [Zustand Best Practices](https://zustand-demo.pmnd.rs/)
- [Shadcn/UI Customization](https://ui.shadcn.com/)
- [Tailwind Best Practices](https://tailwindcss.com/docs/reusing-styles)
