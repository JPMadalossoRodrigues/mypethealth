// components/settings/UserSettings.tsx
"use client"

import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { UserForm } from "./UserForm"

export function UserSettings() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const fetchUser = async () => {
    const res = await fetch("/api/user")
    if (!res.ok) {
      console.error("Erro ao buscar usuário")
      return
    }

    const data = await res.json()
    setUser(data)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (!user) return <p>Carregando dados do usuário...</p>

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Seus dados</h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-5 h-5" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <UserForm
          user={user}
          onCancel={() => setIsEditing(false)}
          onUpdated={() => {
            setIsEditing(false)
            fetchUser()
          }}
        />
      ) : (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Nome:</span> {user.nome}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span>{" "}
            {user.telefone || "-"}
          </p>
          <p>
            <span className="font-semibold">Notificação por E-mail:</span>{" "}
            {user.notificacaoEmail ? "Ativada" : "Desativada"}
          </p>
          <p>
            <span className="font-semibold">Notificação por SMS:</span>{" "}
            {user.notificacaoSMS ? "Ativada" : "Desativada"}
          </p>
        </div>
      )}
    </div>
  )
}
