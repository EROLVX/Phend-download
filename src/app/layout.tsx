import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Phend | Beta Download Portal",
  description:
    "Download, install, and update Phend, the AI-powered phishing detection extension that runs entirely on-device.",
  openGraph: {
    title: "Phend | Beta Download Portal",
    description:
      "Download, install, and update Phend, the AI-powered phishing detection extension that runs entirely on-device.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phend | Beta Download Portal",
    description:
      "Download, install, and update Phend, the AI-powered phishing detection extension that runs entirely on-device.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-white">
        {children}
      </body>
    </html>
  );
}
