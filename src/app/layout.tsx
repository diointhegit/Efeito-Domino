import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { LandingPageNav } from "@/components/nav";
import Image from "next/image";
import Link from "next/link";

const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Efeito Domino",
  description: "Efeito Domino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-BR">
      <body className={inter.className}>
        <div className="overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
