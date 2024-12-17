import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
