"use client"

import { useState } from "react"
import { Pet } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

interface PetFormProps {
  pet: Pet | null
  onBack: () => void
  onSaved: () => void
}

export function PetForm({ pet, onBack, onSaved }: PetFormProps) {
  const [form, setForm] = useState({
    nome: pet?.nome || "",
    especie: pet?.especie || "",
    raca: pet?.raca || "",
    sexo: pet?.sexo || "",
    nascimento: pet?.nascimento?.toString().split("T")[0] || "",
    peso: pet?.peso?.toString() || "",
    avatar: pet?.avatar || "",
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const method = pet ? "PATCH" : "POST"
    const url = pet ? `/api/pet/${pet.id}` : "/api/pet"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success("Pet salvo com sucesso!")
      onSaved()
    } else {
      toast.error("Erro ao salvar pet")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nome</Label>
          <Input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div>
          <Label>Espécie</Label>
          <Select
            value={form.especie}
            onValueChange={(value) => setForm({ ...form, especie: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cachorro">Cachorro</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Raça</Label>
          <Input
            value={form.raca}
            onChange={(e) => setForm({ ...form, raca: e.target.value })}
          />
        </div>

        <div>
          <Label>Sexo</Label>
          <RadioGroup
            value={form.sexo}
            onValueChange={(value) => setForm({ ...form, sexo: value })}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="M" id="masc" />
              <Label htmlFor="masc">Masculino</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="F" id="fem" />
              <Label htmlFor="fem">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Data de nascimento</Label>
          <Input
            type="date"
            value={form.nascimento}
            onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
          />
        </div>
        <div>
          <Label>Peso (kg)</Label>
          <Input
            type="number"
            value={form.peso}
            onChange={(e) => setForm({ ...form, peso: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Avatar</Label>
        {!form.avatar ? (
          <UploadDropzone
            className="w-40 h-40"
            endpoint="avatar"
            onClientUploadComplete={(res) => {
              if (res && res[0]?.url) {
                setForm((prev) => ({ ...prev, avatar: res[0].url }))
              }
            }}
            onUploadError={(error) => {
              console.error("Erro ao enviar imagem:", error)
              toast.error("Erro no upload da imagem")
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={form.avatar}
              alt="Avatar do pet"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm((prev) => ({ ...prev, avatar: "" }))}
            >
              Remover imagem
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} type="button">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
