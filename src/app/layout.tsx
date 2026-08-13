import type { Metadata } from "next";
import { Bagel_Fat_One, Baloo_2, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Bagel_Fat_One({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const heading = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bip Bopping Bloggin",
  description:
    "the internet diary of a 22 (almost 23) year old with 12 work tabs open, a fantasy-novel-induced romance complex, and way too many feelings about iced lattes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
