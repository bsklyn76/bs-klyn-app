import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BS Klyn",
  description: "Nettoyage de vitre - Le Havre",
  applicationName: "BS Klyn",
  appleWebApp: {
    capable: true,
    title: "BS Klyn",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}