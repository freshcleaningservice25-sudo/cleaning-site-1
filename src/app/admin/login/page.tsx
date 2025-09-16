"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
