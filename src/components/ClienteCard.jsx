import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { calcularSaudeFinanceira } from '../utils/saudeFinanceira';

function iniciais(nome) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function ClienteCard({ cliente, onClick, modoEscuro, primaryColor }) {
  const saude = calcularSaudeFinanceira(cliente);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 rounded-lg border transition hover:-translate-y-0.5 ${
        modoEscuro ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            {iniciais(cliente.nome)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">{cliente.nome}</p>
            <p className="text-[10px] text-slate-400 truncate">{cliente.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            title={`Saúde financeira: ${saude.label} (visível só para você)`}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: saude.cor }}
          />
          <ChevronRight size={16} className="text-slate-400" />
        </div>
      </div>

      <div className={`divide-y text-xs font-mono ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
        <div className="flex justify-between py-2">
          <span className="text-slate-400 font-sans">Saldo Atual</span>
          <span className="font-bold">R$ {cliente.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-400 font-sans">Gastos do Mês</span>
          <span className="font-bold text-rose-500">R$ {cliente.gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-400 font-sans flex items-center gap-1"><TrendingUp size={11} /> Investimentos</span>
          <span className="font-bold text-emerald-500">R$ {cliente.investimentosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </button>
  );
}
