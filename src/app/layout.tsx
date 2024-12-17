import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Next E-Commerce",
  description: "Criando um E-Commerce com nextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="bg-slate-700 h-screen p-16">
          {children}
        </main>
        
      </body>
    </html>
  );
}
