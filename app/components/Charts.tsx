"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const dias = [
  { dia: "10/06", gasto: 620, leads: 28, cpa: 22 },
  { dia: "11/06", gasto: 740, leads: 35, cpa: 21 },
  { dia: "12/06", gasto: 580, leads: 22, cpa: 26 },
  { dia: "13/06", gasto: 810, leads: 40, cpa: 20 },
  { dia: "14/06", gasto: 950, leads: 52, cpa: 18 },
  { dia: "15/06", gasto: 720, leads: 31, cpa: 23 },
  { dia: "16/06", gasto: 680, leads: 29, cpa: 23 },
  { dia: "17/06", gasto: 870, leads: 42, cpa: 21 },
  { dia: "18/06", gasto: 790, leads: 37, cpa: 21 },
  { dia: "19/06", gasto: 920, leads: 48, cpa: 19 },
  { dia: "20/06", gasto: 840, leads: 39, cpa: 22 },
  { dia: "21/06", gasto: 1100, leads: 55, cpa: 20 },
  { dia: "22/06", gasto: 750, leads: 34, cpa: 22 },
  { dia: "23/06", gasto: 847, leads: 43, cpa: 20 },
];

const tooltipStyle = {
  backgroundColor: "#0f1020",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e8eaf6",
};

export function GastoLeadsChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mb-4">
        <div className="text-sm font-semibold">Gastos & Leads por dia</div>
        <div className="text-xs mt-1" style={{ color: "#4a5080" }}>Últimos 14 dias</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={dias}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="dia" tick={{ fill: "#4a5080", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#4a5080", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: "#8b90b8", fontSize: 12 }} />
          <Line type="monotone" dataKey="gasto" stroke="#4f8eff" strokeWidth={2} dot={false} name="Gasto (R$)" />
          <Line type="monotone" dataKey="leads" stroke="#34d399" strokeWidth={2} dot={false} name="Leads" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CpaChart() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mb-4">
        <div className="text-sm font-semibold">CPA por dia</div>
        <div className="text-xs mt-1" style={{ color: "#4a5080" }}>Custo por aquisição</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dias}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="dia" tick={{ fill: "#4a5080", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#4a5080", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="cpa" fill="#4f8eff" radius={[4, 4, 0, 0]} name="CPA (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}