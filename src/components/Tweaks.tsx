import { useMemo, useState } from "react";
import { Gauge, RotateCcw, Zap, Search } from "lucide-react";
import { CATEGORY_META, TWEAKS, type TweakCategory } from "../data/optimizer";
import { PanelHeader, Toggle, RiskBadge } from "./ui";

type Props = {
  states: Record<string, boolean>;
  onToggle: (id: string, enabled: boolean) => void;
  onApplyAll: () => void;
  onResetAll: () => void;
};

const CATEGORIES = Object.keys(CATEGORY_META) as TweakCategory[];

export default function Tweaks({ states, onToggle, onApplyAll, onResetAll }: Props) {
  const [filter, setFilter] = useState<TweakCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TWEAKS.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (query && !t.label.toLowerCase().includes(query.toLowerCase()) && !t.description.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  const appliedCount = Object.values(states).filter(Boolean).length;
  const visibleApplied = filtered.filter((t) => states[t.id]).length;

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Otimizacoes"
        subtitle="Otimizacoes de privacidade, desempenho e sistema do Windows"
        icon={<Gauge className="h-5 w-5" />}
        actions={
          <>
            <button
              onClick={onResetAll}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5"
            >
              <RotateCcw className="h-4 w-4" /> Resetar tudo
            </button>
            <button
              onClick={onApplyAll}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
            >
              <Zap className="h-4 w-4" /> Aplicar {appliedCount > 0 ? `(${appliedCount})` : "todas"}
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              filter === "all" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Todos ({TWEAKS.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = TWEAKS.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filter === c ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
                style={filter === c ? { borderBottom: `2px solid ${CATEGORY_META[c].color}` } : undefined}
              >
                {CATEGORY_META[c].label} ({count})
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar otimizacoes…"
            className="w-56 rounded-lg border border-white/10 bg-[#13161e] py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{filtered.length} otimizacoes exibidas</span>
        <span>{visibleApplied} ativas nesta visao</span>
      </div>

      <div className="space-y-2.5">
        {filtered.map((t) => {
          const on = !!states[t.id];
          const meta = CATEGORY_META[t.category];
          return (
            <div
              key={t.id}
              className={`group flex items-start gap-4 rounded-xl border p-4 transition ${
                on
                  ? "border-blue-500/30 bg-blue-500/[0.06]"
                  : "border-white/5 bg-[#13161e] hover:border-white/10"
              }`}
            >
              <span className="mt-0.5 h-2 w-2 flex-none rounded-full" style={{ background: meta.color }} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-medium text-white">{t.label}</h3>
                  <RiskBadge risk={t.risk} />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{t.description}</p>
              </div>
              <Toggle checked={on} onChange={(v) => onToggle(t.id, v)} />
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">Nenhuma otimizacao corresponde a sua busca.</p>
        )}
      </div>
    </div>
  );
}
