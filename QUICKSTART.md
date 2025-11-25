# Quick Start Guide

Get up and running with this boilerplate in minutes!

## 🚀 Installation

```bash
# Clone the repository
git clone git@github.com:SkyDmytro/next-zustand-tailwind-boilerplate.git
cd next-zustand-tailwind-boilerplate

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📝 Project Structure Overview

```
├── src/                    # Source directory
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx    # Root layout with fonts
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles & Tailwind
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/UI components
│   │   ├── counter-demo.tsx  # Example: Counter with Zustand
│   │   └── user-form.tsx     # Example: Form with Zustand
│   ├── stores/          # Zustand state stores
│   │   ├── use-counter-store.ts  # Counter example
│   │   └── use-user-store.ts     # User management example
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   └── types/          # TypeScript type definitions
└── docs/               # Documentation
```

## 🎯 Common Tasks

### Adding a New Page

1. Create a new folder in `src/app/`:

```bash
mkdir src/app/about
```

2. Add a `page.tsx`:

```typescript
export default function AboutPage() {
  return <div>About Page</div>;
}
```

### Creating a New Store

1. Create a new file in `src/stores/`:

```typescript
// src/stores/use-todo-store.ts
import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          title,
          completed: false,
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
```

2. Use it in a component:

```typescript
"use client";

import { useTodoStore } from "@/stores/use-todo-store";

export function TodoList() {
  const { todos, addTodo, toggleTodo } = useTodoStore();

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.title}
        </div>
      ))}
    </div>
  );
}
```

### Adding Shadcn/UI Components

```bash
# Add a single component
npx shadcn@latest add dialog

# Add multiple components
npx shadcn@latest add dialog dropdown-menu toast
```

### Creating a New Component

1. Create in `src/components/`:

```typescript
// src/components/my-component.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

2. Import and use:

```typescript
import { MyComponent } from "@/components/my-component";

export default function Page() {
  return <MyComponent />;
}
```

## 🎨 Customizing Styles

### Tailwind Colors

Edit `src/app/globals.css`:

```css
@layer base {
  :root {
    --primary: 200 100% 50%; /* Change primary color */
  }
}
```

### Component Styles

Modify `src/components/ui/*.tsx` directly to customize Shadcn/UI components.

## 🔧 Environment Variables

1. Copy the example file:

```bash
cp .env.example .env.local
```

2. Add your variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Clear cache

```bash
npm run clean
npm install
npm run dev
```

### Type errors

```bash
npm run type-check
```

## 📚 Next Steps

- Read the [Zustand Guide](docs/ZUSTAND_GUIDE.md)
- Check out the [Shadcn/UI Guide](docs/SHADCN_GUIDE.md)
- Review [Deployment Guide](docs/DEPLOYMENT.md)
- Explore [Next.js Documentation](https://nextjs.org/docs)

## 💡 Tips

1. **Use Server Components by default** - Only add `"use client"` when needed
2. **Keep stores focused** - One store per domain
3. **Use TypeScript** - Better DX and fewer bugs
4. **Follow the existing patterns** - Check example components
5. **Leverage Shadcn/UI** - Don't reinvent the wheel
