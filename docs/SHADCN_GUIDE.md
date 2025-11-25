# Shadcn/UI Components Guide

This guide covers how to use and customize Shadcn/UI components in this boilerplate.

## Adding New Components

Add components using the CLI:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

Or add multiple at once:

```bash
npx shadcn@latest add button card input label dialog
```

## Available Components

Visit [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components) for the full list.

Popular components:

- `button` - Customizable buttons
- `card` - Container with header, content, footer
- `dialog` - Modal dialogs
- `dropdown-menu` - Dropdown menus
- `input` - Form inputs
- `label` - Form labels
- `select` - Select dropdowns
- `toast` - Toast notifications
- `table` - Data tables
- `tabs` - Tab navigation
- `form` - Form components with validation

## Customization

Components are installed in `components/ui/` and can be modified directly.

### Example: Customizing Button Variants

Edit `components/ui/button.tsx`:

```typescript
const buttonVariants = cva("inline-flex items-center justify-center...", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground...",
      destructive: "bg-destructive text-destructive-foreground...",
      outline: "border border-input...",
      // Add your custom variant
      custom: "bg-purple-500 text-white hover:bg-purple-600",
    },
  },
});
```

Usage:

```typescript
<Button variant="custom">Custom Button</Button>
```

## Theme Customization

Customize colors in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* Add more custom colors */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Dark mode colors */
  }
}
```

## Common Patterns

### Form with Validation

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
```

### Dialog Example

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog description goes here.
          </DialogDescription>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

## Responsive Design

Use Tailwind's responsive prefixes:

```typescript
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent className="p-4 md:p-6 lg:p-8">
    {/* Content */}
  </CardContent>
</Card>
```

## Dark Mode Support

All Shadcn/UI components support dark mode out of the box. Colors automatically switch based on the `dark` class on the `<html>` element.

## Resources

- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Component Examples](https://ui.shadcn.com/examples)
- [Customization Guide](https://ui.shadcn.com/docs/components-json)
