"use client";

import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black">
      <h1 className="text-xl font-bold text-white">MyPetHealth</h1>

      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <Button variant="inverted">Entrar</Button>
        </SignInButton>
      )}
    </header>
  );
}
