"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";
import { MascotFinn } from "@/components/mascot/MascotFinn";
import { useAppStore } from "@/lib/store";
import { Submission } from "@/types/database";
import {
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  Download,
  Eye,
  AlertTriangle,
  Save,
} from "lucide-react";

export default function AdminPage() {
  const {
    currentUser,
    submissions,
    activityTypes,
    redemptions,
    settings,
    approveSubmission,
    rejectSubmission,
    fulfillRedemption,
    updateSettings,
    updateActivityPoints,
    switchUserRole,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<
    "queue" | "members" | "redemptions" | "settings"
  >("queue");
  const [queueFilter, setQueueFilter] = useState<
    "pending" | "approved" | "rejected" | "all"
  >("pending");

  // Rejection Modal State
  const [rejectingSub, setRejectingSub] = useState<Submission | null>(null);
  const [rejectionReason, setRejectionReason] = useState(
    "Misleading or unverified original content (Rule #1)"
  );
  const [customRejectNote, setCustomRejectNote] = useState("");

  // Proof Image Preview Modal
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  // Editable Settings Local State
  const [localSettings, setLocalSettings] = useState(settings);
  const [localPoints, setLocalPoints] = useState<Record<string, number>>(
    activityTypes.reduce((acc, a) => ({ ...acc, [a.id]: a.points }), {})
  );
  const [settingsSaved, setSettingsSaved] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  const filteredSubmissions = submissions.filter((s) => {
    if (queueFilter === "all") return true;
    return s.status === queueFilter;
  });

  const handleApprove = (sub: Submission) => {
    approveSubmission(sub.id);
  };

  const handleConfirmReject = () => {
    if (!rejectingSub) return;
    const finalReason = customRejectNote.trim()
      ? `${rejectionReason} - ${customRejectNote.trim()}`
      : rejectionReason;
    rejectSubmission(rejectingSub.id, finalReason);
    setRejectingSub(null);
    setCustomRejectNote("");
  };

  const handleSavePlatformSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    Object.entries(localPoints).forEach(([id, pts]) => {
      updateActivityPoints(id, pts);
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleExportCSV = (type: "submissions" | "redemptions") => {
    let csvContent = "";
    if (type === "submissions") {
      const headers = [
        "Submission_ID",
        "User_Name",
        "User_Email",
        "Activity_Type",
        "Points",
        "Reward_INR",
        "Instagram_URL",
        "Status",
        "Rejection_Reason",
        "Date",
      ];
      const rows = submissions.map((s) => [
        s.id,
        `"${s.user_name || "Aarav Sharma"}"`,
        s.user_email || "aarav@walkshark.in",
        `"${s.activity_name || "Activity"}"`,
        s.points_assigned,
        s.reward_inr,
        `"${s.instagram_url}"`,
        s.status,
        `"${s.rejection_reason || ""}"`,
        s.created_at,
      ]);
      csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    } else {
      const headers = [
        "Redemption_ID",
        "User_Name",
        "Points_Redeemed",
        "Amount_INR",
        "Status",
        "Payment_Details",
        "Date",
      ];
      const rows = redemptions.map((r) => [
        r.id,
        `"${r.user_name || "Aarav Sharma"}"`,
        r.points_redeemed,
        r.amount_inr,
        r.status,
        `"${r.payment_details || ""}"`,
        r.created_at,
      ]);
      csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `walkshark_${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell showGreeting={false}>
      <div className="space-y-6 sm:space-y-8 select-none">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <StatusPill status="navy" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Admin HQ
              </StatusPill>
              <span className="font-body text-xs text-navy-muted">
                Moderation & control
              </span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy tracking-tight">
              WalkShark Community Admin
            </h1>
            <p className="text-sm font-body text-navy-muted mt-0.5">
              Verify submitted Instagram activities, approve reward points, and manage settings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleExportCSV("submissions")}
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Warning if not currently switched to Admin role */}
        {!isAdmin && (
          <div className="p-4 bg-teal-50 rounded-card border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-teal-700 flex-shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-sm text-navy">
                  Viewing in member mode
                </h4>
                <p className="text-xs font-body text-navy-muted">
                  You are currently logged in as Aarav Sharma. Switch to Admin mode to test approvals.
                </p>
              </div>
            </div>
            <Button
              onClick={() => switchUserRole("admin")}
              variant="primary"
              size="sm"
            >
              Switch to admin role
            </Button>
          </div>
        )}

        {/* Tab Navigation in Soft Rounded Pills */}
        <div className="flex flex-wrap gap-2 border-b border-fog pb-3">
          {[
            { id: "queue", label: "Review queue", count: submissions.filter((s) => s.status === "pending").length },
            { id: "members", label: "Members list", count: 1 },
            { id: "redemptions", label: "Redemptions", count: redemptions.length },
            { id: "settings", label: "Platform config" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-body text-xs font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-teal-glow font-bold"
                    : "bg-white text-navy border border-fog hover:bg-fog-light"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-white text-teal-700" : "bg-fog text-navy"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Submissions Review Queue */}
        {activeTab === "queue" && (
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5">
                {(["pending", "approved", "rejected", "all"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setQueueFilter(f)}
                    className={`px-3 py-1.5 rounded-full font-body text-xs capitalize transition-colors ${
                      queueFilter === f
                        ? "bg-navy-900 text-white font-bold shadow-subtle"
                        : "bg-white text-navy border border-fog hover:bg-fog-light"
                    }`}
                  >
                    {f} ({submissions.filter((s) => f === "all" ? true : s.status === f).length})
                  </button>
                ))}
              </div>

              <div className="text-xs font-body text-navy-muted">
                Points credited only after admin approval
              </div>
            </div>

            {/* Submissions List */}
            {filteredSubmissions.length === 0 ? (
              <div className="p-12 bg-white rounded-card shadow-soft border border-fog text-center">
                <MascotFinn mood="empty" size="md" speechText="Queue is empty, chief!" />
                <p className="text-sm font-body text-navy-muted mt-2">
                  No submissions found matching filter '{queueFilter}'.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSubmissions.map((sub) => {
                  const isPending = sub.status === "pending";
                  const isApproved = sub.status === "approved";
                  const isRejected = sub.status === "rejected";

                  return (
                    <div
                      key={sub.id}
                      className="p-5 bg-white rounded-card shadow-soft border border-fog/80 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-teal-200"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-heading font-bold text-base text-navy">
                            {sub.activity_name || "Instagram activity"}
                          </span>
                          <StatusPill status={sub.status as any} />
                          <span className="font-heading font-bold text-sm text-teal-600 ml-auto md:ml-0">
                            +{sub.points_assigned} pts (₹{sub.reward_inr})
                          </span>
                        </div>

                        <div className="text-xs font-body text-navy-muted flex flex-wrap items-center gap-3">
                          <span>
                            Submitted by: <strong>{sub.user_name || "Aarav Sharma"}</strong> ({sub.user_email || "aarav@walkshark.in"})
                          </span>
                          <span>•</span>
                          <span>{new Date(sub.created_at).toLocaleString()}</span>
                        </div>

                        {sub.caption && (
                          <p className="text-xs font-body text-navy-muted bg-fog p-2.5 rounded-tile italic">
                            "{sub.caption}"
                          </p>
                        )}

                        {isRejected && sub.rejection_reason && (
                          <div className="p-2.5 bg-navy-900 text-white rounded-tile text-xs font-body">
                            Reason: {sub.rejection_reason}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <a
                            href={sub.instagram_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-fog rounded-full text-xs font-body font-medium text-navy hover:bg-teal-50 hover:text-teal-700 transition-colors"
                          >
                            Open Instagram URL <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {sub.proof_url && (
                            <button
                              type="button"
                              onClick={() => setPreviewImageUrl(sub.proof_url || null)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-fog rounded-full text-xs font-body font-medium text-navy hover:bg-teal-50 hover:text-teal-700 transition-colors"
                            >
                              View proof screenshot <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Admin Action Buttons */}
                      <div className="flex sm:flex-col md:flex-row items-center gap-2 flex-shrink-0">
                        {isPending ? (
                          <>
                            <Button
                              onClick={() => handleApprove(sub)}
                              variant="primary"
                              size="md"
                              icon={<Check className="w-4 h-4 stroke-[2.5]" />}
                            >
                              Approve (+{sub.points_assigned} pts)
                            </Button>
                            <Button
                              onClick={() => setRejectingSub(sub)}
                              variant="danger"
                              size="md"
                              icon={<X className="w-4 h-4" />}
                            >
                              Reject
                            </Button>
                          </>
                        ) : isApproved ? (
                          <div className="text-right text-xs font-body font-medium text-teal-700">
                            Points credited to ledger ✓
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(sub)}
                            className="text-xs font-body text-teal-700 hover:underline"
                          >
                            Re-approve submission
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Manage Members */}
        {activeTab === "members" && (
          <div className="bg-white rounded-card shadow-soft border border-fog p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-fog">
              <h3 className="font-heading font-bold text-lg text-navy">
                Registered community members
              </h3>
              <StatusPill status="value">1 active member</StatusPill>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body text-sm">
                <thead>
                  <tr className="border-b border-fog text-xs font-heading font-bold text-navy-muted">
                    <th className="py-2.5 px-3">Member</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Balance</th>
                    <th className="py-2.5 px-3">Reward value</th>
                    <th className="py-2.5 px-3">Approved</th>
                    <th className="py-2.5 px-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fog">
                  <tr>
                    <td className="py-3 px-3">
                      <div>
                        <strong className="block text-navy">Aarav Sharma</strong>
                        <span className="text-xs text-navy-muted">aarav@walkshark.in</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-navy-muted">+91 98765 43210</td>
                    <td className="py-3 px-3 font-heading font-bold text-teal-600">
                      170 pts
                    </td>
                    <td className="py-3 px-3 font-heading font-bold text-navy">
                      ₹425
                    </td>
                    <td className="py-3 px-3 text-xs text-navy">4 approved</td>
                    <td className="py-3 px-3">
                      <StatusPill status="teal">Member</StatusPill>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Redemptions Queue */}
        {activeTab === "redemptions" && (
          <div className="bg-white rounded-card shadow-soft border border-fog p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-fog">
              <h3 className="font-heading font-bold text-lg text-navy">
                Redemption requests queue
              </h3>
              <Button
                onClick={() => handleExportCSV("redemptions")}
                variant="secondary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Export CSV
              </Button>
            </div>

            {redemptions.length === 0 ? (
              <div className="text-center py-8 text-navy-muted font-body text-sm">
                No member redemption requests pending.
              </div>
            ) : (
              <div className="space-y-3">
                {redemptions.map((red) => (
                  <div
                    key={red.id}
                    className="p-4 bg-fog-light rounded-tile border border-fog flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-lg text-navy">
                          ₹{red.amount_inr}
                        </span>
                        <span className="text-xs text-navy-muted">
                          ({red.points_redeemed} pts)
                        </span>
                        <StatusPill status={red.status as any} />
                      </div>
                      <p className="text-xs font-body text-navy mt-1">
                        Member: <strong>{red.user_name || "Aarav Sharma"}</strong> • UPI/Account: <strong>{red.payment_details}</strong>
                      </p>
                      {red.notes && (
                        <p className="text-xs text-navy-muted italic mt-0.5">"{red.notes}"</p>
                      )}
                    </div>

                    <div>
                      {red.status === "pending" && (
                        <Button
                          onClick={() => fulfillRedemption(red.id)}
                          variant="primary"
                          size="sm"
                          icon={<Check className="w-4 h-4" />}
                        >
                          Mark fulfilled
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Platform Config & Points Values */}
        {activeTab === "settings" && (
          <form onSubmit={handleSavePlatformSettings} className="space-y-6">
            <Card className="p-6 sm:p-8 bg-white space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-fog">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Points system configuration
                  </h3>
                  <p className="text-xs font-body text-navy-muted">
                    Edit point reward values for all 6 community activities. 100 points = ₹250.
                  </p>
                </div>
                {settingsSaved && (
                  <StatusPill status="approved">Saved!</StatusPill>
                )}
              </div>

              {/* Point Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activityTypes.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 bg-fog rounded-tile"
                  >
                    <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                      {act.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={localPoints[act.id] ?? act.points}
                        onChange={(e) =>
                          setLocalPoints((prev) => ({
                            ...prev,
                            [act.id]: Number(e.target.value),
                          }))
                        }
                        className="w-24 px-3 py-1.5 bg-white rounded-button border border-fog font-heading font-bold text-sm text-navy"
                      />
                      <span className="font-body text-xs text-teal-700 font-medium">
                        pts (₹{((localPoints[act.id] ?? act.points) * 2.5).toFixed(0)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Redemption Policy Text */}
              <div className="pt-4 border-t border-fog">
                <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                  Active redemption policy message
                </label>
                <textarea
                  rows={3}
                  value={localSettings.redemption_policy}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({
                      ...prev,
                      redemption_policy: e.target.value,
                    }))
                  }
                  className="w-full rounded-input border border-fog bg-white px-4 py-2.5 text-sm font-body text-navy focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                />
              </div>

              {/* Earning Cap & Validity Config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-fog">
                <div className="p-4 bg-fog rounded-tile space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-navy">
                      Monthly earning limit
                    </span>
                    <input
                      type="checkbox"
                      checked={localSettings.monthly_cap_enabled}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          monthly_cap_enabled: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded text-teal-500 accent-teal-500"
                    />
                  </div>
                  <p className="text-[11px] font-body text-navy-muted">
                    Caps maximum points a single member can earn per month. (Default: Off)
                  </p>
                  {localSettings.monthly_cap_enabled && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={localSettings.monthly_cap_points}
                        onChange={(e) =>
                          setLocalSettings((prev) => ({
                            ...prev,
                            monthly_cap_points: Number(e.target.value),
                          }))
                        }
                        className="w-24 px-3 py-1 bg-white border border-fog rounded-button font-heading font-bold text-sm text-navy"
                      />
                      <span className="text-xs font-body text-navy-muted">
                        pts / month max
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-fog rounded-tile space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-navy">
                      Points validity period
                    </span>
                    <input
                      type="checkbox"
                      checked={localSettings.points_validity_enabled}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          points_validity_enabled: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded text-teal-500 accent-teal-500"
                    />
                  </div>
                  <p className="text-[11px] font-body text-navy-muted">
                    Points expire after set number of days from issuance. (Default: Off)
                  </p>
                  {localSettings.points_validity_enabled && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={localSettings.points_validity_days}
                        onChange={(e) =>
                          setLocalSettings((prev) => ({
                            ...prev,
                            points_validity_days: Number(e.target.value),
                          }))
                        }
                        className="w-24 px-3 py-1 bg-white border border-fog rounded-button font-heading font-bold text-sm text-navy"
                      />
                      <span className="text-xs font-body text-navy-muted">
                        days expiration
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Save className="w-4 h-4" />}
              >
                Save platform settings
              </Button>
            </Card>
          </form>
        )}

        {/* Rejection Modal Sheet */}
        <BottomSheetModal
          isOpen={Boolean(rejectingSub)}
          onClose={() => setRejectingSub(null)}
          title="Reject submission"
        >
          {rejectingSub && (
            <div className="space-y-4">
              <p className="text-xs font-body text-navy-muted">
                Rejecting content for member <strong>{rejectingSub.user_name || "Aarav"}</strong>.
              </p>

              <div>
                <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                  Primary community rule violation
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full soft-input text-xs font-medium"
                >
                  <option value="Misleading or unverified original content (Rule #1)">
                    Misleading or copied content (Rule #1)
                  </option>
                  <option value="Offensive, unsafe or inappropriate content (Rule #5)">
                    Offensive, unsafe or inappropriate content (Rule #5)
                  </option>
                  <option value="Product not visible or clearly identifiable (Rule #3)">
                    Product not visible or identifiable (Rule #3)
                  </option>
                  <option value="Artificial or fake engagement detected (Rule #6)">
                    Artificial engagement / bot activity (Rule #6)
                  </option>
                  <option value="Irrelevant or unrelated to WalkShark">
                    Irrelevant or unrelated to WalkShark
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-heading font-bold text-xs text-navy mb-1.5">
                  Additional note (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Footwear in video was from another brand"
                  value={customRejectNote}
                  onChange={(e) => setCustomRejectNote(e.target.value)}
                  className="w-full rounded-input border border-fog bg-white px-3 py-2 text-xs font-body text-navy resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  onClick={handleConfirmReject}
                  variant="danger"
                  fullWidth
                  size="md"
                >
                  Confirm rejection
                </Button>
                <Button
                  onClick={() => setRejectingSub(null)}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </BottomSheetModal>

        {/* Proof Preview Sheet */}
        <BottomSheetModal
          isOpen={Boolean(previewImageUrl)}
          onClose={() => setPreviewImageUrl(null)}
          title="Submission proof screenshot"
        >
          {previewImageUrl && (
            <div className="space-y-4">
              <div className="max-h-[60vh] overflow-auto rounded-card border border-fog bg-fog flex items-center justify-center p-2">
                <img
                  src={previewImageUrl}
                  alt="Proof screenshot"
                  className="max-h-[55vh] w-auto object-contain rounded-tile"
                />
              </div>
              <Button
                onClick={() => setPreviewImageUrl(null)}
                variant="secondary"
                fullWidth
                size="sm"
              >
                Close preview
              </Button>
            </div>
          )}
        </BottomSheetModal>
      </div>
    </AppShell>
  );
}
