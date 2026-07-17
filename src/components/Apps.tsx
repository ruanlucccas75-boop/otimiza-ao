import { useState } from "react";
import {
  Archive,
  Camera,
  Code,
  Download,
  FileText,
  Gamepad2,
  GitBranch,
  Globe,
  Hexagon,
  MessageCircle,
  Music,
  Package,
  Play,
  Terminal,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { USEFUL_APPS, UWP_APPS } from "../data/optimizer";
import { PanelHeader } from "./ui";

const ICONS: Record<string, typeof Globe> = {
  Globe, Archive, FileText, Code, GitBranch, Terminal, Hexagon, Play, Music, MessageCircle, Gamepad2, Video, Camera, Package,
};

type Props = {
  onInstall: (appName: string) => void;
  onUninstall: (appName: string) => void;
};

export default function Apps({ onInstall, onUninstall }: Props) {
  const [tab, setTab] = useState<"apps" | "uwp">("apps");
  const [installing, setInstalling] = useState<Record<string, boolean>>({});
  const [uninstalling, setUninstalling] = useState<Record<string, boolean>>({});
  const [removed, setRemoved] = useState<Record<string, boolean>>({});

  function install(name: string, id: string) {
    if (installing[id]) return;
    setInstalling((s) => ({ ...s, [id]: true }));
    setTimeout(() => {
      setInstalling((s) => ({ ...s, [id]: false }));
      onInstall(name);
    }, 1400);
  }

  function uninstall(name: string, id: string) {
    if (uninstalling[id] || removed[id]) return;
    setUninstalling((s) => ({ ...s, [id]: true }));
    setTimeout(() => {
      setUninstalling((s) => ({ ...s, [id]: false }));
      setRemoved((s) => ({ ...s, [id]: true }));
      onUninstall(name);
    }, 1200);
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Apps"
        subtitle="Baixe aplicativos uteis rapidamente e desinstale bloatware UWP"
        icon={<Package className="h-5 w-5" />}
        actions={
          <div className="flex rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setTab("apps")}
              className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition ${tab === "apps" ? "bg-white/10 text-white" : "text-gray-400"}`}
            >
              Aplicativos Uteis
            </button>
            <button
              onClick={() => setTab("uwp")}
              className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition ${tab === "uwp" ? "bg-white/10 text-white" : "text-gray-400"}`}
            >
              Desinstalador UWP
            </button>
          </div>
        }
      />

      {tab === "apps" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {USEFUL_APPS.map((app) => {
            const Icon = ICONS[app.icon] ?? Package;
            const busy = installing[app.id];
            return (
              <div key={app.id} className="group flex flex-col rounded-xl border border-white/5 bg-[#13161e] p-4 transition hover:border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">{app.name}</h3>
                    <p className="truncate text-xs text-gray-500">{app.publisher}</p>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-gray-400">{app.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-gray-600">{app.size} · {app.category}</span>
                  <button
                    onClick={() => install(app.name, app.id)}
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/90 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-400 disabled:opacity-50"
                  >
                    {busy ? (
                      <span className="h-3.5 w-3.5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    {busy ? "Instalando" : "Instalar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "uwp" && (
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">App</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Distribuidor</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">Instalado</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Tamanho</th>
                <th className="px-4 py-3 text-right font-medium">Acao</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {UWP_APPS.map((app) => {
                const busy = uninstalling[app.id];
                const gone = removed[app.id];
                return (
                  <tr key={app.id} className={`transition ${gone ? "opacity-40" : "hover:bg-white/[0.02]"}`}>
                    <td className="px-4 py-3 font-medium text-white">{app.name}</td>
                    <td className="hidden px-4 py-3 text-gray-400 md:table-cell">{app.publisher}</td>
                    <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">{app.installed}</td>
                    <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">{app.size}</td>
                    <td className="px-4 py-3 text-right">
                      {gone ? (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <X className="h-3.5 w-3.5" /> Removido
                        </span>
                      ) : (
                        <button
                          onClick={() => uninstall(app.name, app.id)}
                          disabled={busy}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 px-3 py-1.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10 disabled:opacity-50"
                        >
                          {busy ? (
                            <span className="h-3.5 w-3.5 animate-spin-slow rounded-full border-2 border-rose-400/30 border-t-rose-400" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          {busy ? "Removendo" : "Desinstalar"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
