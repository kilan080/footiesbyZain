import type { Metadata } from "next";
import { Vollkorn } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeRegistry from "./components/themeRegistry";
import EmotionProvider from "./emotionProvider";
import { CartProvider } from "../cartContext/cartContext";
import CartDrawer from "./components/cartDrawer/cartDrawer";
import { Toaster } from "react-hot-toast";

<link
  rel="preload"
  href="/_next/static/media/4d4a6e07c26aa039-s.61d571ff.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>;
const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-vollkorn",
});

export const metadata: Metadata = {
  title: {
    default: "FOOTIES BY ZAIN",
    template: "%s | Footies by Zain",
  },

  description:
    "Shop Premium handmade footwear for every step you take, Fast delivery across Nigeria.",
  icons: {
    icon: "/favicon-v2.ico",
  },
  keywords: [
    "footwear",
    "shoes",
    "slides",
    "ilorin",
    "Nigeria",
    "Footies by Zain",
  ],
  metadataBase: new URL("https://footiesbyzain.vercel.app"),
  openGraph: {
    title: "Footies by Zain | Premium handmade Footwear",
    description: "Shop premium footwear — slides, shoes",
    url: "https://footiesbyzain.vercel.app",
    siteName: "Footies by Zain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Footies by Zain | Premium Footwear",
    description: "Shop premium footwear — slides and shoes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vollkorn.variable} antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              fontFamily: "inherit",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#f0fdf4",
                color: "#166534",
                border: "1px solid #bbf7d0",
              },
              iconTheme: { primary: "#22c55e", secondary: "#fff" },
            },
            error: {
              style: {
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
              },
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
        <CartProvider>
          <ThemeRegistry>
            <EmotionProvider>
              <Providers>{children}</Providers>
              <CartDrawer />
            </EmotionProvider>
          </ThemeRegistry>
        </CartProvider>
      </body>
    </html>
  );
}
