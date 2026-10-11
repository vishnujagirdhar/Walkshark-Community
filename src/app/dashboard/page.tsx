"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { MetricCard } from "@/components/ui/MetricCard";
import { WeekStrip } from "@/components/ui/WeekStrip";
import { ActivityTile } from "@/components/ui/ActivityTile";
import { LiquidProgressBar } from "@/components/ui/LiquidProgressBar";
import { useAppStore } from "@/lib/store";
import {
  Plus,
  Trophy,
  Gift,
  ExternalLink,
  Bookmark,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { userMetrics, submissions, activityTypes } = useAppStore();
  const [selectedActivitySlug, setSelectedActivitySlug] = useState<string>("all");

  const latestSubmission = submissions[0];

  const filteredSubmissions =
    selectedActivitySlug === "all"
      ? submissions
      : submissions.filter((s) => {
          const type = activityTypes.find((a) => a.id === s.activity_type_id);
          return type?.slug === selectedActivitySlug;
        });

  return (
    <AppShell showGreeting={true}>
      <div className="space-y-6 sm:space-y-8 select-none">
        {/* Metric Cards Carousel (Horizontally scrollable snap carousel on mobile peeking next card, 4-col grid on desktop) */}
        <div className="w-full">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            <MetricCard
              type="points"
              label="Current balance"
              value={userMetrics.currentPoints}
              suffix="pts"
              subtext="100 pts = ₹250"
            />
            <MetricCard
              type="reward"
              label="Reward value"
              value={userMetrics.rewardValue}
              prefix="₹"
              subtext="Direct redeemable cash"
            />
            <MetricCard
              type="lifetime"
              label="Lifetime points"
              value={userMetrics.lifetimePoints}
              suffix="pts"
              subtext="Total verified earned"
            />
            <MetricCard
              type="approved"
              label="Approved activities"
              value={userMetrics.approvedCount}
              subtext={`${userMetrics.pendingCount} pending review`}
            />
          </div>
        </div>

        {/* Week Strip (Horizontal row of day tiles, active day taller Teal gradient pill with bell, activity dots) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-sm text-navy">
              This week's activity
            </span>
            <span className="font-body text-xs text-navy-muted">
              Tap day to filter
            </span>
          </div>
          <WeekStrip
            onSelectDate={(_dayIdx) => {
              // Day filter interaction
            }}
          />
        </div>

        {/* Next Milestone Liquid Progress Card */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="font-body text-xs text-teal-700 font-medium">
                Milestone tracker
              </span>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
                Next milestone: {userMetrics.nextMilestone?.points_threshold} points (= ₹{userMetrics.nextMilestone?.reward_inr})
              </h3>
            </div>
            <Link href="/dashboard/milestones">
              <Button variant="secondary" size="sm" icon={<Trophy className="w-4 h-4 text-teal-600" />}>
                View all milestones
              </Button>
            </Link>
          </div>

          <LiquidProgressBar
            current={userMetrics.currentPoints}
            target={userMetrics.nextMilestone?.points_threshold || 250}
            sublabel={`Only ${Math.max(
              (userMetrics.nextMilestone?.points_threshold || 250) - userMetrics.currentPoints,
              0
            )} more points until you unlock: "${userMetrics.nextMilestone?.celebration_message}"`}
          />
        </Card>

        {/* Activity Type Cards: Horizontal scrolling rounded tiles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-navy">
                Earning categories
              </h3>
              <p className="font-body text-xs text-navy-muted">
                Choose an activity to submit and earn points
              </p>
            </div>
            <Link href="/dashboard/submit">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                Submit
              </Button>
            </Link>
          </div>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            {activityTypes.map((act) => (
              <ActivityTile
                key={act.id}
                id={act.id}
                name={act.name}
                points={act.points}
                rewardInr={act.reward_inr}
                iconName={act.icon}
                isActive={selectedActivitySlug === act.slug}
                onClick={() =>
                  setSelectedActivitySlug(
                    selectedActivitySlug === act.slug ? "all" : act.slug
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Latest Submission Card */}
        {latestSubmission && (
          <div className="space-y-2">
            <span className="font-heading font-bold text-sm text-navy">
              Latest submission
            </span>
            <Card hoverEffect className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-button bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-base text-navy">
                      {latestSubmission.activity_name || "Instagram activity"}
                    </h4>
                    <StatusPill status={latestSubmission.status as any} />
                  </div>
                  <p className="font-body text-xs text-navy-muted mt-0.5">
                    {latestSubmission.caption || "Shared WalkShark moments with the community."}
                  </p>
                  <span className="font-body text-[11px] text-navy-muted block mt-1">
                    Submitted on {new Date(latestSubmission.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-fog">
                <div className="text-left sm:text-right">
                  <span className="font-heading font-bold text-base text-teal-600 block">
                    +{latestSubmission.points_assigned} pts
                  </span>
                  <span className="font-body text-xs text-navy-muted">
                    ₹{latestSubmission.reward_inr} value
                  </span>
                </div>
                <div className="w-9 h-9 rounded-button bg-fog flex items-center justify-center text-navy shadow-subtle">
                  <Bookmark className="w-4 h-4 text-navy" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Reward History List (Separated by space, rounded-square thumbnail, bold title, points detail, action button) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-navy">
                Reward history
              </h3>
              <p className="font-body text-xs text-navy-muted">
                Spaced timeline of points earned and redeemed
              </p>
            </div>
            <StatusPill status="value">Append-only ledger</StatusPill>
          </div>

          <div className="space-y-3">
            {filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 sm:p-5 bg-white rounded-card shadow-soft border border-fog/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-teal-200"
              >
                <div className="flex items-center gap-3.5">
                  {/* Rounded-square thumbnail */}
                  <div className="w-11 h-11 rounded-button bg-fog flex items-center justify-center font-heading font-bold text-sm text-navy flex-shrink-0">
                    {sub.activity_name?.charAt(0) || "W"}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-navy">
                        {sub.activity_name}
                      </h4>
                      <StatusPill status={sub.status as any} />
                    </div>
                    <p className="font-body text-xs text-navy-muted mt-0.5">
                      Submitted {new Date(sub.created_at).toLocaleDateString()} • +{sub.points_assigned} points (₹{sub.reward_inr})
                    </p>
                    {sub.rejection_reason && (
                      <span className="font-body text-xs text-navy-muted block mt-1">
                        Reason: {sub.rejection_reason}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-fog">
                  <span className="font-heading font-bold text-base text-teal-600">
                    +{sub.points_assigned} pts
                  </span>

                  {/* Circular / square Fog Grey action button */}
                  <a
                    href={sub.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-button bg-fog flex items-center justify-center text-navy hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    title="Open Instagram link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
