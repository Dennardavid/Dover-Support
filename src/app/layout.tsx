import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["900", "200", "100", "300", "400", "500", "600", "700", "800"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Help Desk",
  description: "Dover Engineering IT Help Desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray`}>
       <SessionProvider>{children}</SessionProvider>

        {/* This is the toast handler */}
        <Toaster  position="top-right" richColors />
      </body>
    </html>
  );
}
