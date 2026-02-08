import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Peddle'n Pebbles | Crystals, Gems & Earth Treasures",
  description: "Hand-selected crystals, geodes, polished stones, and minerals from our cozy hobbit-hole shop. Treasures from the earth, curated with love.",
  keywords: "crystals, gems, geodes, minerals, polished stones, healing crystals, rock shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="pt-20 relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
