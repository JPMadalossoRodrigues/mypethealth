"use client";

import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black">
      <Link href={isSignedIn ? "/dashboard" : "/"}>
        <h1 className="text-xl font-bold text-white">MyPetHealth</h1>
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-4">

          <Link href="/configuracoes">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>


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
