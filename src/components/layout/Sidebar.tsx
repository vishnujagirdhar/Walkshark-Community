"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  LayoutDashboard,
  PlusCircle,
  Trophy,
  Gift,
  FileText,
  ShieldCheck,
  User,
  LogOut,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, userMetrics, logout } = useAppStore();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: `${userMetrics.currentPoints} pts`,
    },
    {
      name: "Submit activity",
      href: "/dashboard/submit",
      icon: PlusCircle,
    },
    {
      name: "Milestones",
      href: "/dashboard/milestones",
      icon: Trophy,
    },
    {
      name: "Redeem points",
      href: "/dashboard/redeem",
      icon: Gift,
    },
    {
      name: "Community rules",
      href: "/rules",
      icon: FileText,
    },
  ];

  if (currentUser?.role === "admin") {
    navItems.push({
      name: "Admin portal",
      href: "/admin",
      icon: ShieldCheck,
      badge: "Admin",
    });
  }

  navItems.push({
    name: "Profile & settings",
    href: "/dashboard/profile",
    icon: User,
  });

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white rounded-card shadow-soft border border-fog/80 p-5 justify-between flex-shrink-0 my-6 ml-6 h-[calc(100vh-112px)] sticky top-24 select-none">
      <div className="space-y-6">
        {/* User Card Summary */}
        <div className="p-4 bg-fog rounded-tile">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-button bg-white flex items-center justify-center font-heading font-bold text-sm text-navy shadow-subtle">
              {currentUser?.full_name?.charAt(0) || "W"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-heading font-bold text-sm truncate text-navy">
                {currentUser?.full_name || "Guest Member"}
              </h4>
              <p className="font-body text-xs text-navy-muted">
                {currentUser?.role === "admin" ? "Community admin" : "Verified member"}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-fog-border flex items-center justify-between text-xs font-body">
            <span className="text-navy-muted">Balance:</span>
            <span className="font-heading font-bold text-navy">
              {userMetrics.currentPoints} pts (₹{userMetrics.rewardValue})
            </span>
          </div>
        </div>

        {/* Navigation Links with Teal active state and Navy indicator on left edge */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-button font-body text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-700 font-bold"
                    : "text-navy hover:bg-fog-light hover:text-navy"
                }`}
              >
                {/* Navy indicator on the left edge */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-navy-900"
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-teal-600 stroke-[2.2]" : "text-navy-muted stroke-[1.8]"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-body ${
                      isActive
                        ? "bg-teal-100 text-teal-700 font-bold"
                        : "bg-fog text-navy-muted"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer sign out */}
      <div className="pt-3 border-t border-fog">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-button font-body text-xs font-medium text-navy-muted hover:text-navy hover:bg-fog-light transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};
