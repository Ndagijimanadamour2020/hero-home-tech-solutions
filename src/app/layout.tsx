import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Hero Home Tech Solutions | Enterprise Software & AI Partner",
  description: "Transforming businesses across East Africa and globally with custom software, web applications, AI automation, and digital transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
