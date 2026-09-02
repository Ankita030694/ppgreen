import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import WhatsAppWidget from "./components/whatsapp-widget";
import ScrollRevealProvider from "./components/ScrollRevealProvider";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PP Green City 2 | Luxury Real Estate Sonipat",
  description: "Discover luxury living at PP Green City 2, Sonipat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${onest.className} min-h-full flex flex-col`}>
        <ScrollRevealProvider />
        <Navbar />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}