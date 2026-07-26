import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Nav } from "@/components/nav";
import { Providers } from "@/app/providers";
import "./globals.css";

const sansFont = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const headingFont = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kids Learn English — Bé Học Tiếng Anh",
  description:
    "A playful alphabet, vocabulary, and Q&A practice app to help young children learn English.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${sansFont.variable} ${headingFont.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Nav />
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
