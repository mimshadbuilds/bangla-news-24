import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/shared/Header";
import Marquee from "@/components/homepage/Marquee";
import ToastProvider from "./ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-noto-serif-bengali",
});

const themeScript = `(function(){try{var stored=localStorage.getItem("theme");var dark=stored?stored==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",dark);document.documentElement.dataset.theme=dark?"dark":"light";}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Bangla News 24 | The Latest Bangla News Portal",
  description: "The latest Bangla news and updates in one place",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn" data-theme="light" suppressHydrationWarning
      className={`${inter.variable} ${notoSerifBengali.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans dark:bg-neutral-950 dark:text-neutral-100">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ToastProvider>
        <Header />
        <Suspense fallback={<div className="h-[41px] bg-red-700" aria-hidden="true" />}>
          <Marquee />
        </Suspense>
        <main className="max-w-7xl mx-auto w-full">
          {children}
        </main>
        </ToastProvider>
      </body>
    </html>
  );
}
