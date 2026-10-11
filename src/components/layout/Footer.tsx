import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-fog pt-12 pb-24 md:pb-12 text-navy select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-button bg-teal-50 border border-teal-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/mascot/front.png"
                  alt="Mr. Finn Mascot"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-navy">
                WalkShark Community Rewards
              </span>
            </div>
            <p className="text-sm font-body text-navy-muted max-w-md leading-relaxed">
              Step into the movement. WalkShark rewards passionate members for sharing their genuine walking moments, travel adventures, and family stories. 100 points = ₹250.
            </p>
            <div className="inline-block px-3 py-1 bg-fog rounded-full text-xs font-body text-navy font-medium">
              Mr. Finn approved • Made for the walk fam 🦈
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-heading font-bold text-sm text-navy mb-3">
              Community
            </h5>
            <ul className="space-y-2 text-sm font-body text-navy-muted">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-teal-600 transition-colors">
                  Community rules
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-teal-600 transition-colors">
                  Member dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/milestones" className="hover:text-teal-600 transition-colors">
                  Milestones ladder
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h5 className="font-heading font-bold text-sm text-navy mb-3">
              Guidelines
            </h5>
            <ul className="space-y-2 text-sm font-body text-navy-muted">
              <li>
                <Link href="/rules#original-content" className="hover:text-teal-600 transition-colors">
                  Original content policy
                </Link>
              </li>
              <li>
                <Link href="/rules#anti-fraud" className="hover:text-teal-600 transition-colors">
                  Anti-fraud & verification
                </Link>
              </li>
              <li>
                <Link href="/dashboard/redeem" className="hover:text-teal-600 transition-colors">
                  Redemption policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-600 transition-colors font-medium text-teal-700">
                  Admin portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-fog flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-navy-muted">
          <p>© {new Date().getFullYear()} WalkShark Rewards. All rights reserved.</p>
          <p>Powered by WalkShark Brand HQ</p>
        </div>
      </div>
    </footer>
  );
};
