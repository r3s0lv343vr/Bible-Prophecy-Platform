import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Orbitron, Share_Tech_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { ProgressProvider } from "@/components/ProgressProvider";
import { PRODUCT_LINE, TAGLINE } from "@/lib/nav";
import "./globals.css";

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const body = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: PRODUCT_LINE,
    template: `%s · ${PRODUCT_LINE}`,
  },
  description: TAGLINE,
  applicationName: PRODUCT_LINE,
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#03040c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
