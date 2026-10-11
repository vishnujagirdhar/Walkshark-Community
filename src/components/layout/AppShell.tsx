"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BottomTabBar } from "./BottomTabBar";
import { useAppStore } from "@/lib/store";

interface AppShellProps {
  children: React.ReactNode;
  showGreeting?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, showGreeting = true }) => {
  const { currentUser } = useAppStore();

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-[1200px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-5 sm:p-6 lg:p-8 pb-28 md:pb-12 max-w-full overflow-hidden">
          {/* Greeting block: 'Morning' in Bricolage Grotesque Bold and member's name below it */}
          {showGreeting && (
            <div className="mb-6 sm:mb-8 select-none">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight block">
                Morning,
              </span>
              <h2 className="font-body font-normal text-lg sm:text-xl text-navy mt-0.5">
                {currentUser?.full_name || "WalkShark Strider"}
              </h2>
              <p className="font-body text-xs text-navy-muted mt-1">
                Your points are safe and verified.
              </p>
            </div>
          )}

          {children}
        </main>
      </div>

      <BottomTabBar />
    </div>
  );
};
