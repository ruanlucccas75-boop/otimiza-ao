import { useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Shield,
  Wifi,
  Zap,
} from "lucide-react";
import type { ActivityEntry } from "../lib/supabase";
import { PanelHeader, StatTile, Card } from "./ui";

type Props = {
  states: Record<string, boolean>;
  activity: ActivityEntry[];
  onNavigate: (tab: string) => void;
};

function Ring({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative flex h-36 w-36 flex-none items-center justify-center">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#1f2330" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-semibold text-white">{value}%</span>
        <span className="text-[11px] uppercase tracking-wider text-gray-500">{label}</span>
      </div>
    </div>
  );
}

export default function Dashboard({ states, activity, onNavigate }: Props) {
  const appliedCount = Object.values(states).filter(Boolean).length;
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(58);
  const [disk, setDisk] = useState(34);

  useEffect(() => {
    const t = setInterval(() => {
      setCpu((v) => Math.max(4, Math.min(92, v + (Math.random() - 0.5) * 16)));
      setMem((v) => Math.max(40, Math.min(88, v + (Math.random() - 0.5) * 8)));
      setDisk((v) => Math.max(12, Math.min(70, v + (Math.random() - 0.5) * 6)));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const recent = activity.slice(0, 6);

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Painel"
        subtitle="Visao geral do sistema e status de otimizacao num relance"
        icon={<Gauge className="h-5 w-5" />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Otimizacoes Ativas" value={String(appliedCount)} sub="otimizacoes aplicadas" icon={<Zap className="h-4 w-4" />} accent="#3b82f6" />
        <StatTile label="Uso de CPU" value={`${cpu.toFixed(0)}%`} sub="16 nucleos · 24 threads" icon={<Cpu className="h-4 w-4" />} accent="#f59e0b" />
        <StatTile label="Memoria" value={`${mem.toFixed(0)}%`} sub="31.9 GB de 32 GB" icon={<MemoryStick className="h-4 w-4" />} accent="#10b981" />
        <StatTile label="Disco (I/O)" value={`${disk.toFixed(0)}%`} sub="SSD NVMe" icon={<HardDrive className="h-4 w-4" />} accent="#8b5cf6" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-300">Carga do Sistema em Tempo Real</h2>
          <div className="flex flex-wrap items-center justify-around gap-6">
            <Ring value={Math.round(cpu)} label="CPU" color="#f59e0b" />
            <Ring value={Math.round(mem)} label="Memoria" color="#10b981" />
            <Ring value={Math.round(disk)} label="Disco" color="#8b5cf6" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button onClick={() => onNavigate("tweaks")} className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-left transition hover:border-blue-500/30 hover:bg-blue-500/5">
              <Shield className="h-4 w-4 text-blue-400" />
              <div className="mt-2 text-sm font-medium text-white">Aplicar Otimizacoes</div>
              <div className="text-xs text-gray-500">Privacidade, desempenho, sistema</div>
            </button>
            <button onClick={() => onNavigate("cleaner")} className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-left transition hover:border-emerald-500/30 hover:bg-emerald-500/5">
              <HardDrive className="h-4 w-4 text-emerald-400" />
              <div className="mt-2 text-sm font-medium text-white">Rodar Limpeza</div>
              <div className="text-xs text-gray-500">Libere espaco em disco</div>
            </button>
            <button onClick={() => onNavigate("network")} className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-left transition hover:border-cyan-500/30 hover:bg-cyan-500/5">
              <Wifi className="h-4 w-4 text-cyan-400" />
              <div className="mt-2 text-sm font-medium text-white">Ferramentas de Rede</div>
              <div className="text-xs text-gray-500">DNS, ping, SHODAN</div>
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Activity className="h-4 w-4" /> Atividade Recente
          </h2>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-500">Nenhuma atividade ainda. Rode uma limpeza ou aplique otimizacoes para comecar.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{a.action}</div>
                    <div className="truncate text-xs text-gray-500">{a.detail || a.category}</div>
                    <div className="mt-0.5 text-[11px] text-gray-600">
                      {new Date(a.created_at).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 text-sm font-semibold text-gray-300">Detalhamento de Otimizacoes</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {(["privacy", "performance", "system", "network", "ui", "security", "updates"] as const).map((cat) => {
            const total = Object.fromEntries(
              Object.entries(states).filter(([, v]) => v)
            );
            const catApplied = Object.keys(total).filter((k) => k.startsWith(cat)).length;
            return (
              <div key={cat} className="rounded-lg border border-white/5 bg-white/[0.03] p-3 text-center">
                <div className="text-2xl font-semibold text-white">{catApplied}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-gray-500">{cat}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
