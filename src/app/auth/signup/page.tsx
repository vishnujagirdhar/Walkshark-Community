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
  Check,
  X,
  Mail,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAppStore();

  const [step, setStep] = useState<"details" | "verify" | "success">("details");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP & Verification state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password rules validation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const passwordStrength = [hasMinLength, hasNumber, hasSymbol].filter(Boolean).length;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const cleanPhone = phone.replace("+91", "").trim().replace(/\s/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number (+91).");
      return;
    }

    if (!hasMinLength || !hasNumber || !hasSymbol) {
      setError("Password does not meet the security criteria.");
      return;
    }

    // Proceed to 2-factor verification step
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // auto focus next
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyBoth = async () => {
    setError(null);
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter the complete 6-digit phone OTP (e.g. 123456).");
      return;
    }

    setIsLoading(true);
    // Simulate verifying both phone OTP and magic link
    setTimeout(async () => {
      const res = await signup(fullName, email, phone, password);
      setIsLoading(false);

      if (res.success) {
        setStep("success");
      } else {
        setError(res.error || "Failed to create account.");
      }
    }, 800);
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
        {step === "details" && (
          <>
            {/* Peeking Mr. Finn over top edge */}
            <div className="flex justify-center -mb-7 relative z-10">
              <MascotFinn mood="hero" size="sm" speechText="Let's walk, fam!" />
            </div>

            <Card className="p-6 sm:p-8 pt-9 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <StatusPill status="teal" size="sm">
                  New member sign up
                </StatusPill>
                <span className="text-xs font-bold text-navy/50">
                  Step 1 of 2
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-navy mb-1">
                Join the community
              </h1>
              <p className="text-sm font-normal text-navy/60 mb-6">
                Start earning reward points today. 100 points = ₹250.
              </p>

              {error && (
                <div className="mb-5 p-3.5 bg-fog border-2 border-navy rounded-button flex items-center gap-2 text-xs font-bold text-navy">
                  <AlertCircle className="w-4 h-4 text-navy shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Full name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-14 px-4 bg-canvas border border-fog rounded-input font-normal text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                    />
                    <User className="absolute right-4 top-4 w-5 h-5 text-navy/40" />
                  </div>
                </div>

                {/* Mobile Number (+91 default) */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Mobile number (India +91)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-14 px-4 bg-canvas border border-fog rounded-input font-normal text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                    />
                    <Phone className="absolute right-4 top-4 w-5 h-5 text-navy/40" />
                  </div>
                  <p className="text-[11px] font-normal text-navy/50 mt-1.5">
                    We'll send an SMS verification OTP to this number.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Email address
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

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Create password
                  </label>
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

                  {/* Password Strength Meter - Strict Palette Teal */}
                  <div className="mt-2.5 space-y-2">
                    <div className="flex items-center gap-1.5 h-1.5 w-full bg-fog rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          passwordStrength === 1
                            ? "w-1/3 bg-teal-300"
                            : passwordStrength === 2
                            ? "w-2/3 bg-teal-500"
                            : passwordStrength === 3
                            ? "w-full bg-teal-700"
                            : "w-0"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] font-bold">
                      <span
                        className={`flex items-center gap-1 ${
                          hasMinLength ? "text-teal-700" : "text-navy/40"
                        }`}
                      >
                        {hasMinLength ? <Check className="w-3 h-3 stroke-[2.5]" /> : <X className="w-3 h-3" />}
                        Min 8 chars
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          hasNumber ? "text-teal-700" : "text-navy/40"
                        }`}
                      >
                        {hasNumber ? <Check className="w-3 h-3 stroke-[2.5]" /> : <X className="w-3 h-3" />}
                        1 number
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          hasSymbol ? "text-teal-700" : "text-navy/40"
                        }`}
                      >
                        {hasSymbol ? <Check className="w-3 h-3 stroke-[2.5]" /> : <X className="w-3 h-3" />}
                        1 symbol
                      </span>
                    </div>
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
                    Continue to verify
                  </Button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-fog text-center text-xs font-normal text-navy/70">
                Already have an account?{" "}
                <Link href="/auth/signin" className="font-bold text-teal hover:underline">
                  Sign in here
                </Link>
              </div>
            </Card>
          </>
        )}

        {/* Verification Step: OTP + Magic Link */}
        {step === "verify" && (
          <Card className="p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <StatusPill status="teal" size="sm">
                2-way verification
              </StatusPill>
              <span className="text-xs font-bold text-navy/50">
                Step 2 of 2
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl tracking-tight text-navy mb-1">
              Verify it's you
            </h2>
            <p className="text-sm font-normal text-navy/60 mb-6">
              Both your phone OTP and email must be verified to prevent duplicate accounts.
            </p>

            {error && (
              <div className="mb-5 p-3.5 bg-fog border-2 border-navy rounded-button flex items-center gap-2 text-xs font-bold text-navy">
                <AlertCircle className="w-4 h-4 text-navy shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email magic link status tile */}
            <div className="p-4 bg-fog rounded-tile mb-5 space-y-2 border border-fog/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-2 text-navy">
                  <Mail className="w-4 h-4 text-teal" />
                  Email magic link
                </span>
                <StatusPill status="approved" size="sm">
                  Ready
                </StatusPill>
              </div>
              <p className="text-xs text-navy/60 font-normal">
                Sent to <strong>{email}</strong>. (Auto-verified in sandbox).
              </p>
            </div>

            {/* Phone OTP */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-navy">
                Enter 6-digit phone OTP sent to {phone}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    placeholder="•"
                    className="w-full h-14 text-center font-heading font-bold text-xl text-navy bg-canvas border border-fog rounded-input focus:outline-none focus:bg-white focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                ))}
              </div>
              <p className="text-[11px] text-navy/50 text-center font-normal">
                Demo code: Enter any 6 digits (e.g. 1 2 3 4 5 6)
              </p>
            </div>

            <Button
              onClick={handleVerifyBoth}
              variant="primary"
              fullWidth
              size="xl"
              isLoading={isLoading}
              icon={<ShieldCheck className="w-5 h-5" />}
            >
              Complete verification
            </Button>

            <button
              onClick={() => setStep("details")}
              className="mt-4 w-full text-center text-xs font-bold text-navy/60 hover:text-navy"
            >
              ← Edit name, phone or email
            </button>
          </Card>
        )}

        {/* Step 3: Success Screen with Mr. Finn */}
        {step === "success" && (
          <Card className="p-8 text-center flex flex-col items-center shadow-soft">
            <MascotFinn
              mood="celebrating"
              size="lg"
              speechText="Finn approved this one! 🎉"
              className="mb-4"
            />

            <StatusPill status="approved" size="md">
              Account verified & ready
            </StatusPill>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-navy mt-4">
              You're in, {fullName.split(" ")[0]}!
            </h2>

            <p className="text-sm font-normal text-navy/70 max-w-sm mt-2 mb-6">
              Your WalkShark community wallet is created. Share your first Instagram activity to earn points right away.
            </p>

            <Button
              onClick={() => router.push("/dashboard")}
              variant="primary"
              fullWidth
              size="xl"
              icon={<Sparkles className="w-5 h-5" />}
            >
              Go to my dashboard
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
