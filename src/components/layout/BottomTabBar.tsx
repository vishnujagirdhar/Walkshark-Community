"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  Home,
  Plus,
  Trophy,
  Gift,
  User,
  ShieldCheck,
} from "lucide-react";

export const BottomTabBar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser } = useAppStore();

  const tabs = [
    { id: "home", href: "/dashboard", icon: Home, label: "Home" },
    { id: "submit", href: "/dashboard/submit", icon: Plus, label: "Submit" },
    { id: "milestones", href: "/dashboard/milestones", icon: Trophy, label: "Milestones" },
    { id: "redeem", href: "/dashboard/redeem", icon: Gift, label: "Rewards" },
  ];

  if (currentUser?.role === "admin") {
    tabs.push({ id: "admin", href: "/admin", icon: ShieldCheck, label: "Admin" });
  } else {
    tabs.push({ id: "profile", href: "/dashboard/profile", icon: User, label: "Profile" });
  }

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 select-none pb-safe">
      <div className="relative max-w-sm mx-auto bg-white rounded-pill shadow-soft border border-fog/80 px-3 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative min-w-[48px] min-h-[46px] flex items-center justify-center rounded-full transition-colors"
              aria-label={tab.label}
            >
              {/* Sliding Navy indicator notch on top of the bar */}
              {isActive && (
                <motion.div
                  layoutId="activeNavNotch"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className="absolute -top-2 w-7 h-1 rounded-full bg-navy-900 shadow-sm"
                />
              )}

              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-teal-500 stroke-[2.5]" : "text-navy-muted hover:text-navy stroke-[1.8]"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
