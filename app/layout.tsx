/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Poppins, Source_Sans_3, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sommaire - AI-Powered PDF Summarization",
  description:
    "Save Hours Of reading time, Transform PDFs into Clear, accurate summaries in seconds with out advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-scroll-behavior="smooth">
        <body className={`${poppins.className}  antialiased   `}>
          <Header />
          {children}
          <Footer />
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
