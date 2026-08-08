import type { Metadata } from "next";
import { Cinzel, Libre_Baskerville } from "next/font/google";
import "./globals.css";

import { AgeGate } from "@/components/AgeGate";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VIN ROUGE — Weinshop",
    template: "%s | VIN ROUGE",
  },
  description: "Wines from all over the world — Rotwein, Weißwein, Rosé und Sekt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${cinzel.variable} ${baskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
