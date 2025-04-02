import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <img
        src="/dog.png"
        alt="Cachorro feliz"
        className="absolute bottom-0 right-0 h-[90%] max-h-full w-auto object-contain pointer-events-none select-none rotate-[5deg]"
      />

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
