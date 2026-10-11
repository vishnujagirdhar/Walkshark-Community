import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WalkShark Community Rewards | Walk. Share. Explore. Earn.",
  description:
    "Official WalkShark member rewards community. Share your WalkShark moments, earn reward points, and unlock exclusive community rewards. 100 points = ₹250.",
  icons: {
    icon: "/mascot/front.png",
    apple: "/mascot/front.png",
  },
  openGraph: {
    title: "WalkShark Community Rewards",
    description: "Walk. Share. Explore. Earn with Mr. Finn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolageGrotesque.variable}>
      <body className="min-h-screen bg-canvas text-navy antialiased selection:bg-teal-100 selection:text-navy font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
