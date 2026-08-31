import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elsewhere",
  description: "Elsewhere cafe membership mockup",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${ibmPlexSansThai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[--color-canvas]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
