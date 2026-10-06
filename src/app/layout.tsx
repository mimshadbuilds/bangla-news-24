import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Marquee from "@/components/homepage/Marquee";
import ToastProvider from "./ToastProvider";

const notoserifbengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
});


export const metadata: Metadata = {
  title: "Bangla News 24 | The Latest Bangla News Portal",
  description: "The latest Bangla news and updates in one place",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en" data-theme="light"
      className={`${notoserifbengali.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider>
        <Header />
        <Marquee />
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
        </ToastProvider>
        </body>
    </html>
  );
}
