"use client";

import React from "react";
import Link from "next/link";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-white rounded-card shadow-soft border border-fog p-8 flex flex-col items-center">
        <MascotFinn
          mood="error"
          size="lg"
          speechText="Lost, fam? 404 territory!"
          className="mb-4"
        />

        <span className="font-heading font-bold text-5xl text-teal-600 tracking-tight">
          404
        </span>

        <h1 className="font-heading font-bold text-2xl text-navy tracking-tight mt-2">
          Page Off The Trail
        </h1>

        <p className="text-sm font-body text-navy-muted mt-2 mb-6">
          Looks like this URL wandered off the track. Even Mr. Finn doesn't recognize this path.
        </p>

        <Link href="/" className="w-full">
          <Button variant="primary" fullWidth size="md" icon={<Home className="w-4 h-4" />}>
            Back to safety
          </Button>
        </Link>
      </div>
    </div>
  );
}
