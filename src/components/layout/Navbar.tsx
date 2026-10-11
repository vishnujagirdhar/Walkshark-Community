"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { LayoutGrid, ShieldCheck, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, userMetrics, switchUserRole } = useAppStore();

  const isLanding = pathname === "/";
  const isAuth = pathname?.startsWith("/auth");

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-fog">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: 4-dot menu icon in 16px rounded-square button & Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-button bg-white border border-fog flex items-center justify-center text-navy shadow-subtle hover:border-teal-300 transition-colors"
            title="Menu"
            aria-label="Navigation Menu"
          >
            <LayoutGrid className="w-4 h-4 text-navy" />
          </Link>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-button bg-teal-50 border border-teal-100 flex items-center justify-center overflow-hidden">
              <Image
                src="/mascot/front.png"
                alt="WalkShark Mascot Mr. Finn"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base leading-none tracking-tight text-navy">
                WalkShark
              </span>
              <span className="font-body text-[11px] text-navy-muted">
                Community Rewards
              </span>
            </div>
          </Link>
        </div>

        {/* Public Header Right vs Logged-in Controls */}
        {isLanding || isAuth ? (
          <div className="flex items-center gap-3">
            <Link href="/rules" className="hidden sm:inline-block">
              <span className="font-body text-xs font-medium text-navy hover:text-teal-600 px-2 py-1">
                Rules
              </span>
            </Link>
            {currentUser ? (
              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  Dashboard ({userMetrics.currentPoints} pts)
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="secondary" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Join free
                  </Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          /* Member & Admin Header Controls */
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Points pill in header */}
            <Link href="/dashboard" className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-pill text-xs font-body font-medium text-navy">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>
                  <strong>{userMetrics.currentPoints} pts</strong> • ₹{userMetrics.rewardValue}
                </span>
              </div>
            </Link>

            {/* Quick Role Switcher */}
            <div className="flex items-center bg-fog p-0.5 rounded-pill text-xs font-body">
              <button
                type="button"
                onClick={() => switchUserRole("member")}
                className={`px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
                  currentUser?.role === "member"
                    ? "bg-teal-500 text-white shadow-subtle font-bold"
                    : "text-navy-muted hover:text-navy"
                }`}
              >
                Member
              </button>
              <button
                type="button"
                onClick={() => switchUserRole("admin")}
                className={`px-2.5 py-1 rounded-full transition-all text-xs font-medium flex items-center gap-1 ${
                  currentUser?.role === "admin"
                    ? "bg-navy-900 text-white shadow-subtle font-bold"
                    : "text-navy-muted hover:text-navy"
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
              </button>
            </div>

            {/* Right: Avatar in a rounded square with small teal notification dot */}
            <Link
              href="/dashboard/profile"
              className="relative w-10 h-10 rounded-button bg-white border border-fog flex items-center justify-center shadow-subtle hover:border-teal-300 transition-colors"
              title="Profile & Settings"
            >
              <span className="font-heading font-bold text-sm text-navy">
                {currentUser?.full_name?.charAt(0) || "W"}
              </span>
              {/* Teal notification dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
