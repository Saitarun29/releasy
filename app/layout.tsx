import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Releasy — Write launch content that sounds like you, not like AI",
    template: "%s — Releasy",
  },
  description:
    "Turn your GitHub repository into launch content that sounds like you — changelogs, LinkedIn posts, X threads, emails, and more. No marketing fluff.",
  keywords: [
    "release notes generator",
    "AI marketing content",
    "GitHub release automation",
    "changelog generator",
    "product launch tool",
    "social media content generator",
    "developer marketing tools",
    "SaaS launch kit",
  ],
  authors: [{ name: "Releasy" }],
  creator: "Releasy",
  publisher: "Releasy",
  metadataBase: new URL("https://releasy.sh"),
  openGraph: {
    title: "Releasy — Write launch content that sounds like you, not like AI",
    description:
      "Write launch content that sounds like you — not like AI. Paste your GitHub repo and get 6 assets that read like you wrote them.",
    type: "website",
    siteName: "Releasy",
    locale: "en_US",
    url: "https://releasy.sh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Releasy — Write launch content that sounds like you, not like AI",
    description:
      "Write launch content that sounds like you — not like AI. Paste your GitHub repo and get 6 assets that read like you wrote them.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>

      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
