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
        \
        <Script
          async={true}
          defer={true}
          src="https://lytics.njf.dev/script.js"
          data-website-id="06f2c901-2220-4ce4-b776-069e7135de6b"
        ></Script>
        <Providers>
          <main className="p-4 max-w-none">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
