"use client";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black">
      <h1 className="text-xl font-bold text-white">MyPetHealth</h1>

      <Button variant="inverted">Entrar</Button>
    </header>
  );
}
