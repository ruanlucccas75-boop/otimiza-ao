import { type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, Info, ShieldAlert } from "lucide-react";

export function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-[#13161e] ${
        checked ? "bg-blue-500" : "bg-[#2a2e3a]"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function RiskBadge({ risk }: { risk: "low" | "medium" | "high" }) {
  const map = {
    low: { icon: CheckCircle2, text: "Risco baixo", cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    medium: { icon: Info, text: "Risco medio", cls: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    high: { icon: ShieldAlert, text: "Risco alto", cls: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  };
  const m = map[risk];
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${m.cls}`}>
      <Icon className="h-3 w-3" />
      {m.text}
    </span>
  );
}

export function PanelHeader({
  title,
  subtitle,
  icon,
  actions,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-5">
      <div className="flex items-start gap-3.5">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/5 text-blue-400 ring-1 ring-white/10">
          {icon}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-0.5 text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/5 bg-[#13161e] p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  icon,
  accent = "#3b82f6",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#13161e] p-5">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-20" style={{ background: accent }} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}1a`, color: accent }}>
          {icon}
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</div>
      {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
    </div>
  );
}

export function EmptyState({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-gray-500">{icon}</div>
      <p className="mt-3 text-sm font-medium text-gray-300">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

export function Toast({
  show,
  message,
  type = "info",
}: {
  show: boolean;
  message: string;
  type?: "info" | "success" | "warning";
}) {
  if (!show) return null;
  const map = {
    info: { icon: Info, cls: "border-blue-500/30 text-blue-300" },
    success: { icon: CheckCircle2, cls: "border-emerald-500/30 text-emerald-300" },
    warning: { icon: AlertTriangle, cls: "border-amber-500/30 text-amber-300" },
  };
  const m = map[type];
  const Icon = m.icon;
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className={`flex items-center gap-3 rounded-xl border bg-[#13161e] px-4 py-3 shadow-2xl ${m.cls}`}>
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
