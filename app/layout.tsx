import type { Metadata } from "next";
import { Geist, Geist_Mono,Raleway,Orbitron} from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-raleway",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-orbitron",
});



export const metadata: Metadata = {
  title: "Conduit",
  description: "Find right person for the job.",
};

export default async function RootLayout({ children,
}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${orbitron.variable} antialiased`}>
            {children}
      </body>
    </html>
  );
}
