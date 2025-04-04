import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return new NextResponse("Unauthorized", { status: 401 })

  const body = await req.json()

  const pet = await prisma.pet.update({
    where: {
      id: params.id,
      dono: { clerkId: userId },
    },
    data: {
      nome: body.nome,
      especie: body.especie,
      raca: body.raca,
      sexo: body.sexo,
      nascimento: body.nascimento ? new Date(body.nascimento) : null,
      peso: body.peso ? parseFloat(body.peso) : null,
      avatar: body.avatar || "",
    },
  })

  return NextResponse.json(pet)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return new NextResponse("Unauthorized", { status: 401 })

  // Verifica se o pet realmente pertence ao usuário
  const pet = await prisma.pet.findUnique({
    where: { id: params.id },
    include: { dono: true },
  })

  if (!pet || pet.dono.clerkId !== userId) {
    return new NextResponse("Pet não encontrado ou acesso negado", { status: 404 })
  }

  await prisma.pet.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: "Pet excluído com sucesso" })
}
