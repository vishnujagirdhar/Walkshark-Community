"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Link2,
  AlertOctagon,
  Ban,
  Clock,
  Gift,
} from "lucide-react";

export default function RulesPage() {
  const rules = [
    {
      num: 1,
      title: "Original content only",
      short: "No copied, stolen, or reposted third-party media.",
      desc: "Every submission must be captured and created by you. Reposted content from other creators, unaccredited brand clips, or stock media will be permanently rejected.",
      icon: CheckCircle2,
      id: "original-content",
    },
    {
      num: 2,
      title: "One submission, one reward",
      short: "Strict anti-duplicate link policy.",
      desc: "An Instagram URL may only be claimed once across the entire WalkShark platform. Submitting the same post twice will trigger automatic duplicate blocking.",
      icon: Link2,
      id: "anti-duplicate",
    },
    {
      num: 3,
      title: "Product clearly visible",
      short: "Authentic footwear & apparel visibility required.",
      desc: "For product-based activities (Travel, Family Walks, Posts, Reels), the WalkShark footwear or product must be visibly worn and clearly identifiable in the footage.",
      icon: Eye,
      id: "product-visible",
    },
    {
      num: 4,
      title: "Public Instagram link & proof",
      short: "Accessible public URL or screenshot verification.",
      desc: "Your Instagram profile or post must be public so our review moderators can access the link. Stories can include an optional screenshot proof upload.",
      icon: Sparkles,
      id: "public-link",
    },
    {
      num: 5,
      title: "Content safety & relevance",
      short: "Misleading, unsafe, or offensive posts will be rejected.",
      desc: "WalkShark reserves the right to reject submissions that promote hazardous behaviors, hate speech, vulgarity, or content completely unrelated to the brand ethos.",
      icon: AlertOctagon,
      id: "safety-policy",
    },
    {
      num: 6,
      title: "Zero artificial engagement",
      short: "No purchased likes, bots, or fake views.",
      desc: "We analyze engagement quality. Posts with fake bots, bought likes, or engagement pods will be rejected and may result in immediate account suspension.",
      icon: Ban,
      id: "anti-fraud",
    },
    {
      num: 7,
      title: "Admin verification before credit",
      short: "Points are never auto-credited without human verification.",
      desc: "Points are recorded to your append-only ledger only after our moderation team reviews your submitted URL and verifies all brand criteria.",
      icon: Clock,
      id: "verification",
    },
    {
      num: 8,
      title: "Redemption policy compliance",
      short: "Points represent community reward value.",
      desc: "Points can be redeemed once you hit the 100-point threshold (₹250 value) per active WalkShark redemption terms and payout schedules.",
      icon: Gift,
      id: "redemption-terms",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <StatusPill status="teal" size="md">
            Community guidelines
          </StatusPill>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-navy mt-3">
            WalkShark community rules
          </h1>
          <p className="text-navy/70 text-sm sm:text-base font-normal mt-2 leading-relaxed">
            Our rewards program exists to celebrate genuine WalkShark striders. Keep it real, keep it authentic, and earn points with zero friction.
          </p>
        </div>

        {/* Finn Message */}
        <div className="mb-10 p-6 bg-white rounded-card shadow-soft border border-fog/80 flex flex-col sm:flex-row items-center gap-6">
          <MascotFinn
            mood="hero"
            size="md"
            showBadge={false}
            speechText="Keep it genuine, fam! 🦈"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg text-navy tracking-tight">
              A note from Mr. Finn
            </h3>
            <p className="text-sm font-normal text-navy/70 mt-1 leading-relaxed">
              "We check every submission by hand. Follow these 8 straightforward rules and your points will be approved smoothly every single time."
            </p>
          </div>
        </div>

        {/* Rules Grid: 8 Soft Rectangles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <Card key={rule.num} hoverEffect id={rule.id} className="p-6 sm:p-7 shadow-soft border border-fog/60">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-button bg-teal-50 text-teal-700 flex items-center justify-center font-heading font-bold text-lg">
                    {rule.num}
                  </div>
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl tracking-tight text-navy mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs font-bold text-teal-700 mb-2">
                  {rule.short}
                </p>
                <p className="text-sm font-normal text-navy/70 leading-relaxed">
                  {rule.desc}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 sm:p-10 bg-white rounded-card shadow-soft border border-fog/80 text-center flex flex-col items-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-navy">
            Ready to submit your activity?
          </h2>
          <p className="text-sm text-navy/70 font-normal max-w-md mt-1.5 mb-6">
            Make sure your Instagram link is public and aligns with the 8 rules above.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/submit">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Submit activity now
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Back to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
