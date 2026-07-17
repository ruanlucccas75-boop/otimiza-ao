import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard,
  Gauge,
  HardDrive,
  Package,
  Power,
  Wifi,
  Wrench,
  Settings as SettingsIcon,
  Github,
  ShieldCheck,
} from "lucide-react";
import { supabase, type OptimizationState, type ActivityEntry, type AppSettings } from "./lib/supabase";
import { TWEAKS } from "./data/optimizer";
import Dashboard from "./components/Dashboard";
import Tweaks from "./components/Tweaks";
import Cleaner from "./components/Cleaner";
import Apps from "./components/Apps";
import Startup from "./components/Startup";
import Network from "./components/Network";
import Tools from "./components/Tools";
import Settings from "./components/Settings";
import { Toast } from "./components/ui";

const NAV = [
  { id: "dashboard", label: "Painel", icon: LayoutDashboard },
  { id: "tweaks", label: "Otimizacoes", icon: Gauge },
  { id: "cleaner", label: "Limpeza", icon: HardDrive },
  { id: "apps", label: "Apps", icon: Package },
  { id: "startup", label: "Inicializacao", icon: Power },
  { id: "network", label: "Rede", icon: Wifi },
  { id: "tools", label: "Ferramentas", icon: Wrench },
  { id: "settings", label: "Configuracoes", icon: SettingsIcon },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [states, setStates] = useState<Record<string, boolean>>({});
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: "info" | "success" | "warning" }>({
    show: false,
    msg: "",
    type: "info",
  });

  const showToast = useCallback((msg: string, type: "info" | "success" | "warning" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }, []);

  const logActivity = useCallback(
    async (action: string, category: string, detail?: string) => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from("activity_log")
          .insert({ action, category, detail: detail ?? null })
          .select()
          .single();
        if (data) {
          setActivity((prev) => [data as ActivityEntry, ...prev].slice(0, 30));
        }
      } catch {
        // offline — skip logging
      }
    },
    []
  );

  // Initial load — timeout fallback ensures UI renders even if Supabase is unreachable
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setLoading(false);
      }
    };
    const timer = setTimeout(finish, 5000);

    (async () => {
      if (!supabase) {
        finish();
        return;
      }
      try {
        const [{ data: stateRows }, { data: activityRows }, { data: settingsRow }] = await Promise.all([
          supabase.from("optimization_states").select("*"),
          supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(30),
          supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
        ]);

        const map: Record<string, boolean> = {};
        (stateRows as OptimizationState[] | null)?.forEach((r) => {
          map[r.id] = r.enabled;
        });
        setStates(map);
        setActivity((activityRows as ActivityEntry[]) ?? []);
        setSettings((settingsRow as AppSettings | null) ?? null);
      } catch {
        // Supabase unreachable — render with empty defaults
      } finally {
        clearTimeout(timer);
        finish();
      }
    })();

    return () => clearTimeout(timer);
  }, []);

  // Seed default tweak rows once so toggles persist cleanly
  useEffect(() => {
    if (loading || !supabase) return;
    const existing = Object.keys(states);
    const missing = TWEAKS.filter((t) => !existing.includes(t.id)).map((t) => ({
      id: t.id,
      category: t.category,
      enabled: false,
    }));
    if (missing.length > 0) {
      supabase.from("optimization_states").insert(missing).then(() => {}, () => {});
    }
  }, [loading, states]);

  async function handleToggle(id: string, enabled: boolean) {
    setStates((prev) => ({ ...prev, [id]: enabled }));
    if (supabase) {
      try {
        await supabase.from("optimization_states").upsert({ id, enabled, updated_at: new Date().toISOString() });
      } catch {
        // offline
      }
    }
    const tweak = TWEAKS.find((t) => t.id === id);
    if (tweak) {
      logActivity(`${enabled ? "Ativado" : "Desativado"}: ${tweak.label}`, "tweaks", tweak.description);
      showToast(`${tweak.label} ${enabled ? "ativado" : "desativado"}`);
    }
  }

  async function handleApplyAll() {
    const enabledIds = Object.entries(states).filter(([, v]) => v).map(([k]) => k);
    if (enabledIds.length === 0) {
      const lowRisk = TWEAKS.filter((t) => t.risk === "low");
      const newStates: Record<string, boolean> = { ...states };
      lowRisk.forEach((t) => (newStates[t.id] = true));
      setStates(newStates);
      if (supabase) {
        try {
          await supabase.from("optimization_states").upsert(
            lowRisk.map((t) => ({ id: t.id, enabled: true, updated_at: new Date().toISOString() }))
          );
        } catch {
          // offline
        }
      }
      logActivity(`Aplicadas ${lowRisk.length} otimizacoes`, "tweaks", "Todas as otimizacoes de baixo risco ativadas");
      showToast(`Aplicadas ${lowRisk.length} otimizacoes`, "success");
    } else {
      logActivity(`Aplicadas ${enabledIds.length} otimizacoes`, "tweaks", `${enabledIds.length} otimizacoes estao ativas`);
      showToast(`${enabledIds.length} otimizacoes aplicadas`, "success");
    }
  }

  async function handleResetAll() {
    const reset: Record<string, boolean> = {};
    TWEAKS.forEach((t) => (reset[t.id] = false));
    setStates(reset);
    if (supabase) {
      try {
        await supabase.from("optimization_states").upsert(
          TWEAKS.map((t) => ({ id: t.id, enabled: false, updated_at: new Date().toISOString() }))
        );
      } catch {
        // offline
      }
    }
    logActivity("Resetar todas as otimizacoes", "tweaks", "Todas as otimizacoes desativadas");
    showToast("Todas as otimizacoes resetadas", "info");
  }

  async function handleClean(items: string[], freed: number) {
    logActivity(`Limpos ${items.length} alvos`, "cleaner", `Liberados ${(freed / 1024).toFixed(2)} GB de espaco em disco`);
    showToast(`Liberados ${(freed / 1024).toFixed(2)} GB de espaco em disco`, "success");
  }

  async function handleUpdateSettings(patch: Partial<AppSettings>) {
    const next = { ...settings, ...patch } as AppSettings;
    setSettings(next);
    if (supabase) {
      try {
        await supabase.from("settings").upsert({ id: 1, ...patch, updated_at: new Date().toISOString() });
      } catch {
        // offline
      }
    }
    showToast("Configuracoes atualizadas");
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0c12]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin-slow rounded-full border-2 border-white/20 border-t-blue-500" />
          <p className="text-sm text-gray-500">Carregando Optimizer…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0c12] text-gray-200">
      {/* Sidebar */}
      <aside className="flex w-60 flex-none flex-col border-r border-white/5 bg-[#0d1017]">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">Optimizer</h1>
            <p className="text-[11px] text-gray-500">Edicao Windows</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                )}
                <Icon className={`h-4 w-4 ${active ? "text-blue-400" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/5 px-5 py-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-glow" />
            <span>Sistema saudavel</span>
          </div>
          <a
            href="https://github.com/hellzerg/optimizer"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-gray-600 transition hover:text-gray-400"
          >
            <Github className="h-3.5 w-3.5" /> hellzerg/optimizer
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
          {tab === "dashboard" && <Dashboard states={states} activity={activity} onNavigate={setTab} />}
          {tab === "tweaks" && (
            <Tweaks states={states} onToggle={handleToggle} onApplyAll={handleApplyAll} onResetAll={handleResetAll} />
          )}
          {tab === "cleaner" && <Cleaner onClean={handleClean} />}
          {tab === "apps" && (
            <Apps
              onInstall={(name) => {
                logActivity(`Instalado ${name}`, "apps", "App baixado e instalado");
                showToast(`${name} instalado`, "success");
              }}
              onUninstall={(name) => {
                logActivity(`Desinstalado ${name}`, "apps", "App UWP removido");
                showToast(`${name} desinstalado`, "info");
              }}
            />
          )}
          {tab === "startup" && (
            <Startup
              onToggle={(name, enabled) => {
                logActivity(`${enabled ? "Ativado" : "Desativado"} inicializacao: ${name}`, "startup");
                showToast(`${name} ${enabled ? "ativado" : "desativado"}`, "info");
              }}
              onRemove={(name) => {
                logActivity(`Removido item de inicializacao: ${name}`, "startup");
                showToast(`${name} removido da inicializacao`, "info");
              }}
            />
          )}
          {tab === "network" && (
            <Network
              onAction={(action, detail) => {
                logActivity(action, "network", detail);
                showToast(action, "success");
              }}
            />
          )}
          {tab === "tools" && (
            <Tools
              onAction={(action, detail) => {
                logActivity(action, "tools", detail);
                showToast(action, "success");
              }}
            />
          )}
          {tab === "settings" && <Settings settings={settings} onUpdate={handleUpdateSettings} />}
        </div>
      </main>

      <Toast show={toast.show} message={toast.msg} type={toast.type} />
    </div>
  );
}
