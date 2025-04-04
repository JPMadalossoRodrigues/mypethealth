// app/configuracoes/page.tsx
import { Suspense } from "react"
import {UserSettings} from "@/components/settings/UserSettings"
import PetSettings from "@/components/settings/PetSettings"

export default function ConfiguracoesPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Suspense fallback={<p>Carregando usuário...</p>}>
        <UserSettings />
      </Suspense>

      <hr className="border-t border-muted" />

      <Suspense fallback={<p>Carregando pets...</p>}>
        <PetSettings />
      </Suspense>
    </div>
  )
}
