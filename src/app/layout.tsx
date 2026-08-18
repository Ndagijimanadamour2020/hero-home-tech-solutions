export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LayoutShell from "@/components/LayoutShell";
import { BrandingProvider } from "@/components/BrandingProvider";
import { getBranding } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getBranding();
  const icon = branding.faviconUrl || branding.logoUrl || "/favicon.ico";

  return {
    title: `${branding.siteName}${branding.tagline ? ` | ${branding.tagline}` : ""}`,
    description:
      "Transforming businesses across East Africa and globally with custom software, web applications, AI automation, and digital transformation.",
    icons: {
      icon,
      shortcut: icon,
      apple: branding.logoUrl || "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branding = await getBranding();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <BrandingProvider initialBranding={branding}>
          <LayoutShell>{children}</LayoutShell>
        </BrandingProvider>
        <AnalyticsTracker />
      </body>
    </html>
  );
}
