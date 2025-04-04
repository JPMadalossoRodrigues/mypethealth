"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import type { User } from "@prisma/client"

export function UserForm({
  user,
  onCancel,
  onUpdated,
}: {
  user: User
  onCancel: () => void
  onUpdated: () => void
}) {
  const [form, setForm] = useState({
    nome: user.nome || "",
    telefone: user.telefone || "",
    notificacaoEmail: user.notificacaoEmail,
    notificacaoSMS: user.notificacaoSMS,
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success("Dados atualizados com sucesso!")
      onUpdated()
    } else {
      toast.error("Erro ao atualizar dados")
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
          <Label>Telefone</Label>
          <Input
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-black">Notificação por E-mail</Label>
        <Switch
          checked={form.notificacaoEmail}
          onCheckedChange={(checked) =>
            setForm({ ...form, notificacaoEmail: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-black">Notificação por SMS</Label>
        <Switch
          checked={form.notificacaoSMS}
          onCheckedChange={(checked) =>
            setForm({ ...form, notificacaoSMS: checked })
          }
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
