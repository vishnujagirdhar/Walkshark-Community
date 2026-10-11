"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import {
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  Sparkles,
  Send,
  AlertCircle,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { login, switchUserRole } = useAppStore();

  const [mode, setMode] = useState<"password" | "magic-link">("password");
  const [identifier, setIdentifier] = useState("aarav@walkshark.in");
  const [password, setPassword] = useState("WalkShark2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please provide your email or mobile number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const res = await login(identifier, password);
      setIsLoading(false);
      if (res.success) {
        if (identifier.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(res.error || "Invalid login credentials.");
      }
    }, 600);
  };

  const handleSendMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !identifier.includes("@")) {
      setError("Please enter a valid email address to receive a magic link.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMagicLinkSent(true);
    }, 800);
  };

  const handleQuickDemoMember = async () => {
    switchUserRole("member");
    router.push("/dashboard");
  };

  const handleQuickDemoAdmin = async () => {
    switchUserRole("admin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-button bg-gradient-teal-card shadow-subtle flex items-center justify-center text-white font-heading font-bold text-lg">
            WS
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-navy">
            WalkShark Rewards
          </span>
        </Link>
      </div>

      <div className="max-w-md w-full relative">
        {/* Peeking Mr. Finn over top edge */}
        <div className="flex justify-center -mb-7 relative z-10">
          <MascotFinn mood="hero" size="sm" speechText="Let's walk, fam!" />
        </div>

        <Card className="p-6 sm:p-8 pt-9 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <StatusPill status="teal" size="sm">
              Member access
            </StatusPill>
            <div className="flex items-center gap-1 bg-fog p-1 rounded-full">
              <button
                type="button"
                onClick={() => setMode("password")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  mode === "password"
                    ? "bg-navy text-white shadow-sm"
                    : "text-navy/60 hover:text-navy"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setMode("magic-link")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  mode === "magic-link"
                    ? "bg-navy text-white shadow-sm"
                    : "text-navy/60 hover:text-navy"
                }`}
              >
                Magic link
              </button>
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-navy mb-1">
            Welcome back
          </h1>
          <p className="text-sm font-normal text-navy/60 mb-6">
            Sign in to check your points balance and submit new walking links.
          </p>

          {error && (
            <div className="mb-5 p-3.5 bg-fog border-2 border-navy rounded-button flex items-center gap-2 text-xs font-bold text-navy">
              <AlertCircle className="w-4 h-4 text-navy shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === "password" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              {/* Identifier (Email or Phone) */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">
                  Email or mobile number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="email@example.com or +91 98..."
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full h-14 px-4 bg-canvas border border-fog rounded-input font-normal text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                  <Mail className="absolute right-4 top-4 w-5 h-5 text-navy/40" />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-navy">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-teal hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 px-4 pr-12 bg-canvas border border-fog rounded-input font-normal text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-navy/40 hover:text-navy"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="xl"
                  isLoading={isLoading}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign in to account
                </Button>
              </div>
            </form>
          ) : (
            /* Magic link passwordless */
            <div className="space-y-4">
              {!magicLinkSent ? (
                <form onSubmit={handleSendMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      Email address for magic link
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full h-14 px-4 bg-canvas border border-fog rounded-input font-normal text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                      />
                      <Mail className="absolute right-4 top-4 w-5 h-5 text-navy/40" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="xl"
                    isLoading={isLoading}
                    icon={<Send className="w-4 h-4" />}
                  >
                    Send me a login link
                  </Button>
                </form>
              ) : (
                <div className="p-5 bg-teal-50 border border-teal-100 rounded-tile text-center space-y-2">
                  <Sparkles className="w-6 h-6 mx-auto text-teal" />
                  <h4 className="font-heading font-bold text-base text-navy">
                    Magic link sent!
                  </h4>
                  <p className="text-xs text-navy/70 leading-relaxed font-normal">
                    We've emailed a passwordless login link to <strong>{identifier}</strong>. Click it to sign in instantly.
                  </p>
                  <button
                    onClick={() => setMagicLinkSent(false)}
                    className="text-xs font-bold text-teal hover:underline pt-2 block mx-auto"
                  >
                    Send another link
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Demo Logins for Fast Review */}
          <div className="mt-6 pt-5 border-t border-fog">
            <span className="text-[11px] font-bold text-navy/50 block text-center mb-3">
              Fast one-click test logins
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleQuickDemoMember}
                className="px-3 py-3 bg-fog hover:bg-fog/80 text-navy font-heading font-bold text-xs rounded-button border border-fog/80 transition-all text-center flex items-center justify-center gap-1.5"
              >
                👤 Member (170 pts)
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-3 py-3 bg-navy hover:bg-navy-700 text-white font-heading font-bold text-xs rounded-button shadow-navy-glow transition-all text-center flex items-center justify-center gap-1.5"
              >
                🛡️ Admin HQ (Queue)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs font-normal text-navy/70">
            Don't have an account yet?{" "}
            <Link href="/auth/signup" className="font-bold text-teal hover:underline">
              Join the community free
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
