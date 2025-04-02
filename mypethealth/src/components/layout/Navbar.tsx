"use client";

import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserConfigPopover } from "./user-config-popover";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black">
      <Link href={isSignedIn ? "/dashboard" : "/"}>
        <h1 className="text-xl font-bold text-white">MyPetHealth</h1>
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            className="text-white hover:text-white/80"
            onClick={() => console.log("Abrir modal de seleção de pet")}
          >
            Selecionar Pet
          </Button>

          <UserConfigPopover />

          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
          <SignInButton mode="modal">
            <Button variant="inverted">Entrar</Button>
          </SignInButton>
      )}
    </header>
  );
}
