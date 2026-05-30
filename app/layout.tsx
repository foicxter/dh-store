import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DH Store",
  description: "Premium Apps & Digital Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}