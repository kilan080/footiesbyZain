import type { Metadata } from "next";
import { Vollkorn } from 'next/font/google';
import "./globals.css";
import Providers from "./providers";
import ThemeRegistry from "./themeRegistry";
import EmotionProvider from "./emotionProvider";
import { CartProvider } from "../cartContext/cartContext";
import CartDrawer from "./components/cartDrawer/cartDrawer";
import { Toaster } from "react-hot-toast";

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-vollkorn',
});

export const metadata: Metadata = {
  title: "FOOTIES BY ZAYN",
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
         <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              fontFamily: 'inherit',
              fontSize: '14px',
            },
            success: {
              style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
              iconTheme: { primary: '#22c55e', secondary: '#fff' },
            },
            error: {
              style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
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