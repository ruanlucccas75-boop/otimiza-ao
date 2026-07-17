import { useState } from "react";
import {
  Wrench,
  FileText,
  Save,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Wifi,
  CircuitBoard,
  X,
  Terminal,
} from "lucide-react";
import { HARDWARE_INFO, PROCESS_LIST } from "../data/optimizer";
import { PanelHeader, Card } from "./ui";

type Props = {
  onAction: (action: string, detail: string) => void;
};

const HW_ICONS: Record<string, typeof Cpu> = {
  Monitor, Cpu, MemoryStick, HardDrive, CircuitBoard, Wifi,
};

export default function Tools({ onAction }: Props) {
  const [tab, setTab] = useState<"hosts" | "hardware" | "processes">("hosts");
  const [hostsContent, setHostsContent] = useState(
    `# Copyright (c) 1993-2009 Microsoft Corp.\n#\n# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.\n\n127.0.0.1       localhost\n::1             localhost\n\n# Blocked telemetry hosts\n127.0.0.1       vortex.data.microsoft.com\n127.0.0.1       telemetry.microsoft.com\n127.0.0.1       settings-win.data.microsoft.com`
  );
  const [processes, setProcesses] = useState(PROCESS_LIST);
  const [terminating, setTerminating] = useState<Record<string, boolean>>({});

  function saveHosts() {
    onAction("Arquivo HOSTS salvo", `${hostsContent.split("\n").length} linhas escritas em C:\\Windows\\System32\\drivers\\etc\\hosts`);
  }

  function terminate(pid: number, name: string) {
    const id = String(pid);
    if (terminating[id]) return;
    setTerminating((s) => ({ ...s, [id]: true }));
    setTimeout(() => {
      setProcesses((prev) => prev.filter((p) => p.pid !== pid));
      setTerminating((s) => {
        const { [id]: _, ...rest } = s;
        return rest;
      });
      onAction("Processo finalizado", `${name} (PID ${pid}) — handles de bloqueio de arquivo liberados`);
    }, 800);
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Ferramentas"
        subtitle="Edite o arquivo HOSTS, inspecione o hardware e gerencie processos em execucao"
        icon={<Wrench className="h-5 w-5" />}
        actions={
          <div className="flex rounded-lg border border-white/10 p-0.5">
            {[
              { k: "hosts", label: "Editor HOSTS", icon: FileText },
              { k: "hardware", label: "Hardware", icon: CircuitBoard },
              { k: "processes", label: "Processos", icon: Terminal },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as typeof tab)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    tab === t.k ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>
        }
      />

      {tab === "hosts" && (
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Editor do arquivo HOSTS</h2>
              <p className="text-xs text-gray-500">C:\Windows\System32\drivers\etc\hosts</p>
            </div>
            <button
              onClick={saveHosts}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              <Save className="h-4 w-4" /> Salvar
            </button>
          </div>
          <textarea
            value={hostsContent}
            onChange={(e) => setHostsContent(e.target.value)}
            spellCheck={false}
            className="h-80 w-full resize-none rounded-lg border border-white/10 bg-[#0a0c12] p-4 font-mono text-sm leading-relaxed text-gray-300 focus:border-blue-500/50 focus:outline-none scrollbar-thin"
          />
          <p className="mt-2 text-xs text-gray-600">
            Adicione entradas <code className="text-gray-400">127.0.0.1</code> para bloquear dominios em todo o sistema. Requer direitos de administrador.
          </p>
        </Card>
      )}

      {tab === "hardware" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {HARDWARE_INFO.map((h) => {
            const Icon = HW_ICONS[h.icon] ?? Cpu;
            return (
              <div key={h.label} className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#13161e] p-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-gray-500">{h.label}</div>
                  <div className="mt-0.5 truncate text-sm font-medium text-white">{h.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "processes" && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300">Processos em Execucao</h2>
            <span className="text-xs text-gray-500">{processes.length} processos</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Nome</th>
                  <th className="px-4 py-2.5 font-medium">PID</th>
                  <th className="px-4 py-2.5 font-medium">CPU</th>
                  <th className="px-4 py-2.5 font-medium">Memoria</th>
                  <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Tipo</th>
                  <th className="px-4 py-2.5 text-right font-medium">Acao</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {processes.map((p) => {
                  const busy = terminating[String(p.pid)];
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-2.5 font-mono font-medium text-white">{p.name}</td>
                      <td className="px-4 py-2.5 font-mono text-gray-400">{p.pid}</td>
                      <td className="px-4 py-2.5">
                        <span className={p.cpu > 3 ? "text-amber-400" : "text-gray-400"}>{p.cpu.toFixed(1)}%</span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-400">{p.memory} MB</td>
                      <td className="hidden px-4 py-2.5 sm:table-cell">
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[11px] text-gray-400">{p.type}</span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() => terminate(p.pid, p.name)}
                          disabled={busy}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-gray-500 transition hover:border-rose-500/30 hover:text-rose-400 disabled:opacity-50"
                          title="Finalizar tarefa / liberar handles de bloqueio de arquivo"
                        >
                          {busy ? (
                            <span className="h-3 w-3 animate-spin-slow rounded-full border-2 border-rose-400/30 border-t-rose-400" />
                          ) : (
                            <X className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
