import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    return new Response("Usuário não encontrado", { status: 404 });
  }

  return Response.json(dbUser);
}

export async function PATCH(req: Request) {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId: user.id },
      data: {
        nome: body.nome,
        telefone: body.telefone,
        notificacaoEmail: body.notificacaoEmail,
        notificacaoSMS: body.notificacaoSMS,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return new Response("Erro ao atualizar usuário", { status: 500 });
  }
}
