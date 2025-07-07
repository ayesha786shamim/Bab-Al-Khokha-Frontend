import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Bab Al Khokha - Your Shopping Destination",
  description: "Discover amazing products at great prices. Quality guaranteed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
