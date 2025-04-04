'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function getUserPets() {
  const { userId } = await auth()
  if (!userId) return []

  return prisma.pet.findMany({
    where: { dono: { clerkId: userId } },
    orderBy: { nome: "asc" }
  })
}
