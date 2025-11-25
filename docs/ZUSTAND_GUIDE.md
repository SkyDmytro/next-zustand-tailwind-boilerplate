# Zustand State Management Guide

This guide covers how to effectively use Zustand in this boilerplate.

## Basic Store Creation

```typescript
import { create } from "zustand";

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

## Using the Store in Components

```typescript
"use client";

import { useBearStore } from '@/stores/use-bear-store';

export function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return (
    <div>
      <h1>{bears} bears around here...</h1>
      <button onClick={increasePopulation}>Add bear</button>
    </div>
  );
}
```

## Middleware

### Persist Middleware

Automatically persists state to localStorage:

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      data: "initial",
      setData: (data: string) => set({ data }),
    }),
    {
      name: "storage-key",
    }
  )
);
```

### DevTools Middleware

Enables Redux DevTools integration:

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    data: "initial",
    setData: (data: string) => set({ data }),
  }))
);
```

### Combining Middleware

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        data: "initial",
        setData: (data: string) => set({ data }),
      }),
      { name: "my-storage" }
    )
  )
);
```

## Advanced Patterns

### Async Actions

```typescript
interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  fetchTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  isLoading: false,
  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/todos");
      const todos = await response.json();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
```

### Slices Pattern

For large stores, split into slices:

```typescript
interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
}

interface AuthSlice {
  token: string | null;
  setToken: (token: string) => void;
}

const createUserSlice = (set: any): UserSlice => ({
  user: null,
  setUser: (user) => set({ user }),
});

const createAuthSlice = (set: any): AuthSlice => ({
  token: null,
  setToken: (token) => set({ token }),
});

export const useAppStore = create<UserSlice & AuthSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
}));
```

## Best Practices

1. **Keep stores focused** - One store per domain/feature
2. **Use selectors** - Only subscribe to needed state slices
3. **Avoid deeply nested state** - Keep state flat when possible
4. **Use TypeScript** - Always define interfaces for type safety
5. **Name stores clearly** - Use descriptive names like `useUserStore`, `useCartStore`
6. **Client components only** - Zustand requires client-side rendering

## Server Components vs Client Components

In Next.js App Router:

- Zustand hooks only work in Client Components (use `"use client"`)
- For server-side data, use Server Components and pass as props
- Use Zustand for client-side state (UI state, forms, etc.)

## Resources

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
