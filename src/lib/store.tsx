"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  Profile,
  ActivityType,
  Submission,
  PointsLedgerEntry,
  Milestone,
  Redemption,
  PlatformSettings,
} from "@/types/database";

const INITIAL_ACTIVITY_TYPES: ActivityType[] = [
  {
    id: "act-story",
    slug: "story",
    name: "Instagram Story",
    points: 20,
    reward_inr: 50,
    description: "Approved WalkShark-related story tagging @walkshark.",
    icon: "Camera",
    is_active: true,
  },
  {
    id: "act-reel",
    slug: "reel",
    name: "Instagram Reel",
    points: 30,
    reward_inr: 75,
    description: "Public, original reel clearly showcasing the WalkShark product.",
    icon: "Film",
    is_active: true,
  },
  {
    id: "act-post",
    slug: "post",
    name: "Instagram Post",
    points: 30,
    reward_inr: 75,
    description: "Original high-quality feed post featuring WalkShark footwear/gear.",
    icon: "Image",
    is_active: true,
  },
  {
    id: "act-travel",
    slug: "travel",
    name: "Travel + WalkShark Product",
    points: 50,
    reward_inr: 125,
    description: "Travel or outdoor location content featuring the product in action.",
    icon: "Compass",
    is_active: true,
  },
  {
    id: "act-family",
    slug: "family",
    name: "Family Using WalkShark on a Walk",
    points: 80,
    reward_inr: 200,
    description: "Genuine family walking moment, product visibly in use.",
    icon: "Users",
    is_active: true,
  },
  {
    id: "act-birthday",
    slug: "birthday",
    name: "Birthday Wish",
    points: 10,
    reward_inr: 25,
    description: "Approved birthday or community shoutout celebration activity.",
    icon: "Gift",
    is_active: true,
  },
];

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: "ms-100",
    points_threshold: 100,
    reward_inr: 250,
    title: "100 Points Milestone",
    celebration_message: "You unlocked your first ₹250 reward!",
    sort_order: 1,
  },
  {
    id: "ms-250",
    points_threshold: 250,
    reward_inr: 625,
    title: "250 Points Milestone",
    celebration_message: "You're building serious WalkShark community value!",
    sort_order: 2,
  },
  {
    id: "ms-500",
    points_threshold: 500,
    reward_inr: 1250,
    title: "500 Points Milestone",
    celebration_message: "Halfway to 1,000 points!",
    sort_order: 3,
  },
  {
    id: "ms-1000",
    points_threshold: 1000,
    reward_inr: 2500,
    title: "1,000 Points Milestone",
    celebration_message: "WalkShark Community Champion milestone!",
    sort_order: 4,
  },
];

const INITIAL_SETTINGS: PlatformSettings = {
  points_conversion_rate: 2.5,
  redemption_policy:
    "Points represent community reward value. Redemptions require a minimum of 100 points (₹250). Approved redemptions are processed via UPI / Store voucher within 48-72 business hours upon admin fulfillment.",
  monthly_cap_enabled: false,
  monthly_cap_points: 500,
  points_validity_enabled: false,
  points_validity_days: 365,
  min_redemption_points: 100,
};

const DEMO_MEMBER: Profile = {
  id: "user-aarav-123",
  full_name: "Aarav Sharma",
  email: "aarav@walkshark.in",
  phone: "+91 98765 43210",
  role: "member",
  avatar_url: "/mascot/front.png",
  created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
};

const DEMO_ADMIN: Profile = {
  id: "admin-finn-001",
  full_name: "WalkShark HQ Admin",
  email: "admin@walkshark.in",
  phone: "+91 98111 22334",
  role: "admin",
  avatar_url: "/mascot/front.png",
  created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
};

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-001",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-family",
    activity_name: "Family Using WalkShark on a Walk",
    points_assigned: 80,
    reward_inr: 200,
    instagram_url: "https://www.instagram.com/p/DB1familywalkshark",
    caption: "Morning walk with the entire family in our WalkShark sneakers!",
    status: "approved",
    reviewed_by: "admin-finn-001",
    reviewed_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-002",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-travel",
    activity_name: "Travel + WalkShark Product",
    points_assigned: 50,
    reward_inr: 125,
    instagram_url: "https://www.instagram.com/p/DB2travelwalkshark",
    caption: "Trekking through Himachal with durable WalkShark grip.",
    status: "approved",
    reviewed_by: "admin-finn-001",
    reviewed_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-003",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-reel",
    activity_name: "Instagram Reel",
    points_assigned: 30,
    reward_inr: 75,
    instagram_url: "https://www.instagram.com/reel/DB3reelwalkshark",
    caption: "30-sec unboxing and aesthetic fit check with Mr. Finn gear.",
    status: "approved",
    reviewed_by: "admin-finn-001",
    reviewed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-004",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-birthday",
    activity_name: "Birthday Wish",
    points_assigned: 10,
    reward_inr: 25,
    instagram_url: "https://www.instagram.com/p/DB4birthdaywalkshark",
    caption: "Happy Birthday WalkShark Community! Stride on fam 🦈",
    status: "approved",
    reviewed_by: "admin-finn-001",
    reviewed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-005",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-story",
    activity_name: "Instagram Story",
    points_assigned: 20,
    reward_inr: 50,
    instagram_url: "https://www.instagram.com/stories/aaravwalks/3321456",
    caption: "Tagged @walkshark in my gym story today!",
    status: "pending",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-006",
    user_id: "user-aarav-123",
    user_name: "Aarav Sharma",
    user_email: "aarav@walkshark.in",
    activity_type_id: "act-post",
    activity_name: "Instagram Post",
    points_assigned: 30,
    reward_inr: 75,
    instagram_url: "https://www.instagram.com/p/DBoldpostfake",
    caption: "Reposted someone else's photo",
    status: "rejected",
    rejection_reason: "Misleading or copied content (Rule #1 violated).",
    reviewed_by: "admin-finn-001",
    reviewed_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const INITIAL_LEDGER: PointsLedgerEntry[] = [
  {
    id: "led-001",
    user_id: "user-aarav-123",
    submission_id: "sub-001",
    points: 80,
    reward_inr: 200,
    type: "earned",
    description: "Approved Family Using WalkShark on a Walk",
    status: "approved",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "led-002",
    user_id: "user-aarav-123",
    submission_id: "sub-002",
    points: 50,
    reward_inr: 125,
    type: "earned",
    description: "Approved Travel + WalkShark Product",
    status: "approved",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "led-003",
    user_id: "user-aarav-123",
    submission_id: "sub-003",
    points: 30,
    reward_inr: 75,
    type: "earned",
    description: "Approved Instagram Reel",
    status: "approved",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "led-004",
    user_id: "user-aarav-123",
    submission_id: "sub-004",
    points: 10,
    reward_inr: 25,
    type: "earned",
    description: "Approved Birthday Wish",
    status: "approved",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface UserMetrics {
  currentPoints: number;
  rewardValue: number;
  lifetimePoints: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  nextMilestone: Milestone;
  progressToNextMilestone: number;
  contentBreakdown: {
    stories: number;
    reels: number;
    posts: number;
    travel: number;
    family: number;
    birthday: number;
  };
}

interface AppContextType {
  currentUser: Profile | null;
  activityTypes: ActivityType[];
  milestones: Milestone[];
  submissions: Submission[];
  pointsLedger: PointsLedgerEntry[];
  redemptions: Redemption[];
  settings: PlatformSettings;
  userMetrics: UserMetrics;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUserRole: (role: "member" | "admin") => void;
  submitActivity: (data: {
    activityTypeId: string;
    instagramUrl: string;
    proofUrl?: string;
    caption?: string;
  }) => { success: boolean; error?: string };
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string, reason: string) => void;
  requestRedemption: (points: number, paymentDetails: string, notes?: string) => { success: boolean; error?: string };
  fulfillRedemption: (redemptionId: string) => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  updateActivityPoints: (id: string, newPoints: number) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "walkshark_community_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(DEMO_MEMBER);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>(INITIAL_ACTIVITY_TYPES);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [pointsLedger, setPointsLedger] = useState<PointsLedgerEntry[]>(INITIAL_LEDGER);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>(INITIAL_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore state from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.activityTypes) setActivityTypes(parsed.activityTypes);
        if (parsed.submissions) setSubmissions(parsed.submissions);
        if (parsed.pointsLedger) setPointsLedger(parsed.pointsLedger);
        if (parsed.redemptions) setRedemptions(parsed.redemptions);
        if (parsed.settings) setSettings(parsed.settings);
      }
    } catch {
      // Ignore parse errors, use defaults
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentUser,
          activityTypes,
          submissions,
          pointsLedger,
          redemptions,
          settings,
        })
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [currentUser, activityTypes, submissions, pointsLedger, redemptions, settings, isInitialized]);

  // Compute balance and metrics from the append-only points ledger
  const userMetrics = useMemo<UserMetrics>(() => {
    const userId = currentUser?.id || "";
    const userLedger = pointsLedger.filter((entry) => entry.user_id === userId);

    const currentPoints = userLedger.reduce((sum, entry) => sum + entry.points, 0);
    const rewardValue = currentPoints * settings.points_conversion_rate;

    const lifetimePoints = userLedger
      .filter((entry) => entry.type === "earned" && entry.points > 0)
      .reduce((sum, entry) => sum + entry.points, 0);

    const userSubs = submissions.filter((s) => s.user_id === userId);
    const approvedCount = userSubs.filter((s) => s.status === "approved").length;
    const pendingCount = userSubs.filter((s) => s.status === "pending").length;
    const rejectedCount = userSubs.filter((s) => s.status === "rejected").length;

    // Next milestone
    const sortedMilestones = [...milestones].sort((a, b) => a.points_threshold - b.points_threshold);
    const nextMilestone =
      sortedMilestones.find((m) => m.points_threshold > currentPoints) ||
      sortedMilestones[sortedMilestones.length - 1];

    const progressToNextMilestone = nextMilestone
      ? Math.min(Math.round((currentPoints / nextMilestone.points_threshold) * 100), 100)
      : 100;

    // Content breakdown
    const breakdown = {
      stories: 0,
      reels: 0,
      posts: 0,
      travel: 0,
      family: 0,
      birthday: 0,
    };

    userSubs.forEach((s) => {
      const type = activityTypes.find((a) => a.id === s.activity_type_id)?.slug;
      if (type === "story") breakdown.stories++;
      if (type === "reel") breakdown.reels++;
      if (type === "post") breakdown.posts++;
      if (type === "travel") breakdown.travel++;
      if (type === "family") breakdown.family++;
      if (type === "birthday") breakdown.birthday++;
    });

    return {
      currentPoints: Math.max(currentPoints, 0),
      rewardValue: Math.max(rewardValue, 0),
      lifetimePoints,
      approvedCount,
      pendingCount,
      rejectedCount,
      nextMilestone,
      progressToNextMilestone,
      contentBreakdown: breakdown,
    };
  }, [currentUser, pointsLedger, submissions, milestones, activityTypes, settings]);

  const login = async (identifier: string, _pass: string) => {
    const trimmed = identifier.trim().toLowerCase();
    if (trimmed.includes("admin")) {
      setCurrentUser(DEMO_ADMIN);
      return { success: true };
    }
    // Member login
    const member = { ...DEMO_MEMBER, email: trimmed.includes("@") ? trimmed : DEMO_MEMBER.email };
    setCurrentUser(member);
    return { success: true };
  };

  const signup = async (fullName: string, email: string, phone: string, _pass: string) => {
    // Check duplicate
    const exists = submissions.some((s) => s.user_email?.toLowerCase() === email.trim().toLowerCase());
    if (exists && email.toLowerCase() === DEMO_ADMIN.email.toLowerCase()) {
      return { success: false, error: "An account already exists with this email." };
    }

    const newProfile: Profile = {
      id: `user-${Date.now()}`,
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: "member",
      avatar_url: "/mascot/front.png",
      created_at: new Date().toISOString(),
    };

    setCurrentUser(newProfile);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUserRole = (role: "member" | "admin") => {
    if (role === "admin") {
      setCurrentUser(DEMO_ADMIN);
    } else {
      setCurrentUser(DEMO_MEMBER);
    }
  };

  const submitActivity = ({
    activityTypeId,
    instagramUrl,
    proofUrl,
    caption,
  }: {
    activityTypeId: string;
    instagramUrl: string;
    proofUrl?: string;
    caption?: string;
  }) => {
    if (!currentUser) return { success: false, error: "You must be signed in to submit." };

    const cleanUrl = instagramUrl.trim().toLowerCase();

    // Check duplicate link ("one submission, one reward")
    const isDuplicate = submissions.some(
      (s) => s.instagram_url.trim().toLowerCase() === cleanUrl
    );
    if (isDuplicate) {
      return {
        success: false,
        error: "This Instagram link has already been submitted! WalkShark enforces 'one submission, one reward'.",
      };
    }

    const actType = activityTypes.find((a) => a.id === activityTypeId);
    if (!actType) return { success: false, error: "Invalid activity selected." };

    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_email: currentUser.email,
      activity_type_id: actType.id,
      activity_name: actType.name,
      points_assigned: actType.points,
      reward_inr: actType.points * settings.points_conversion_rate,
      instagram_url: instagramUrl.trim(),
      proof_url: proofUrl,
      caption: caption?.trim(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    return { success: true };
  };

  const approveSubmission = (submissionId: string) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub || sub.status === "approved") return;

    // 1. Mark submission approved
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              status: "approved",
              reviewed_by: currentUser?.id,
              reviewed_at: new Date().toISOString(),
            }
          : s
      )
    );

    // 2. Append to points ledger (POINTS ARE CREDITED ONLY AFTER ADMIN APPROVAL)
    const newEntry: PointsLedgerEntry = {
      id: `led-${Date.now()}`,
      user_id: sub.user_id,
      submission_id: sub.id,
      points: sub.points_assigned,
      reward_inr: sub.points_assigned * settings.points_conversion_rate,
      type: "earned",
      description: `Approved ${sub.activity_name || "Activity"}`,
      status: "approved",
      created_at: new Date().toISOString(),
    };

    setPointsLedger((prev) => [newEntry, ...prev]);
  };

  const rejectSubmission = (submissionId: string, reason: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              status: "rejected",
              rejection_reason: reason,
              reviewed_by: currentUser?.id,
              reviewed_at: new Date().toISOString(),
            }
          : s
      )
    );
  };

  const requestRedemption = (points: number, paymentDetails: string, notes?: string) => {
    if (!currentUser) return { success: false, error: "Must be signed in." };
    if (points < settings.min_redemption_points) {
      return {
        success: false,
        error: `Minimum redemption threshold is ${settings.min_redemption_points} points (₹${
          settings.min_redemption_points * settings.points_conversion_rate
        }).`,
      };
    }
    if (points > userMetrics.currentPoints) {
      return { success: false, error: "You cannot redeem more points than your current balance." };
    }

    const amountInr = points * settings.points_conversion_rate;

    // Append negative points entry to ledger
    const ledgerEntry: PointsLedgerEntry = {
      id: `led-${Date.now()}`,
      user_id: currentUser.id,
      points: -points,
      reward_inr: -amountInr,
      type: "redeemed",
      description: `Redemption Request (${points} pts for ₹${amountInr})`,
      created_at: new Date().toISOString(),
    };

    const newRedemption: Redemption = {
      id: `red-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_email: currentUser.email,
      points_redeemed: points,
      amount_inr: amountInr,
      status: "pending",
      payment_details: paymentDetails,
      notes: notes,
      created_at: new Date().toISOString(),
    };

    setPointsLedger((prev) => [ledgerEntry, ...prev]);
    setRedemptions((prev) => [newRedemption, ...prev]);

    return { success: true };
  };

  const fulfillRedemption = (redemptionId: string) => {
    setRedemptions((prev) =>
      prev.map((r) =>
        r.id === redemptionId
          ? { ...r, status: "fulfilled", updated_at: new Date().toISOString() }
          : r
      )
    );
  };

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateActivityPoints = (id: string, newPoints: number) => {
    setActivityTypes((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              points: newPoints,
              reward_inr: newPoints * settings.points_conversion_rate,
            }
          : a
      )
    );
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(DEMO_MEMBER);
    setActivityTypes(INITIAL_ACTIVITY_TYPES);
    setMilestones(INITIAL_MILESTONES);
    setSubmissions(INITIAL_SUBMISSIONS);
    setPointsLedger(INITIAL_LEDGER);
    setRedemptions([]);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activityTypes,
        milestones,
        submissions,
        pointsLedger,
        redemptions,
        settings,
        userMetrics,
        login,
        signup,
        logout,
        switchUserRole,
        submitActivity,
        approveSubmission,
        rejectSubmission,
        requestRedemption,
        fulfillRedemption,
        updateSettings,
        updateActivityPoints,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
};
