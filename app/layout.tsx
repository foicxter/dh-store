import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  openGraph: {
  title: "DH Store",
  description:
    "Premium Apps & Digital Services",
  url: "https://dh-store.vercel.app",
  siteName: "DH Store",
  locale: "id_ID",
  type: "website",
},
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
