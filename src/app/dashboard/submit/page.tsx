"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { WeekStrip } from "@/components/ui/WeekStrip";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { useAppStore } from "@/lib/store";
import {
  Link2,
  Upload,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function SubmitActivityPage() {
  const router = useRouter();
  const { activityTypes, submitActivity } = useAppStore();

  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    activityTypes[0]?.id || ""
  );
  const [instagramUrl, setInstagramUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const selectedActivity = activityTypes.find((a) => a.id === selectedActivityId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Proof image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const urlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|stories|tv|[\w.]+)\/?.*/i;
    if (!instagramUrl.trim() || !urlPattern.test(instagramUrl.trim())) {
      setError("Please paste a valid public Instagram link (e.g. https://www.instagram.com/reel/...).");
      return;
    }

    if (!agreedTerms) {
      setError("You must confirm that your submission meets the community standards.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = submitActivity({
        activityTypeId: selectedActivityId,
        instagramUrl: instagramUrl.trim(),
        proofUrl: proofPreview || undefined,
        caption: caption.trim(),
      });

      setIsLoading(false);

      if (res.success) {
        setIsSuccessModalOpen(true);
      } else {
        setError(res.error || "Failed to submit activity.");
      }
    }, 600);
  };

  return (
    <AppShell showGreeting={false}>
      <div className="max-w-2xl mx-auto space-y-6 select-none">
        {/* Header */}
        <div className="text-left">
          <StatusPill status="teal">New submission</StatusPill>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight mt-2">
            Submit an activity
          </h1>
          <p className="text-sm font-body text-navy-muted mt-1">
            Share your Instagram link for moderator verification. One submission, one reward.
          </p>
        </div>

        {/* Week Strip */}
        <Card className="p-4 sm:p-5">
          <span className="font-body text-xs text-navy-muted block mb-2">
            Submission timeline
          </span>
          <WeekStrip />
        </Card>

        {/* Submission Form Card */}
        <Card className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 bg-fog rounded-tile text-xs font-body font-medium text-navy flex items-start gap-2.5 border border-navy/20 ring-2 ring-navy/10">
              <AlertCircle className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Activity */}
            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-2.5">
                1. Select activity category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activityTypes.map((act) => {
                  const isSelected = act.id === selectedActivityId;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedActivityId(act.id)}
                      className={`p-4 rounded-tile text-left transition-all ${
                        isSelected
                          ? "bg-teal-50 border-2 border-teal-500 shadow-teal-glow"
                          : "bg-fog-light border border-fog hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-navy">
                          {act.name}
                        </span>
                        <span className="font-heading font-bold text-xs text-teal-600">
                          +{act.points} pts
                        </span>
                      </div>
                      <span className="font-body text-xs text-navy-muted block mt-1">
                        ₹{act.reward_inr} reward value
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Instagram URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-heading font-bold text-xs text-navy">
                  2. Instagram URL (Public post / reel / story)
                </label>
                <span className="font-body text-[11px] text-teal-700">
                  Anti-duplicate protected
                </span>
              </div>
              <div className="relative">
                <input
                  type="url"
                  required
                  placeholder="https://www.instagram.com/reel/C7x9..."
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full soft-input pl-4 pr-10"
                />
                <Link2 className="absolute right-3.5 top-4 w-4 h-4 text-navy-muted" />
              </div>
              <p className="text-[11px] font-body text-navy-muted mt-1.5">
                Must be a public Instagram post. Reposted or duplicate links are automatically blocked.
              </p>
            </div>

            {/* Step 3: Optional Screenshot Proof Upload */}
            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                3. Upload screenshot proof (Optional)
              </label>
              <div className="border border-dashed border-fog rounded-tile p-4 text-center bg-fog-light hover:bg-white transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {proofPreview ? (
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={proofPreview}
                      alt="Proof preview"
                      className="w-16 h-16 object-cover rounded-button border border-fog"
                    />
                    <div className="text-left">
                      <span className="font-body font-medium text-xs text-teal-700 block">
                        Proof image attached ✓
                      </span>
                      <span className="text-[11px] font-body text-navy-muted">
                        Click to change image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 py-3">
                    <Upload className="w-5 h-5 text-navy-muted" />
                    <span className="font-body text-xs text-navy font-medium">
                      Tap to upload screenshot or story archive
                    </span>
                    <span className="text-[11px] font-body text-navy-muted">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Caption / Note */}
            <div>
              <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                4. Caption / notes for moderator (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Wore the WalkShark trail grips during morning jog in Cubbon Park"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded-input border border-fog bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
              />
            </div>

            {/* Confirmation Checkbox */}
            <div className="p-4 bg-teal-50 rounded-tile border border-teal-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-fog text-teal-500 focus:ring-teal-500 mt-0.5 accent-teal-500"
                />
                <span className="text-xs font-body text-navy leading-relaxed">
                  I confirm that this is original content, the WalkShark product is clearly visible, and there is zero purchased/artificial engagement.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Submit for verification (+{selectedActivity?.points || 0} pts)
            </Button>
          </form>
        </Card>

        {/* Community Rules Reminder Box */}
        <div className="p-4 bg-white rounded-card shadow-subtle border border-fog text-xs font-body text-navy-muted flex items-center justify-between">
          <span>Remember: Points are credited only after moderator review.</span>
          <Link href="/rules" className="text-teal-700 font-medium hover:underline">
            Read rules
          </Link>
        </div>

        {/* Success Modal / Bottom Sheet with Mr. Finn */}
        <BottomSheetModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        >
          <div className="text-center flex flex-col items-center">
            <MascotFinn
              mood="reviewing"
              size="lg"
              speechText="Finn's team is on it! 🔍"
              className="mb-3"
            />

            <StatusPill status="pending">Pending review</StatusPill>

            <h2 className="font-heading font-bold text-2xl text-navy mt-3">
              Submission received!
            </h2>

            <p className="text-sm font-body text-navy-muted mt-2 mb-6 leading-relaxed">
              Your link has been submitted to the moderator queue. Once approved,{" "}
              <strong>+{selectedActivity?.points} points (₹{selectedActivity?.reward_inr})</strong>{" "}
              will be automatically credited to your append-only ledger.
            </p>

            <div className="w-full space-y-2.5">
              <Button
                onClick={() => router.push("/dashboard")}
                variant="primary"
                fullWidth
                size="md"
              >
                View on my dashboard
              </Button>
              <Button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setInstagramUrl("");
                  setCaption("");
                  setProofPreview(null);
                  setAgreedTerms(false);
                }}
                variant="secondary"
                fullWidth
                size="md"
              >
                Submit another link
              </Button>
            </div>
          </div>
        </BottomSheetModal>
      </div>
    </AppShell>
  );
}
