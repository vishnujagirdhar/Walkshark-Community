"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="max-w-md w-full">
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

        <Card className="p-6 sm:p-8 shadow-soft">
          <div className="mb-4">
            <StatusPill status="teal" size="sm">
              Password recovery
            </StatusPill>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-navy mb-2">
            Reset password
          </h1>
          <p className="text-sm font-normal text-navy/60 mb-6">
            Enter your registered email address and we'll send a secure password reset link.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">
                  Registered email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              >
                Send reset link
              </Button>
            </form>
          ) : (
            <div className="p-5 bg-teal-50 border border-teal-100 rounded-tile text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-teal mx-auto" />
              <h4 className="font-heading font-bold text-base text-navy">
                Reset link dispatched
              </h4>
              <p className="text-xs text-navy/70 font-normal leading-relaxed">
                Check your inbox at <strong>{email}</strong> for instructions to set your new password.
              </p>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-fog text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy/60 hover:text-navy"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
