"use client"

import { useEffect, useState } from "react"
import { Pet } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { PetForm } from "./PetForm"

export default function PetSettings() {
  const [pets, setPets] = useState<Pet[]>([])
  const [editingPet, setEditingPet] = useState<Pet | null>(null)

  const fetchPets = async () => {
    const res = await fetch("/api/pet")
    if (!res.ok) {
      toast.error("Erro ao buscar pets")
      return
    }
    const data = await res.json()
    setPets(data)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/pet/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      toast.success("Pet excluído com sucesso!")
      fetchPets()
    } else {
      toast.error("Erro ao excluir pet.")
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Meus Pets</h2>
        {!editingPet && (
          <Button onClick={() => setEditingPet({} as Pet)}>+ Adicionar Pet</Button>
        )}
      </div>

      {editingPet ? (
        <PetForm
          pet={Object.keys(editingPet).length > 0 ? editingPet : null}
          onBack={() => setEditingPet(null)}
          onSaved={() => {
            setEditingPet(null)
            fetchPets()
          }}
        />
      ) : (
        <div className="grid gap-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="flex items-center justify-between border p-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    pet.avatar ||
                    (pet.especie === "cachorro"
                      ? "/avatar-dog.svg"
                      : "/avatar-cat.svg")
                  }
                  alt={pet.nome}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold">{pet.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingPet(pet)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(pet.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
