import { useState } from "react";
import { Power, Zap, X } from "lucide-react";
import { STARTUP_ITEMS } from "../data/optimizer";
import { PanelHeader } from "./ui";

type Props = {
  onToggle: (name: string, enabled: boolean) => void;
  onRemove: (name: string) => void;
};

const impactStyle: Record<string, string> = {
  low: "text-emerald-400 bg-emerald-500/10",
  medium: "text-amber-400 bg-amber-500/10",
  high: "text-rose-400 bg-rose-500/10",
};

export default function Startup({ onToggle, onRemove }: Props) {
  const [items, setItems] = useState(STARTUP_ITEMS);

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          onToggle(it.name, !it.enabled);
          return { ...it, enabled: !it.enabled };
        }
        return it;
      })
    );
  }

  function remove(id: string) {
    setItems((prev) => {
      const found = prev.find((it) => it.id === id);
      if (found) onRemove(found.name);
      return prev.filter((it) => it.id !== id);
    });
  }

  const enabledCount = items.filter((i) => i.enabled).length;
  const highImpact = items.filter((i) => i.impact === "high" && i.enabled).length;

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Inicializacao"
        subtitle="Remova programas indesejados da inicializacao para acelerar o boot"
        icon={<Power className="h-5 w-5" />}
        actions={
          <div className="flex gap-4 text-right">
            <div>
              <div className="text-2xl font-semibold text-white">{enabledCount}</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500">Ativados</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-rose-400">{highImpact}</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500">Alto impacto</div>
            </div>
          </div>
        }
      />

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 rounded-xl border p-4 transition ${
              item.enabled ? "border-white/5 bg-[#13161e]" : "border-white/5 bg-[#13161e]/60 opacity-70"
            }`}
          >
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/5 text-gray-400">
              <Zap className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium text-white">{item.name}</h3>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${impactStyle[item.impact]}`}>
                  {item.impact === "low" ? "Baixo" : item.impact === "medium" ? "Medio" : "Alto"} impacto
                </span>
              </div>
              <p className="mt-0.5 truncate font-mono text-xs text-gray-600">{item.command}</p>
              <p className="mt-0.5 text-xs text-gray-500">{item.publisher}</p>
            </div>
            <div className="flex flex-none items-center gap-2">
              <button
                onClick={() => toggle(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  item.enabled
                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {item.enabled ? "Ativado" : "Desativado"}
              </button>
              <button
                onClick={() => remove(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-rose-500/30 hover:text-rose-400"
                title="Remover da inicializacao"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">Todos os itens de inicializacao foram limpos. Seu PC vai iniciar mais rapido.</p>
        )}
      </div>
    </div>
  );
}
