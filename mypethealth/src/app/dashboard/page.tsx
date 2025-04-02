import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">Bem-vindo à sua Dashboard 🐾</h1>
    </main>
  );
}
