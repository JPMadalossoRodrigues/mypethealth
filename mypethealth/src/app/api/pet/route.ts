import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const pets = await prisma.pet.findMany({
      where: { dono: { clerkId: userId } },
      orderBy: { nome: "asc" },
    });

    return NextResponse.json(pets);
  } catch (error) {
    console.error("Erro no GET /api/pet:", error);
    return new NextResponse("Erro interno no servidor", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    console.log("Data recebida:", body.nascimento, "Convertida:", new Date(body.nascimento));
    console.log("Peso recebido:", body.peso, "Convertido:", parseFloat(body.peso));

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) return new NextResponse("Usuário não encontrado", { status: 404 });

    const pet = await prisma.pet.create({
      data: {
        nome: body.nome,
        especie: body.especie,
        raca: body.raca,
        sexo: body.sexo,
        nascimento: body.nascimento ? new Date(body.nascimento) : null,
        peso: body.peso ? parseFloat(body.peso) : null,
        avatar: body.avatar || "",
        donoId: user.id,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.error("Erro no POST /api/pet:", error);
    return new NextResponse("Erro interno ao criar pet", { status: 500 });
  }
}
