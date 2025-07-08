import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";

export const metadata: Metadata = {
  title: "home.",
  description: "oceanflo ro packaged water maufacturing company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
