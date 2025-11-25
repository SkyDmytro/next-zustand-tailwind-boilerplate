"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";

export function UserForm() {
  const { user, setUser, clearUser } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    setUser({
      id: Math.random().toString(36).substring(7),
      name,
      email,
    });

    setName("");
    setEmail("");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Form Demo</CardTitle>
        <CardDescription>
          Example using Zustand for global state management
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Current User:</p>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <Button
              onClick={clearUser}
              variant="destructive"
              className="w-full"
            >
              Clear User
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save User
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
