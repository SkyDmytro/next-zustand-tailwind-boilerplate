import { CounterDemo } from "@/components/counter-demo";
import { UserForm } from "@/components/user-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Next.js + Tailwind + Shadcn/UI + Zustand
          </h1>
          <p className="text-muted-foreground text-xl">
            A modern boilerplate for building full-stack applications
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <CounterDemo />
          <UserForm />
        </div>

        <div className="bg-card text-card-foreground mt-16 rounded-lg border p-8">
          <h2 className="mb-4 text-2xl font-semibold">What&apos;s Included?</h2>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                <strong>Next.js 16</strong> with App Router and TypeScript
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                <strong>Tailwind CSS v4</strong> for utility-first styling
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                <strong>Shadcn/UI</strong> for beautiful, accessible components
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                <strong>Zustand</strong> for simple and scalable state
                management
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                Example stores with <strong>persist</strong> and{" "}
                <strong>devtools</strong> middleware
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>
                Pre-configured with best practices and modern patterns
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
