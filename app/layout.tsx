import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
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
    <html lang="en" className={`${onest.variable} h-full antialiased`}>
      <body className={`${onest.className} min-h-full flex flex-col`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

