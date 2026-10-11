"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { LiquidBlob } from "@/components/ui/LiquidBlob";
import { useAppStore } from "@/lib/store";
import {
  Camera,
  Film,
  Image as ImageIcon,
  Compass,
  Users,
  Gift,
  ArrowRight,
  Check,
  Sparkles,
  ChevronDown,
  Calculator,
} from "lucide-react";

export default function LandingPage() {
  const { activityTypes, milestones } = useAppStore();
  const [calculatorPoints, setCalculatorPoints] = useState<number>(170);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculatedRupees = (calculatorPoints * 2.5).toFixed(0);

  const exampleCombos = [
    { title: "1 Story", pts: 20, inr: 50, tag: "Quick share" },
    { title: "1 Reel + 1 Post", pts: 60, inr: 150, tag: "Creator stride" },
    { title: "1 Travel + 1 Story", pts: 70, inr: 175, tag: "Weekend trip" },
    { title: "1 Family Walk + 1 Reel", pts: 110, inr: 275, tag: "Popular combo" },
    { title: "2 Family Walks", pts: 160, inr: 400, tag: "Community favorite" },
    {
      title: "1 Family + 1 Travel + 1 Reel + 1 Birthday",
      pts: 170,
      inr: 425,
      tag: "Champion bundle",
      highlight: true,
    },
  ];

  const faqs = [
    {
      q: "How does the WalkShark Rewards Points system work?",
      a: "For every WalkShark moment you share on Instagram (Stories, Reels, Feed posts, Travel or Family walks), you submit the public link here. After our team verifies the post, your points are automatically credited. 100 Points = ₹250 directly.",
    },
    {
      q: "When do I get my points credited?",
      a: "Points are credited strictly after admin verification. Submissions are reviewed within 24 to 48 hours to ensure content is authentic and original.",
    },
    {
      q: "Can I submit the same Instagram post more than once?",
      a: "No! WalkShark enforces a strict 'one submission, one reward' rule. Duplicate URLs are automatically blocked by our verification system.",
    },
    {
      q: "How and when can I redeem my earned points?",
      a: "Once you reach a minimum of 100 points (₹250), you can request redemption directly from your dashboard. Redemptions are fulfilled per WalkShark community policy via UPI or store voucher.",
    },
    {
      q: "Can I use bought likes or boosted engagement?",
      a: "Strictly forbidden. Any artificial engagement or copied content will lead to immediate submission rejection and potential account suspension.",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col relative overflow-hidden text-navy">
      <Navbar />

      {/* Hero Section: Huge Teal Gradient Hero Card (radius 40px) */}
      <section className="relative pt-6 sm:pt-10 pb-12 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <LiquidBlob className="top-10 left-10 w-72 h-72 bg-teal-300/20" />
        <LiquidBlob className="top-40 right-10 w-96 h-96 bg-teal-100/30" />

        <div className="relative bg-gradient-teal-card rounded-hero shadow-teal-glow p-8 sm:p-12 lg:p-16 text-white overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-body font-medium text-white shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-teal-100" />
                <span>Official WalkShark member rewards</span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] text-white">
                Walk. <br />
                Share. <br />
                Explore. <br />
                <span className="text-teal-100 underline decoration-white/30 underline-offset-8">
                  Earn.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/90 font-body font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Every step counts. Post your WalkShark stories, reels, and walking adventures on Instagram to earn points. Redeem real community rewards: <strong>100 points = ₹250</strong>.
              </p>

              {/* Explainer Pill in Hero */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 p-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-body text-white">
                <span className="bg-white text-navy px-3 py-1 rounded-full font-bold">
                  100 points = ₹250
                </span>
                <span className="text-white/90 px-2">1 point = ₹2.50 direct value</span>
                <span className="bg-navy-900/60 text-white px-3 py-1 rounded-full">
                  Zero subscription
                </span>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="xl"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Join the community
                  </Button>
                </Link>
                <Link href="/auth/signin" className="w-full sm:w-auto">
                  <Button variant="navy" size="xl" fullWidth>
                    Sign in to account
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Right: Big 3D Mr. Finn overflowing card edge */}
            <div className="lg:col-span-5 flex justify-center items-center z-10 lg:-mr-8">
              <div className="relative">
                <MascotFinn
                  mood="hero"
                  size="hero"
                  interactive={true}
                  speechText="Let's walk, fam 🦈"
                  className="w-full max-w-[340px] filter drop-shadow-[0_20px_40px_rgba(12,35,66,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker in Navy Pill Container */}
      <MarqueeStrip className="my-6" />

      {/* 100 Points = ₹250 Explainer Card */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <Card variant="navy" className="p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-white text-xs font-body font-medium">
                Transparent rewards
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white leading-tight">
                100 points = ₹250. <br />
                <span className="text-teal-300">No hidden tricks.</span>
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl font-body">
                Every approved WalkShark activity adds points directly to your append-only ledger. When you hit 100 points, that is ₹250 in genuine community reward value ready to redeem.
              </p>
            </div>

            {/* Interactive Calculator Card */}
            <div className="lg:col-span-5 bg-white rounded-card shadow-soft p-6 sm:p-7 text-navy">
              <div className="flex items-center justify-between pb-3 border-b border-fog">
                <span className="font-heading font-bold text-sm text-navy flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-teal-600" />
                  Reward calculator
                </span>
                <StatusPill status="value">1 pt = ₹2.50</StatusPill>
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-body mb-2">
                    <span className="text-navy-muted">Points to calculate:</span>
                    <span className="font-heading font-bold text-sm text-teal-600">
                      {calculatorPoints} pts
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={calculatorPoints}
                    onChange={(e) => setCalculatorPoints(Number(e.target.value))}
                    className="w-full h-2.5 bg-fog rounded-full cursor-pointer accent-teal-500"
                  />
                  <div className="flex justify-between text-[11px] text-navy-muted font-body mt-1.5">
                    <span>10 pts (₹25)</span>
                    <span>170 pts (₹425)</span>
                    <span>1,000 pts (₹2,500)</span>
                  </div>
                </div>

                <div className="p-5 bg-teal-50 rounded-tile text-center border border-teal-100">
                  <span className="font-body text-xs text-navy-muted block">
                    Estimated reward value:
                  </span>
                  <span className="font-heading font-bold text-4xl sm:text-5xl text-navy tracking-tight mt-1 block">
                    ₹{calculatedRupees}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* How It Works in 3 Steps */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <StatusPill status="teal">Simple 3-step flow</StatusPill>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-3">
            How it works
          </h2>
          <p className="text-navy-muted text-sm sm:text-base font-body mt-2">
            No complex surveys or coupons. Just walk, post on your feed, and stack up points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-button flex items-center justify-center font-heading font-bold text-lg mb-4">
                01
              </div>
              <h3 className="font-heading font-bold text-xl text-navy mb-2">
                Do an activity
              </h3>
              <p className="text-sm text-navy-muted font-body leading-relaxed">
                Slip into your WalkShark footwear. Film a reel, snap a story, take a travel photo, or go on a family walk.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-fog font-body text-xs text-teal-700 font-medium">
              Original content only • Product visible
            </div>
          </Card>

          {/* Step 2 */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-button flex items-center justify-center font-heading font-bold text-lg mb-4">
                02
              </div>
              <h3 className="font-heading font-bold text-xl text-navy mb-2">
                Submit your link
              </h3>
              <p className="text-sm text-navy-muted font-body leading-relaxed">
                Paste your Instagram link into our member portal. Upload an optional screenshot proof and confirm community terms.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-fog font-body text-xs text-teal-700 font-medium">
              Instant URL validation • Anti-duplicate check
            </div>
          </Card>

          {/* Step 3 */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-button flex items-center justify-center font-heading font-bold text-lg mb-4">
                03
              </div>
              <h3 className="font-heading font-bold text-xl text-navy mb-2">
                Get points after approval
              </h3>
              <p className="text-sm text-navy-muted font-body leading-relaxed">
                Once reviewed by Mr. Finn’s team, points hit your ledger. Reach 100 points to unlock ₹250 rewards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-fog font-body text-xs text-teal-700 font-medium">
              Append-only ledger • Fast verification
            </div>
          </Card>
        </div>
      </section>

      {/* Earning Ways Grid (All 6 Activities) */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <StatusPill status="teal">Points menu</StatusPill>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">
              Ways to earn
            </h2>
            <p className="text-navy-muted text-sm font-body mt-1">
              Exact reward points configured per WalkShark community specifications.
            </p>
          </div>
          <Link href="/rules">
            <Button variant="secondary" size="sm">
              View community rules
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activityTypes.map((act) => {
            const iconMap: Record<string, React.ReactNode> = {
              Camera: <Camera className="w-5 h-5 text-teal-600" />,
              Film: <Film className="w-5 h-5 text-teal-600" />,
              Image: <ImageIcon className="w-5 h-5 text-teal-600" />,
              Compass: <Compass className="w-5 h-5 text-teal-600" />,
              Users: <Users className="w-5 h-5 text-teal-600" />,
              Gift: <Gift className="w-5 h-5 text-teal-600" />,
            };

            return (
              <Card key={act.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-button bg-teal-50 flex items-center justify-center">
                      {iconMap[act.icon] || <Camera className="w-5 h-5 text-teal-600" />}
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-bold text-2xl text-teal-600 block leading-none">
                        +{act.points} pts
                      </span>
                      <span className="font-body text-xs text-navy-muted">
                        ₹{act.reward_inr} value
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-navy mb-2">
                    {act.name}
                  </h3>
                  <p className="text-sm font-body text-navy-muted leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-fog flex items-center justify-between text-xs font-body">
                  <span className="text-navy-muted">Verified payout</span>
                  <span className="text-teal-700 font-bold">
                    ₹{(act.points * 2.5).toFixed(0)} value
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Example Stacking Combinations */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <Card className="p-7 sm:p-9">
          <div className="mb-6">
            <StatusPill status="fog">Real stack examples</StatusPill>
            <h3 className="font-heading font-bold text-2xl text-navy mt-2">
              How fast can you stack?
            </h3>
            <p className="text-sm font-body text-navy-muted mt-1">
              Combine activities each week to hit your reward milestones quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleCombos.map((combo, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-tile border transition-all ${
                  combo.highlight
                    ? "bg-teal-50 border-teal-200 shadow-teal-glow"
                    : "bg-fog-light border-fog"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-body font-medium px-2 py-0.5 rounded-full bg-white text-navy shadow-subtle">
                    {combo.tag}
                  </span>
                  <span className="font-heading font-bold text-sm text-teal-600">
                    {combo.pts} pts
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-navy mt-3">
                  {combo.title}
                </h4>
                <div className="mt-3 pt-2 border-t border-fog flex items-center justify-between text-xs font-body">
                  <span className="text-navy-muted">Reward value</span>
                  <span className="font-heading font-bold text-navy text-sm">
                    ₹{combo.inr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Milestones Preview */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-8">
          <StatusPill status="teal">Milestones ladder</StatusPill>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy mt-2">
            Level up your rewards
          </h2>
          <p className="text-navy-muted text-sm font-body mt-1">
            Unlock celebration milestones and badges as your verified points climb.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {milestones.map((ms, idx) => (
            <Card key={ms.id} hoverEffect className="text-center p-6">
              <div className="w-12 h-12 mx-auto rounded-button bg-teal-50 text-teal-700 flex items-center justify-center font-heading font-bold text-base mb-3 shadow-subtle">
                #{idx + 1}
              </div>
              <span className="font-heading font-bold text-2xl text-navy block">
                {ms.points_threshold} pts
              </span>
              <span className="font-heading font-bold text-sm text-teal-600 block mb-2">
                ₹{ms.reward_inr} reward
              </span>
              <p className="text-xs font-body text-navy-muted italic border-t border-fog pt-2">
                "{ms.celebration_message}"
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Rules Summary */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <div className="bg-fog rounded-card p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <StatusPill status="navy">Community standards</StatusPill>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy mt-2">
                The 8 Community Rules
              </h2>
            </div>
            <Link href="/rules">
              <Button variant="primary" size="md">
                Read complete guidelines
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              "1. Original content only (no reposts)",
              "2. One submission, one reward",
              "3. Product clearly visible in gear shots",
              "4. Public Instagram URL or verified proof",
              "5. WalkShark may reject misleading content",
              "6. Zero artificial engagement allowed",
              "7. Points credited after admin approval",
              "8. Redeemable per active policy",
            ].map((rule, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-tile shadow-subtle font-body text-xs text-navy font-medium flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-10 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <StatusPill status="fog">FAQ</StatusPill>
          <h2 className="font-heading font-bold text-3xl text-navy mt-2">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-tile shadow-soft overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-heading font-bold text-base text-navy hover:text-teal-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-teal-600" : "text-navy-muted"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm font-body text-navy-muted leading-relaxed border-t border-fog">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="py-10 px-4 sm:px-6 max-w-[1200px] mx-auto w-full mb-6">
        <Card variant="teal" className="p-8 sm:p-12 text-center text-white">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="font-body text-xs font-medium text-white/80">
              Join thousands of WalkShark striders
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              Ready to earn your first ₹250?
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-body">
              Create your account in under 60 seconds with your mobile number and email.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/auth/signup">
                <Button variant="secondary" size="lg">
                  Create free member account
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="navy" size="lg">
                  Sign in to dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
