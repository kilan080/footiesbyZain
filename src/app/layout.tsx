import type { Metadata } from "next";
import { Vollkorn } from 'next/font/google';
import "./globals.css";
import Providers from "./providers";
import ThemeRegistry from "./themeRegistry";
import EmotionProvider from "./emotionProvider";
import { CartProvider } from "../cartContext/cartContext";
import CartDrawer from "./components/cartDrawer/cartDrawer";

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-vollkorn',
});

export const metadata: Metadata = {
  title: "FOOTIES BY ZAIN",
  description: "Premium footwear for every step you take.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vollkorn.variable} antialiased`}>
        <CartProvider>
          <ThemeRegistry>
            <EmotionProvider>
              <Providers>
                {children}
              </Providers>

              <CartDrawer />

            </EmotionProvider>
          </ThemeRegistry>
        </CartProvider>
      </body>
    </html>
  );
}