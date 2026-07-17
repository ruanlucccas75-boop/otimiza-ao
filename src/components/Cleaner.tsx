import { useMemo, useState } from "react";
import { HardDrive, Trash2, Play, CheckCircle2 } from "lucide-react";
import { CLEANER_TARGETS } from "../data/optimizer";
import { PanelHeader } from "./ui";

type Props = {
  onClean: (items: string[], freed: number) => void;
};

export default function Cleaner({ onClean }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CLEANER_TARGETS.map((t) => [t.id, t.defaultChecked]))
  );
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const selectedItems = useMemo(() => CLEANER_TARGETS.filter((t) => selected[t.id]), [selected]);
  const estimatedFreed = useMemo(
    () => selectedItems.reduce((sum, t) => sum + (t.id === "old_windows" ? 18432 : t.id === "windows_update_cache" ? 2048 : t.id === "recycle_bin" ? 512 : t.id === "temp_files" ? 768 : t.id.includes("cache") ? 128 : 64), 0),
    [selectedItems]
  );

  function runClean() {
    if (selectedItems.length === 0 || running) return;
    setRunning(true);
    setDone(false);
    setProgress(0);
    const step = 100 / (selectedItems.length * 2);
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 100) {
          clearInterval(timer);
          setRunning(false);
          setDone(true);
          onClean(selectedItems.map((t) => t.id), estimatedFreed);
          setTimeout(() => setDone(false), 2500);
          return 100;
        }
        return next;
      });
    }, 120);
  }

  function toggleAll(val: boolean) {
    setSelected(Object.fromEntries(CLEANER_TARGETS.map((t) => [t.id, val])));
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Limpeza"
        subtitle="Limpe o disco do sistema e perfis de navegador para recuperar espaco"
        icon={<HardDrive className="h-5 w-5" />}
        actions={
          <>
            <button onClick={() => toggleAll(true)} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
              Selecionar tudo
            </button>
            <button onClick={() => toggleAll(false)} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
              Desmarcar tudo
            </button>
            <button
              onClick={runClean}
              disabled={running || selectedItems.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-40"
            >
              {done ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Limpando…" : done ? "Concluido" : "Rodar limpeza"}
            </button>
          </>
        }
      />

      {(running || progress === 100) && (
        <div className="rounded-xl border border-white/5 bg-[#13161e] p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-white">{done ? "Limpeza concluida" : "Verificando e limpando…"}</span>
            <span className="text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#0a0c12]">
            <div
              className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-blue-500 progress-stripes"}`}
              style={{ width: `${progress}%`, transition: "width 0.15s linear" }}
            />
          </div>
          {done && (
            <p className="mt-3 text-sm text-emerald-400">
              Liberado aproximadamente {(estimatedFreed / 1024).toFixed(2)} GB em {selectedItems.length} alvos.
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-gradient-to-br from-emerald-500/10 to-transparent p-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <Trash2 className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Espaco livre estimado</span>
          </div>
          <div className="mt-2 text-4xl font-bold text-white">{(estimatedFreed / 1024).toFixed(2)}</div>
          <div className="text-sm text-gray-400">GB recuperaveis</div>
          <div className="mt-3 text-xs text-gray-500">{selectedItems.length} alvos selecionados</div>
        </div>

        {(["system", "cache", "browser"] as const).map((cat) => (
          <div key={cat} className="rounded-xl border border-white/5 bg-[#13161e] p-5">
            <h3 className="mb-3 text-sm font-semibold capitalize text-gray-300">Alvos de {cat}</h3>
            <div className="space-y-2.5">
              {CLEANER_TARGETS.filter((t) => t.category === cat).map((t) => (
                <label key={t.id} className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={!!selected[t.id]}
                    onChange={(e) => setSelected((s) => ({ ...s, [t.id]: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 flex-none rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500/40"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">{t.label}</div>
                    <div className="text-xs text-gray-500">{t.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
