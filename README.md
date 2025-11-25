# Next.js + Tailwind CSS + Shadcn/UI + Zustand Boilerplate

A modern, production-ready boilerplate for building full-stack applications with the latest technologies and best practices.

## 🚀 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Simple and scalable state management

## ✨ Features

- ⚡️ **Next.js 16** with App Router for optimal performance
- 🎨 **Tailwind CSS v4** for rapid UI development
- 🧩 **Shadcn/UI** components (button, card, input, label, and more)
- 🔄 **Zustand** state management with persist and devtools middleware
- 📦 **TypeScript** for type safety
- 🎯 **Example components** demonstrating best practices

## 📁 Project Structure

```
├── src/                    # Source directory
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   ├── counter-demo.tsx  # Example counter component
│   │   └── user-form.tsx     # Example form component
│   ├── stores/          # Zustand state stores
│   │   ├── use-counter-store.ts  # Counter store with persist
│   │   └── use-user-store.ts     # User store example
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   │   └── utils.ts    # Helper utilities
│   └── types/          # TypeScript definitions
└── public/             # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:SkyDmytro/next-zustand-tailwind-boilerplate.git
cd next-zustand-tailwind-boilerplate
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Adding Shadcn/UI Components

To add new Shadcn/UI components:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

## 🔄 Using Zustand

### Creating a Store

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface MyState {
  data: string;
  setData: (data: string) => void;
}

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        data: "",
        setData: (data) => set({ data }),
      }),
      {
        name: "my-storage",
      }
    )
  )
);
```

### Using a Store in Components

```typescript
"use client";

import { useMyStore } from "@/stores/use-my-store";

export function MyComponent() {
  const { data, setData } = useMyStore();

  return (
    <div>
      <p>{data}</p>
      <button onClick={() => setData("Hello!")}>Update</button>
    </div>
  );
}
```

## 🎯 Example Components

### Counter Demo

Demonstrates Zustand with persist middleware - state persists across page refreshes.

### User Form

Shows global state management with Zustand for form data.

## 🌙 Dark Mode

Dark mode is built-in and follows system preferences. The theme can be customized in `app/globals.css`.

## 📂 Why src Directory?

This boilerplate uses the `src/` directory pattern for better organization:

- Clear separation of source code from configuration
- Cleaner root directory
- Industry standard pattern
- Better IDE and build tool performance

See [src Directory Guide](docs/SRC_DIRECTORY.md) for more details.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with modern tools and best practices for the Next.js ecosystem.
