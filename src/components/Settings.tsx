import { useState } from "react";
import { Settings as SettingsIcon, Palette, Zap, Info, Github } from "lucide-react";
import { PanelHeader, Card, Toggle } from "./ui";
import type { AppSettings } from "../lib/supabase";

type Props = {
  settings: AppSettings | null;
  onUpdate: (patch: Partial<AppSettings>) => void;
};

const THEMES = [
  { id: "dark", label: "Escuro", colors: ["#0a0c12", "#13161e", "#3b82f6"] },
  { id: "midnight", label: "Meia-noite", colors: ["#0d0a1a", "#1a1530", "#6366f1"] },
  { id: "carbon", label: "Carbono", colors: ["#0f0f0f", "#1c1c1c", "#10b981"] },
];

const ACCENTS = [
  { id: "blue", label: "Azul", color: "#3b82f6" },
  { id: "emerald", label: "Esmeralda", color: "#10b981" },
  { id: "amber", label: "Ambre", color: "#f59e0b" },
  { id: "rose", label: "Rosa", color: "#f43f5e" },
  { id: "cyan", label: "Ciano", color: "#06b6d4" },
];

export default function Settings({ settings, onUpdate }: Props) {
  const [autoApply, setAutoApply] = useState(settings?.auto_apply ?? false);

  function toggleAuto(v: boolean) {
    setAutoApply(v);
    onUpdate({ auto_apply: v });
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Configuracoes"
        subtitle="Personalize o otimizador e seu comportamento"
        icon={<SettingsIcon className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Palette className="h-4 w-4" /> Tema
          </h2>
          <div className="space-y-2.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdate({ theme: t.id })}
                className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                  settings?.theme === t.id ? "border-blue-500/40 bg-blue-500/5" : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <div>
                  <div className="text-sm font-medium text-white">{t.label}</div>
                </div>
                <div className="flex gap-1.5">
                  {t.colors.map((c) => (
                    <span key={c} className="h-6 w-6 rounded-md border border-white/10" style={{ background: c }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Palette className="h-4 w-4" /> Cor de Destaque
            </h2>
            <div className="flex flex-wrap gap-3">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onUpdate({ accent: a.id })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                    settings?.accent === a.id ? "border-white/20 bg-white/5" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="h-5 w-5 rounded-full" style={{ background: a.color }} />
                  <span className="text-sm font-medium text-white">{a.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <Zap className="h-4 w-4" /> Aplicar otimizacoes automaticamente
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Aplicar automaticamente todas as otimizacoes ativadas quando o app iniciar.
                </p>
              </div>
              <Toggle checked={autoApply} onChange={toggleAuto} />
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Info className="h-4 w-4" /> Sobre
            </h2>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between"><span>Versao</span><span className="text-white">16.7 (Edicao Web)</span></div>
              <div className="flex justify-between"><span>Licenca</span><span className="text-white">GPL-3.0</span></div>
              <div className="flex justify-between"><span>Motor</span><span className="text-white">Optimizer Web</span></div>
            </div>
            <a
              href="https://github.com/hellzerg/optimizer"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5"
            >
              <Github className="h-3.5 w-3.5" /> Projeto original por hellzerg
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
