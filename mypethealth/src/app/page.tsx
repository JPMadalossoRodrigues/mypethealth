"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Dog fixo no canto inferior direito */}
      <img
        src="/dog.png"
        alt="Cachorro feliz"
        className="absolute bottom-0 right-0 h-[90%] max-h-full w-auto object-contain pointer-events-none select-none rotate-[5deg]"
      />

      {/* Conteúdo de texto à esquerda */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-20">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Gerencie a saúde do seu pet com facilidade
          </h1>
          <p className="text-lg text-white/80">
            Acompanhe vacinas e consultas, receba lembretes automáticos e mantenha seu pet saudável com praticidade.
          </p>
        </div>
      </div>
    </section>
  );
}
