import React from 'react';
import { ArrowLeft, Wallet, Receipt, TrendingUp, Target } from 'lucide-react';
import GraficoPizza from './GraficoPizza';
import IconSquare from './IconSquare';
import { calcularSaudeFinanceira } from '../utils/saudeFinanceira';

function iniciais(nome) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function ClienteDetalhe({ cliente, onVoltar, modoEscuro, primaryColor }) {
  const saude = calcularSaudeFinanceira(cliente);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onVoltar}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
      >
        <ArrowLeft size={14} /> Voltar para clientes
      </button>

      <div className={`p-6 rounded-lg border flex items-center justify-between gap-4 ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            {iniciais(cliente.nome)}
          </div>
          <div>
            <h2 className="text-lg font-bold">{cliente.nome}</h2>
            <p className="text-xs text-slate-400">{cliente.email}</p>
          </div>
        </div>

        <div
          title="Visível apenas para você, contador"
          className={`flex items-center gap-2 px-3 py-2 rounded-md flex-shrink-0 ${modoEscuro ? 'bg-slate-950' : 'bg-slate-50'}`}
        >
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: saude.cor }} />
          <span className="text-xs font-semibold">{saude.label}</span>
        </div>
      </div>

      <div className={`p-5 sm:p-6 lg:p-8 rounded-md border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="mb-6">
          <h3 className="text-base font-bold">Visão Geral Financeira</h3>
          <p className="text-xs text-slate-400 mt-1">Saldo, investimentos e distribuição de gastos deste cliente.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-center">
          <GraficoPizza dados={cliente.categorias} modoEscuro={modoEscuro} />

          <div className={`w-full divide-y ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
            <div className="flex items-center justify-between py-4 first:pt-0">
              <div className="flex items-center gap-3">
                <IconSquare icon={Wallet} color={primaryColor} />
                <div>
                  <p className="text-xs text-slate-400">Saldo Atual</p>
                  <p className="text-lg font-bold font-mono">R$ {cliente.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <IconSquare icon={Receipt} color="#F43F5E" />
                <div>
                  <p className="text-xs text-slate-400">Gastos do Mês</p>
                  <p className="text-lg font-bold text-rose-500 font-mono">R$ {cliente.gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-rose-500 border border-rose-500/30 px-2 py-1 rounded-sm">
                {((cliente.gastosMes / cliente.saldo) * 100).toFixed(0)}% do saldo
              </span>
            </div>

            <div className="flex items-center justify-between py-4 last:pb-0">
              <div className="flex items-center gap-3">
                <IconSquare icon={TrendingUp} color="#10B981" />
                <div>
                  <p className="text-xs text-slate-400">Investimentos</p>
                  <p className="text-lg font-bold text-emerald-500 font-mono">R$ {cliente.investimentosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded-sm">
                {((cliente.investimentosTotal / (cliente.saldo + cliente.investimentosTotal)) * 100).toFixed(0)}% do patrimônio
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-base font-bold mb-1 flex items-center gap-2">
          <Target size={16} style={{ color: primaryColor }} /> Objetivos Financeiros
        </h3>
        <p className="text-xs text-slate-400 mb-5">Como este cliente está indo em direção às metas que ele definiu.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cliente.metas.map((meta) => {
            const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
            return (
              <div key={meta.id} className={`p-4 rounded-md border ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-xs">{meta.nome}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Prazo: {new Date(meta.prazo + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0 font-mono">{progresso.toFixed(0)}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${modoEscuro ? 'bg-slate-900' : 'bg-slate-200'}`}>
                  <div className="h-full rounded-full" style={{ width: `${progresso}%`, backgroundColor: primaryColor }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>R$ {meta.valorAtual.toFixed(2)}</span>
                  <span>R$ {meta.valorAlvo.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-base font-bold mb-4">Últimos Gastos</h3>
        <div className="space-y-3">
          {cliente.ultimosGastos.map((gasto) => (
            <div
              key={gasto.id}
              className={`flex justify-between items-center p-4 rounded-md border ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}
            >
              <div>
                <p className="font-semibold text-xs">{gasto.descricao}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-sm border mt-1 inline-block ${modoEscuro ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-500'}`}>
                  {gasto.categoria}
                </span>
              </div>
              <span className="font-bold text-xs text-rose-500 font-mono">- R$ {gasto.valor.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
