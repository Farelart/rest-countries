import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const josephinSans = localFont({
  src: "./fonts/JosefinSans-VariableFont_wght.ttf",
  variable: "--font-josefin-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Rest Countries App",
  description: "Inspired by Frontend Mentor's REST Countries API challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josephinSans.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}