export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LayoutShell from "@/components/LayoutShell";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta: Metadata = {
    title: "Hero Home Tech Solutions | Enterprise Software & AI Partner",
    description:
      "Transforming businesses across East Africa and globally with custom software, web applications, AI automation, and digital transformation.",
  };

  try {
    // Timeout query after 3 seconds if DB is sleeping during build time
    const configPromise = prisma.siteConfig.findFirst();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database timeout")), 3000)
    );

    const config = (await Promise.race([configPromise, timeoutPromise])) as any;

    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      icons: {
        icon: config?.logoUrl || "/favicon.ico",
        shortcut: config?.logoUrl || "/favicon.ico",
        apple: config?.logoUrl || "/apple-touch-icon.png",
      },
    };
  } catch {
    return defaultMeta;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <LayoutShell>{children}</LayoutShell>
        <AnalyticsTracker />
      </body>
    </html>
  );
}