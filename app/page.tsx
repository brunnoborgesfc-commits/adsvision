"use client";
import { useState, useEffect, useRef } from "react";
import { GastoLeadsChart, CpaChart } from "./components/Charts";

export default function Home() {
  const [view, setView] = useState<"login" | "dashboard">("login");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.35 + 0.08,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,142,255,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(79,142,255,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  function doLogin() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setView("dashboard"); }, 900);
  }

  const kpis = [
    { l: "Gasto hoje", v: "R$ 847", d: "+12%", up: true },
    { l: "Gasto no mês", v: "R$ 18.340", d: "+8%", up: true },
    { l: "Leads hoje", v: "43", d: "+21%", up: true },
    { l: "Leads no mês", v: "1.247", d: "+15%", up: true },
    { l: "CPL", v: "R$ 14,71", d: "-6%", up: true },
    { l: "CPA", v: "R$ 89,40", d: "-3%", up: true },
    { l: "ROAS", v: "4.2×", d: "+0.3×", up: true },
    { l: "CTR", v: "3.47%", d: "-0.2%", up: false },
  ];

  const camps = [
    { n: "Leads Fundo de Funil", s: "Ativo", b: "R$ 150", l: 18, cpa: "R$ 72", ctr: "4.1%", roas: "5.1×", good: true },
    { n: "Retargeting 7 dias", s: "Ativo", b: "R$ 80", l: 9, cpa: "R$ 68", ctr: "5.8%", roas: "6.2×", good: true },
    { n: "Público Frio · Vídeo", s: "Aprendendo", b: "R$ 120", l: 11, cpa: "R$ 95", ctr: "2.9%", roas: "3.4×", good: true },
    { n: "Top of Funnel · Amplo", s: "Ativo", b: "R$ 200", l: 4, cpa: "R$ 188", ctr: "1.8%", roas: "1.9×", good: false },
    { n: "Criativo Estático A", s: "Pausado", b: "R$ 60", l: 1, cpa: "R$ 210", ctr: "1.2%", roas: "1.2×", good: false },
  ];

  const bg = "min-h-screen bg-[#06070d] text-[#e8eaf6] font-sans relative overflow-hidden";

  return (
    <div className={bg} style={{ fontFamily: "Inter, sans-serif" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 animate-pulse"
        style={{ background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 70%)", top: -100, left: -100 }} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle,rgba(79,142,255,0.07) 0%,transparent 70%)", top: 200, right: -80 }} />

      <div className="relative z-10">
        {view === "login" ? (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1d4ed8,#4f8eff)" }}>
                  <svg width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" /></svg>
                </div>
                <span className="text-base font-semibold tracking-tight">AdsVision</span>
              </div>

              <div className="relative rounded-2xl p-8 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }} />

                <h1 className="text-xl font-semibold text-center mb-1 tracking-tight">Acesse sua conta</h1>
                <p className="text-sm text-center mb-7" style={{ color: "#4a5080" }}>Dashboard profissional Meta Ads</p>

                <div className="mb-4">
                  <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: "#4a5080" }}>E-mail</label>
                  <input type="email" placeholder="seu@email.com" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8eaf6" }} />
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: "#4a5080" }}>Senha</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8eaf6" }} />
                </div>

                <button onClick={doLogin} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#4f8eff)" }}>
                  {loading ? "Entrando..." : "Entrar na plataforma"}
                </button>

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-xs" style={{ color: "#4a5080" }}>ou continue com</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>

                <button className="w-full py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:border-white/20"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#8b90b8" }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(180deg,#18acfe,#0163e0)" }}>f</div>
                  Conectar com Meta Business
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6">
                {["JWT seguro", "Dados isolados", "API oficial Meta"].map((t) => (
                  <span key={t} className="text-xs" style={{ color: "#4a5080" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen">
            <div className="w-56 flex-shrink-0 flex flex-col" style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#1d4ed8,#4f8eff)" }}>
                  <svg width="14" height="14" fill="white" viewBox="0 0 16 16"><path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">AdsVision</div>
                  <div className="text-xs" style={{ color: "#4a5080" }}>v2.0</div>
                </div>
              </div>

              <div className="mx-3 my-3 rounded-xl p-3 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: "#34d399", boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
                <div>
                  <div className="text-xs font-medium">Bruno Ads</div>
                  <div className="text-xs" style={{ color: "#4a5080" }}>act_123456789</div>
                </div>
              </div>

              <nav className="px-3 flex-1">
                {[["Dashboard", true], ["Campanhas", false], ["Relatórios", false], ["Clientes", false], ["Configurações", false]].map(([label, active]) => (
                  <div key={label as string} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer my-0.5 transition-all"
                    style={{ background: active ? "rgba(79,142,255,0.1)" : "transparent", color: active ? "#93b4ff" : "#8b90b8", border: active ? "1px solid rgba(79,142,255,0.15)" : "1px solid transparent" }}>
                    {label as string}
                  </div>
                ))}
              </nav>

              <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div onClick={() => setView("login")} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#1a3a8f,#4f8eff)" }}>BR</div>
                  <div>
                    <div className="text-xs font-medium">Bruno R.</div>
                    <div className="text-xs" style={{ color: "#4a5080" }}>Administrador</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between px-6 py-4 sticky top-0 z-20" style={{ background: "rgba(6,7,13,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}>
                <div>
                  <h1 className="text-base font-semibold tracking-tight">Visão geral</h1>
                  <p className="text-xs mt-0.5" style={{ color: "#4a5080", fontFamily: "monospace" }}>atualizado · há 47s · Meta Ads API v19</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ color: "#34d399", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Ao vivo
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#8b90b8" }}>Filtros</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ background: "linear-gradient(135deg,#1d4ed8,#4f8eff)" }}>Exportar PDF</button>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-3">
                  {kpis.map((k) => (
                    <div key={k.l} className="rounded-2xl p-4 transition-all hover:border-white/10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-xs mb-2 uppercase tracking-wider" style={{ color: "#4a5080" }}>{k.l}</div>
                      <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "monospace" }}>{k.v}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: k.up ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", color: k.up ? "#34d399" : "#f87171", fontFamily: "monospace" }}>{k.d}</span>
                        <span className="text-xs" style={{ color: "#4a5080" }}>vs ontem</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
  <GastoLeadsChart />
  <CpaChart />
</div>

                <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="text-sm font-semibold">Campanhas ativas</div>
                      <div className="text-xs mt-0.5" style={{ color: "#4a5080" }}>5 campanhas · última sync há 47s</div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          {["Campanha", "Status", "Orçamento", "Leads", "CPA", "CTR", "ROAS"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: "#4a5080" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {camps.map((c) => (
                          <tr key={c.n} className="transition-all hover:bg-white/5" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td className="px-4 py-3 text-sm font-medium" style={{ color: "#c8cce8" }}>{c.n}</td>
                            <td className="px-4 py-3">
                              <span className="text-xs px-2 py-1 rounded-full" style={{
                                background: c.s === "Ativo" ? "rgba(52,211,153,0.1)" : c.s === "Pausado" ? "rgba(251,191,36,0.1)" : "rgba(79,142,255,0.1)",
                                color: c.s === "Ativo" ? "#34d399" : c.s === "Pausado" ? "#fbbf24" : "#93b4ff",
                                border: `1px solid ${c.s === "Ativo" ? "rgba(52,211,153,0.2)" : c.s === "Pausado" ? "rgba(251,191,36,0.2)" : "rgba(79,142,255,0.2)"}`
                              }}>{c.s}</span>
                            </td>
                            <td className="px-4 py-3 text-xs" style={{ color: "#8b90b8" }}>{c.b}</td>
                            <td className="px-4 py-3 text-sm font-bold" style={{ fontFamily: "monospace" }}>{c.l}</td>
                            <td className="px-4 py-3 text-xs" style={{ fontFamily: "monospace" }}>{c.cpa}</td>
                            <td className="px-4 py-3 text-xs" style={{ fontFamily: "monospace" }}>{c.ctr}</td>
                            <td className="px-4 py-3 text-xs font-semibold" style={{ color: c.good ? "#34d399" : "#f87171", fontFamily: "monospace" }}>{c.roas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}