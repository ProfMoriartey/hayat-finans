import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "~/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Hayat Finans",
  description: "Hayat Finans - Your Financial Partner",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(geist.variable, "font-sans", inter.variable)}>
      <body className="flex min-h-full flex-col bg-gray-50">
        <ClerkProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
