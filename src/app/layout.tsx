import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BannerKit — Inspirasi Banner & Poster AI untuk UMKM Indonesia",
    template: "%s | BannerKit",
  },
  description:
    "Platform Prompt Generator Desain AI untuk UMKM Indonesia. Temukan dan salin prompt AI siap pakai untuk ChatGPT Image, Midjourney, Flux, dan Stable Diffusion.",
  keywords: [
    "banner UMKM",
    "poster AI",
    "prompt generator",
    "desain UMKM",
    "chat gpt prompt",
    "AI banner Indonesia",
  ],
  icons: {
    icon: [{ url: "/fav.png", type: "image/png" }],
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "BannerKit — Inspirasi Banner AI untuk UMKM",
    description:
      "Temukan inspirasi banner & poster AI untuk bisnis UMKM Indonesia",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
