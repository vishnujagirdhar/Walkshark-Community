"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { LiquidProgressBar } from "@/components/ui/LiquidProgressBar";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { useAppStore } from "@/lib/store";
import { Milestone } from "@/types/database";
import { Trophy, Sparkles, Check, Lock } from "lucide-react";

export default function MilestonesPage() {
  const { milestones, userMetrics } = useAppStore();
  const [activeModalMilestone, setActiveModalMilestone] = useState<Milestone | null>(null);

  const triggerCelebration = (ms: Milestone) => {
    setActiveModalMilestone(ms);

    // Fire confetti bursts in STRICT PALETTE ONLY (Teal, Navy, White)
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#12789C", "#0C2342", "#FFFFFF", "#CCE4EC"],
    });
  };

  return (
    <AppShell showGreeting={false}>
      <div className="space-y-6 sm:space-y-8 select-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <StatusPill status="teal">Community ladder</StatusPill>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight mt-2">
              Reward milestones
            </h1>
            <p className="text-sm font-body text-navy-muted mt-1">
              Unlock milestone achievements and cash reward values as your points accumulate.
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-card shadow-soft border border-fog flex items-center gap-3">
            <div className="text-right">
              <span className="font-body text-xs text-navy-muted block">
                Your points
              </span>
              <span className="font-heading font-bold text-xl text-teal-600 leading-none">
                {userMetrics.currentPoints} pts
              </span>
            </div>
            <div className="w-10 h-10 rounded-button bg-teal-50 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-base text-navy">
              Journey to Champion (1,000 pts)
            </span>
            <StatusPill status="value">
              {Math.min(Math.round((userMetrics.currentPoints / 1000) * 100), 100)}% complete
            </StatusPill>
          </div>
          <LiquidProgressBar
            current={userMetrics.currentPoints}
            target={1000}
            sublabel="Stack up your approved activities to unlock higher tier milestone rewards."
          />
        </Card>

        {/* Milestones Visual Ladder */}
        <div className="space-y-4">
          {milestones.map((ms, index) => {
            const isUnlocked = userMetrics.currentPoints >= ms.points_threshold;
            const isNext =
              !isUnlocked &&
              (index === 0 || userMetrics.currentPoints >= milestones[index - 1]?.points_threshold);

            return (
              <div
                key={ms.id}
                className={`p-5 sm:p-6 rounded-card transition-all ${
                  isUnlocked
                    ? "bg-white shadow-soft border border-teal-200"
                    : isNext
                    ? "bg-white shadow-teal-glow border-2 border-teal-500"
                    : "bg-fog/60 shadow-subtle border border-fog/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Badge / Number */}
                    <div
                      className={`w-12 h-12 rounded-button flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? "bg-teal-100 text-teal-700"
                          : isNext
                          ? "bg-teal-500 text-white shadow-teal-glow"
                          : "bg-fog text-navy-muted"
                      }`}
                    >
                      {isUnlocked ? (
                        <Check className="w-6 h-6 stroke-[2.5]" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
                          {ms.points_threshold} points milestone
                        </h3>
                        {isUnlocked && (
                          <StatusPill status="approved">Unlocked</StatusPill>
                        )}
                        {isNext && (
                          <StatusPill status="teal">Up next</StatusPill>
                        )}
                      </div>

                      <p className="text-sm font-body text-navy-muted mt-1 italic">
                        "{ms.celebration_message}"
                      </p>

                      <div className="flex items-center gap-3 text-xs font-body text-teal-700 font-medium mt-2">
                        <span>Reward value: ₹{ms.reward_inr}</span>
                        <span>•</span>
                        <span>Tier #{ms.sort_order}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / View Celebration */}
                  <div className="flex items-center justify-end flex-shrink-0">
                    {isUnlocked ? (
                      <Button
                        onClick={() => triggerCelebration(ms)}
                        variant="primary"
                        size="md"
                        icon={<Sparkles className="w-4 h-4" />}
                      >
                        View celebration
                      </Button>
                    ) : (
                      <div className="text-right">
                        <span className="font-body text-xs text-navy-muted block font-medium">
                          Need {ms.points_threshold - userMetrics.currentPoints} more pts
                        </span>
                        <span className="text-[11px] text-navy-muted">
                          Keep striding fam
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Celebration Sheet / Modal */}
        <BottomSheetModal
          isOpen={Boolean(activeModalMilestone)}
          onClose={() => setActiveModalMilestone(null)}
        >
          {activeModalMilestone && (
            <div className="text-center flex flex-col items-center">
              <MascotFinn
                mood="celebrating"
                size="lg"
                speechText="Finn approved this one! 🎉"
                className="mb-3"
              />

              <StatusPill status="approved">Milestone unlocked!</StatusPill>

              <h2 className="font-heading font-bold text-3xl text-navy mt-2">
                {activeModalMilestone.points_threshold} points
              </h2>

              <p className="font-heading font-bold text-lg text-teal-600 mt-1">
                ₹{activeModalMilestone.reward_inr} reward value
              </p>

              <div className="p-4 bg-teal-50 rounded-tile my-4 border border-teal-100 text-center">
                <p className="text-sm font-body text-navy italic">
                  "{activeModalMilestone.celebration_message}"
                </p>
              </div>

              <div className="w-full">
                <Button
                  onClick={() => setActiveModalMilestone(null)}
                  variant="primary"
                  fullWidth
                  size="md"
                >
                  Let's keep walking! 🦈
                </Button>
              </div>
            </div>
          )}
        </BottomSheetModal>
      </div>
    </AppShell>
  );
}
