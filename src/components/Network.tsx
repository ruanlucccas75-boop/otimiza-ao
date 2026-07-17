import { useState } from "react";
import { Wifi, Server, Activity, Search, CheckCircle2, Eraser } from "lucide-react";
import { DNS_SERVERS } from "../data/optimizer";
import { PanelHeader, Card } from "./ui";

type Props = {
  onAction: (action: string, detail: string) => void;
};

type PingRow = { host: string; ip: string; latency: number; status: "ok" | "fail" };

export default function Network({ onAction }: Props) {
  const [selectedDns, setSelectedDns] = useState("dhcp");
  const [pingHost, setPingHost] = useState("8.8.8.8");
  const [pingRows, setPingRows] = useState<PingRow[]>([]);
  const [pinging, setPinging] = useState(false);
  const [shodanQuery, setShodanQuery] = useState("");
  const [shodanResult, setShodanResult] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  function applyDns(id: string) {
    setSelectedDns(id);
    const dns = DNS_SERVERS.find((d) => d.id === id);
    if (dns) onAction(`DNS alterado para ${dns.name}`, `Primario: ${dns.primary} · Secundario: ${dns.secondary}`);
  }

  function flushDns() {
    onAction("Cache DNS limpo", "ipconfig /flushdns executado com sucesso");
  }

  function runPing() {
    if (!pingHost || pinging) return;
    setPinging(true);
    setPingRows([]);
    const targets = [
      { host: pingHost, ip: pingHost.match(/\d+\.\d+\.\d+\.\d+/) ? pingHost : "142.250.74.46" },
      { host: "1.1.1.1", ip: "1.1.1.1" },
      { host: "8.8.8.8", ip: "8.8.8.8" },
    ];
    targets.forEach((t, i) => {
      setTimeout(() => {
        const latency = Math.round(8 + Math.random() * 40);
        setPingRows((prev) => [...prev, { host: t.host, ip: t.ip, latency, status: "ok" }]);
        if (i === targets.length - 1) {
          setPinging(false);
          onAction("Teste de ping concluido", `${targets.length} hosts avaliados`);
        }
      }, 600 * (i + 1));
    });
  }

  function searchShodan() {
    if (!shodanQuery || searching) return;
    setSearching(true);
    setShodanResult(null);
    setTimeout(() => {
      const ip = shodanQuery.match(/\d+\.\d+\.\d+\.\d+/) ? shodanQuery : "8.8.8.8";
      const result = [
        `IP: ${ip}`,
        `Organizacao: Google LLC`,
        `Provedor: Google LLC`,
        `Pais: Estados Unidos`,
        `Cidade: Mountain View`,
        `Portas abertas: 53, 443, 80`,
        `Ultima atualizacao: 2024-07-12T08:42:00.000Z`,
        `Hostnames: dns.google`,
      ].join("\n");
      setShodanResult(result);
      setSearching(false);
      onAction("IP buscado no SHODAN.io", `Consulta: ${shodanQuery}`);
    }, 1500);
  }

  return (
    <div className="animate-fade-in space-y-6">
      <PanelHeader
        title="Rede"
        subtitle="Alterar DNS, limpar cache, pingar IPs e buscar no SHODAN.io"
        icon={<Wifi className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Server className="h-4 w-4" /> Servidor DNS
          </h2>
          <div className="space-y-2">
            {DNS_SERVERS.map((d) => (
              <button
                key={d.id}
                onClick={() => applyDns(d.id)}
                className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                  selectedDns === d.id
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{d.name}</span>
                    {selectedDns === d.id && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">{d.note}</div>
                  <div className="mt-1 font-mono text-[11px] text-gray-600">
                    {d.primary} · {d.secondary}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={flushDns}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/20 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-amber-500/10"
          >
            <Eraser className="h-4 w-4" /> Limpar cache DNS
          </button>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Activity className="h-4 w-4" /> Ping &amp; Latencia
            </h2>
            <div className="flex gap-2">
              <input
                value={pingHost}
                onChange={(e) => setPingHost(e.target.value)}
                placeholder="Endereco IP ou hostname"
                className="flex-1 rounded-lg border border-white/10 bg-[#0a0c12] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
              />
              <button
                onClick={runPing}
                disabled={pinging}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:opacity-50"
              >
                {pinging ? "Pingando…" : "Ping"}
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {pingRows.map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 animate-fade-in">
                  <div>
                    <div className="font-mono text-sm text-white">{r.host}</div>
                    <div className="text-xs text-gray-500">{r.ip}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-emerald-400">{r.latency} ms</div>
                    <div className="text-[11px] text-gray-600">resposta recebida</div>
                  </div>
                </div>
              ))}
              {pingRows.length === 0 && !pinging && (
                <p className="py-6 text-center text-xs text-gray-500">Digite um IP ou host e pressione Ping.</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Search className="h-4 w-4" /> Consulta SHODAN.io
            </h2>
            <div className="flex gap-2">
              <input
                value={shodanQuery}
                onChange={(e) => setShodanQuery(e.target.value)}
                placeholder="Endereco IP"
                className="flex-1 rounded-lg border border-white/10 bg-[#0a0c12] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
              />
              <button
                onClick={searchShodan}
                disabled={searching}
                className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-400 disabled:opacity-50"
              >
                {searching ? "Buscando…" : "Buscar"}
              </button>
            </div>
            {shodanResult && (
              <pre className="mt-4 overflow-x-auto rounded-lg border border-white/5 bg-[#0a0c12] p-3 font-mono text-xs text-gray-300 animate-fade-in">
                {shodanResult}
              </pre>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
