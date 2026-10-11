"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAppStore } from "@/lib/store";
import { User, Phone, Mail, LogOut, Check } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, logout, switchUserRole } = useAppStore();

  const [fullName, setFullName] = useState(currentUser?.full_name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) return;
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <AppShell showGreeting={false}>
      <div className="max-w-2xl mx-auto space-y-6 select-none">
        {/* Header */}
        <div>
          <StatusPill status="teal">Member profile</StatusPill>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight mt-2">
            Account & settings
          </h1>
          <p className="text-sm font-body text-navy-muted mt-1">
            Manage your personal credentials, contact info, and security preferences.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 sm:p-8 bg-white">
          <div className="flex items-center justify-between pb-4 border-b border-fog mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-button bg-teal-50 flex items-center justify-center font-heading font-bold text-lg text-teal-700 shadow-subtle">
                {fullName.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-navy">
                  {fullName || "User name"}
                </h3>
                <span className="font-body text-xs text-teal-700 font-medium">
                  {currentUser?.role === "admin" ? "Administrator" : "Verified member"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => switchUserRole(currentUser?.role === "admin" ? "member" : "admin")}
                className="px-3 py-1.5 text-xs font-body font-medium rounded-full bg-fog text-navy hover:bg-fog-border transition-colors"
              >
                Switch to {currentUser?.role === "admin" ? "Member" : "Admin"}
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-tile text-xs font-body font-medium text-teal-700 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                Full name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full soft-input pr-10"
                />
                <User className="absolute right-3.5 top-4 w-4 h-4 text-navy-muted" />
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                Registered mobile number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full soft-input pr-10"
                />
                <Phone className="absolute right-3.5 top-4 w-4 h-4 text-navy-muted" />
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full soft-input pr-10"
                />
                <Mail className="absolute right-3.5 top-4 w-4 h-4 text-navy-muted" />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md">
              Save changes
            </Button>
          </form>
        </Card>

        {/* Change Password Card */}
        <Card className="p-6 sm:p-8 bg-white">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            Change password
          </h2>

          {passwordSuccess && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-tile text-xs font-body font-medium text-teal-700 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                Current password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full soft-input"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                New password (Min. 8 characters, 1 number, 1 symbol)
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full soft-input"
              />
            </div>

            <Button type="submit" variant="secondary" size="md">
              Update password
            </Button>
          </form>
        </Card>

        {/* Sign Out Card */}
        <div className="p-5 bg-white rounded-card shadow-soft border border-fog flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-navy">
              Sign out of session
            </h3>
            <p className="text-xs text-navy-muted font-body">
              You will be redirected to the landing page.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="danger"
            size="md"
            icon={<LogOut className="w-4 h-4" />}
          >
            Sign out
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
