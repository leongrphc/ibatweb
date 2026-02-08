import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { AnnouncementProvider } from "@/context/AnnouncementContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "İbat Ayakkabı - Premium Çocuk Ayakkabıları",
  description:
    "Çocuklarınızın her adımında konfor. Premium kalitede çocuk ayakkabıları, toptan ve perakende satış.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ProductProvider>
            <AnnouncementProvider>{children}</AnnouncementProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
