import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import clsx from "clsx";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Next E-Commerce",
  description: "Criando um E-Commerce com nextJS",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-slate-700")}>
        <Navbar />
        <main className="h-screen p-16">
          {children}
        </main>
        
      </body>
    </html>
  );
}
