import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-var",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Outrun — Run The City",
  description: "Discover run clubs, join events, and track every kilometre. Outrun is where your city runs.",
  openGraph: {
    title: "Outrun — Run The City",
    description: "Discover run clubs, join events, and track every kilometre.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
