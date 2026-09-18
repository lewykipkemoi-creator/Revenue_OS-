"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(
    params.get("mode") === "signup" ? "signup" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    const { error: authError } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push(mode === "signup" ? "/onboarding" : "/dashboard");
    router.refresh();
  }

  return (
    <div className="relative z-10 w-full max-w-sm">
      <Link href="/" className="font-display text-lg font-semibold">
        Lewy
      </Link>

      <h1 className="mt-10 font-display text-2xl font-semibold tracking-tight">
        {mode === "signup" ? "Create your workspace" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {mode === "signup"
          ? "A few details and Lewy will start learning your business."
          : "Log in to see what Lewy handled while you were away."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
            placeholder="you@business.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
            placeholder="At least 6 characters"
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-full bg-gold py-3 text-sm font-medium text-ink transition-colors hover:bg-goldDeep disabled:opacity-50"
        >
          {loading ? "One moment…" : mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className="focus-ring mt-6 text-sm text-muted transition-colors hover:text-text"
      >
        {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
      </button>
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[480px] w-[480px] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "radial-gradient(circle, #E8A63D, transparent 70%)" }}
      />
      <Suspense fallback={null}>
        <AuthForm />
      </Suspense>
    </main>
  );
}
