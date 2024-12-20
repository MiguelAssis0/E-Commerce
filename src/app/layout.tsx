import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from '@clerk/localizations'
import Hydrate from "./components/Hydrate";

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
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={clsx(inter.className, "bg-slate-700")}>
          <Hydrate>
          <Navbar />
            <main className="h-screen p-16">
              {children}
            </main>
          </Hydrate> 
        </body>
      </html>
    </ClerkProvider>
  );
}
