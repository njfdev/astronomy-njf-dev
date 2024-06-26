import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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
        <Providers>
          <main className="p-4 max-w-none">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
