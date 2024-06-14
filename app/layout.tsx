import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      
      <html lang="en">
        <body className={outfit.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
