import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
