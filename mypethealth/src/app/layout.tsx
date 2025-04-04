import { Navbar } from "../components/layout/Navbar";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner';

export const metadata = {
  title: "MyPetHealth",
  description: "Gerencie a saúde do seu pet com facilidade.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body suppressHydrationWarning className="bg-black text-white min-h-screen">
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}