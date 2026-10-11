"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { useAppStore } from "@/lib/store";
import { Gift, AlertCircle, Check, CreditCard } from "lucide-react";

export default function RedeemPage() {
  const { currentUser, userMetrics, settings, redemptions, requestRedemption } = useAppStore();

  const [pointsToRedeem, setPointsToRedeem] = useState<number>(100);
  const [paymentDetails, setPaymentDetails] = useState("aarav@okaxis");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userRedemptions = redemptions.filter((r) => r.user_id === currentUser?.id);
  const calculatedRupees = (pointsToRedeem * settings.points_conversion_rate).toFixed(0);
  const canRedeem = userMetrics.currentPoints >= settings.min_redemption_points;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (pointsToRedeem < settings.min_redemption_points) {
      setError(`Minimum redemption threshold is ${settings.min_redemption_points} points.`);
      return;
    }

    if (pointsToRedeem > userMetrics.currentPoints) {
      setError("Cannot redeem more points than your available balance.");
      return;
    }

    if (!paymentDetails.trim()) {
      setError("Please provide a valid UPI ID or payout destination.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = requestRedemption(pointsToRedeem, paymentDetails.trim(), notes.trim());
      setIsLoading(false);

      if (res.success) {
        setSuccessMessage(
          `Redemption request for ${pointsToRedeem} points (₹${calculatedRupees}) submitted successfully!`
        );
        setNotes("");
      } else {
        setError(res.error || "Failed to submit redemption request.");
      }
    }, 600);
  };

  return (
    <AppShell showGreeting={false}>
      <div className="space-y-6 sm:space-y-8 select-none max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <StatusPill status="teal">Rewards cash-out</StatusPill>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight mt-2">
            Redeem reward points
          </h1>
          <p className="text-sm font-body text-navy-muted mt-1">
            Convert your verified WalkShark points into rewards. 100 points = ₹250.
          </p>
        </div>

        {/* Configurable Policy Card */}
        <Card className="p-6 bg-teal-50 border border-teal-100 space-y-2">
          <div className="flex items-center gap-2">
            <StatusPill status="navy">Active redemption policy</StatusPill>
            <span className="text-[11px] font-body text-navy-muted">
              Configurable by admin
            </span>
          </div>
          <p className="text-sm font-body text-navy leading-relaxed">
            {settings.redemption_policy}
          </p>
          <div className="pt-2 flex flex-wrap gap-3 text-xs font-body text-teal-700 font-medium">
            <span>Minimum: {settings.min_redemption_points} points (₹{settings.min_redemption_points * 2.5})</span>
            <span>•</span>
            <span>Standard processing: 48–72 hours</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Redemption Form */}
          <div className="md:col-span-7">
            <Card className="p-6 sm:p-7 bg-white">
              <h2 className="font-heading font-bold text-lg text-navy mb-1">
                Request redemption
              </h2>
              <p className="text-xs font-body text-navy-muted mb-6">
                Available balance: <strong>{userMetrics.currentPoints} pts</strong> (₹{userMetrics.rewardValue})
              </p>

              {error && (
                <div className="mb-4 p-3 bg-fog rounded-tile text-xs font-body font-medium text-navy flex items-center gap-2 border border-navy/20 ring-2 ring-navy/10">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-teal-50 rounded-tile text-xs font-body font-medium text-teal-700 flex items-center gap-2 border border-teal-200">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {canRedeem ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Points Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-heading font-bold text-xs text-navy">
                        Points to redeem (Min. {settings.min_redemption_points})
                      </label>
                      <button
                        type="button"
                        onClick={() => setPointsToRedeem(userMetrics.currentPoints)}
                        className="text-[11px] font-body text-teal-700 font-medium hover:underline"
                      >
                        Redeem max ({userMetrics.currentPoints} pts)
                      </button>
                    </div>
                    <input
                      type="number"
                      min={settings.min_redemption_points}
                      max={userMetrics.currentPoints}
                      step="10"
                      value={pointsToRedeem}
                      onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                      className="w-full soft-input font-heading font-bold text-lg"
                    />
                  </div>

                  {/* Calculated Rupee Payout Card */}
                  <div className="p-4 bg-gradient-teal-card text-white rounded-tile shadow-teal-glow flex items-center justify-between">
                    <span className="font-body text-xs font-medium text-white/90">
                      Calculated payout:
                    </span>
                    <span className="font-heading font-bold text-2xl text-white">
                      ₹{calculatedRupees}
                    </span>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                      UPI ID or payout destination
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. mobile@upi or account number"
                        value={paymentDetails}
                        onChange={(e) => setPaymentDetails(e.target.value)}
                        className="w-full soft-input pr-10"
                      />
                      <CreditCard className="absolute right-3.5 top-4 w-4 h-4 text-navy-muted" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                      Special instructions / notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Prefer store gift voucher instead of UPI"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-input border border-fog bg-white px-4 py-2.5 text-sm font-body text-navy focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                    icon={<Gift className="w-4 h-4" />}
                  >
                    Submit redemption request (₹{calculatedRupees})
                  </Button>
                </form>
              ) : (
                <div className="p-6 bg-fog rounded-tile text-center space-y-3">
                  <MascotFinn mood="walking" size="md" showBadge={false} />
                  <h4 className="font-heading font-bold text-base text-navy">
                    Almost there fam!
                  </h4>
                  <p className="text-xs font-body text-navy-muted max-w-xs mx-auto">
                    You currently have {userMetrics.currentPoints} points. You need at least{" "}
                    <strong>{settings.min_redemption_points} points</strong> to request your first reward payout.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Past Redemptions List */}
          <div className="md:col-span-5 space-y-4">
            <Card className="p-6 bg-white">
              <h3 className="font-heading font-bold text-base text-navy mb-4">
                Redemption requests
              </h3>

              {userRedemptions.length === 0 ? (
                <div className="text-center py-8 text-navy-muted font-body text-xs">
                  No redemptions requested yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {userRedemptions.map((red) => (
                    <div
                      key={red.id}
                      className="p-3.5 bg-fog rounded-tile shadow-subtle flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-navy">
                            ₹{red.amount_inr}
                          </span>
                          <StatusPill status={red.status as any} />
                        </div>
                        <span className="text-[11px] font-body text-navy-muted block mt-0.5">
                          {red.points_redeemed} pts • {new Date(red.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="font-body text-xs text-teal-700 font-medium">
                        {red.payment_details}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="p-4 bg-white rounded-card shadow-subtle border border-fog text-xs font-body text-navy-muted space-y-1">
              <span className="font-heading font-bold text-xs block text-navy">
                Redemption checklist:
              </span>
              <p>• Payout is issued once approved by Admin in the queue.</p>
              <p>• Balance updates immediately upon submitting the request.</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
