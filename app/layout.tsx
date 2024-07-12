import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NJF Astronomy",
  description: "The astronomy website of Nicholas Fasching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} prose dark:prose-invert max-w-none`}>
        <Script
          defer={true}
          src="https://umami.njf.dev/script.js"
          data-website-id="26321b22-2c40-4dd8-98b5-a56369df6a0b"
        ></Script>
        <Providers>
          <main className="p-4 max-w-none">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
