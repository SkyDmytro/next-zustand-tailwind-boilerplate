"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCounterStore } from "@/stores/use-counter-store";

export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Counter Demo</CardTitle>
        <CardDescription>
          Example using Zustand for state management with persist middleware
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-6xl font-bold">{count}</div>
        <div className="flex gap-2">
          <Button onClick={decrement} variant="outline">
            Decrement
          </Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
          <Button onClick={increment}>Increment</Button>
        </div>
      </CardContent>
    </Card>
  );
}
