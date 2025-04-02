"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function UserConfigPopover() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    notificacaoEmail: false,
    notificacaoSMS: false,
  })

  // Carrega dados ao abrir o popover
  useEffect(() => {
    if (!open) return

    const loadUser = async () => {
      try {
        const res = await fetch("/api/user")
        if (!res.ok) throw new Error("Erro ao buscar usuário")
        const data = await res.json()
        setForm({
          nome: data.nome || "",
          telefone: data.telefone || "",
          notificacaoEmail: data.notificacaoEmail,
          notificacaoSMS: data.notificacaoSMS,
        })
      } catch (err) {
        toast.error("Erro ao carregar dados do usuário")
      }
    }

    loadUser()
  }, [open])

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Erro ao atualizar usuário")
      toast.success("Informações atualizadas com sucesso!")
      setOpen(false)
    } catch (err) {
      toast.error("Erro ao salvar alterações")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="hover:bg-white/10 p-1 rounded-md">
          <Settings className="h-5 w-5 text-white" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-black border border-white/10 text-white shadow-lg p-4 rounded-xl space-y-3">
        <h4 className="font-semibold text-base">Configurações do Usuário</h4>

        <div className="space-y-2">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Notificação por e-mail</Label>
            <Switch
              checked={form.notificacaoEmail}
              onCheckedChange={(v) =>
                setForm((prev) => ({ ...prev, notificacaoEmail: v }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Notificação por SMS</Label>
            <Switch
              checked={form.notificacaoSMS}
              onCheckedChange={(v) =>
                setForm((prev) => ({ ...prev, notificacaoSMS: v }))
              }
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full mt-2"
            variant="inverted"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
