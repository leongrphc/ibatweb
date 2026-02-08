"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

function LoginForm() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError("Hatalı şifre. Lütfen tekrar deneyin.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-bold tracking-tight">
                İBAT
              </span>
            </Link>
            <h1 className="text-xl font-bold text-primary mt-4">
              Admin Paneli
            </h1>
            <p className="text-neutral-500 text-sm mt-2">
              Devam etmek için giriş yapın
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                placeholder="Admin şifresini girin"
                autoFocus
              />
              {error && (
                <p className="text-error text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-primary transition-colors"
            >
              ← Siteye Dön
            </Link>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-neutral-400 mt-6">
          Demo şifre: ibat2024
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
