"use client";

import React from "react";
import { MascotFinn } from "@/components/mascot/MascotFinn";

export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="p-8 bg-white rounded-card shadow-soft border border-fog flex flex-col items-center max-w-sm w-full">
        <MascotFinn
          mood="walking"
          size="lg"
          speechText="Powering up the steps... ⚡"
          showBadge={false}
          className="mb-4"
        />

        <div className="w-full bg-fog rounded-full h-2.5 overflow-hidden relative mt-3">
          <div className="h-full bg-teal-500 w-2/3 rounded-full animate-pulse shadow-teal-glow" />
        </div>

        <p className="font-body text-xs text-navy-muted mt-4">
          Fetching your rewards...
        </p>
      </div>
    </div>
  );
}
