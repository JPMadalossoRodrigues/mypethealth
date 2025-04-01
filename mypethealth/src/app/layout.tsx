import { Navbar } from "../components/layout/Navbar";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "MyPetHealth",
  description: "Gerencie a saúde do seu pet com facilidade.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}