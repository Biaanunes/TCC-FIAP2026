import React, { useState } from 'react';
import { Plus, Check, AlertTriangle, Clock3, CalendarClock, Repeat, X } from 'lucide-react';

function classificar(lembrete, hoje) {
  if (lembrete.pago) return 'pagas';
  if (lembrete.vencimento < hoje) return 'atrasadas';
  if (lembrete.vencimento === hoje) return 'hoje';
  const emSeteDias = new Date(hoje);
  emSeteDias.setDate(emSeteDias.getDate() + 7);
  const emSeteDiasStr = emSeteDias.toISOString().split('T')[0];
  if (lembrete.vencimento <= emSeteDiasStr) return 'semana';
  return 'futuras';
}

const SECOES = [
  { chave: 'atrasadas', titulo: 'Atrasadas', tom: 'rose' },
  { chave: 'hoje', titulo: 'Vence hoje', tom: 'amber' },
  { chave: 'semana', titulo: 'Próximos 7 dias', tom: 'violet' },
  { chave: 'futuras', titulo: 'Mais adiante', tom: 'slate' },
  { chave: 'pagas', titulo: 'Já pagas', tom: 'emerald' },
];

const TONS = {
  rose: { badge: 'border-rose-500/40 text-rose-500', dot: 'text-rose-500' },
  amber: { badge: 'border-amber-500/40 text-amber-500', dot: 'text-amber-500' },
  violet: { badge: 'border-violet-500/40 text-violet-500', dot: 'text-violet-500' },
  slate: { badge: 'border-slate-400/40 text-slate-400', dot: 'text-slate-400' },
  emerald: { badge: 'border-emerald-500/40 text-emerald-500', dot: 'text-emerald-500' },
};

export default function AbaLembretes({ lembretes, onAdicionar, onTogglePago, modoEscuro, primaryColor }) {
  const [formAberto, setFormAberto] = useState(false);
  const [novo, setNovo] = useState({ titulo: '', valor: '', vencimento: '', recorrente: false });

  const hoje = new Date().toISOString().split('T')[0];

  const grupos = lembretes.reduce((acc, l) => {
    const grupo = classificar(l, hoje);
    (acc[grupo] ||= []).push(l);
    return acc;
  }, {});

  Object.values(grupos).forEach((lista) => lista.sort((a, b) => a.vencimento.localeCompare(b.vencimento)));

  const pendentes = lembretes.filter((l) => !l.pago);
  const atrasadasCount = (grupos.atrasadas || []).length;
  const hojeCount = (grupos.hoje || []).length;
  const totalPendente = pendentes.reduce((acc, l) => acc + l.valor, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novo.titulo || !novo.valor || !novo.vencimento) return;

    onAdicionar({
      id: Date.now(),
      titulo: novo.titulo,
      valor: parseFloat(novo.valor),
      vencimento: novo.vencimento,
      pago: false,
      recorrente: novo.recorrente,
    });
    setNovo({ titulo: '', valor: '', vencimento: '', recorrente: false });
    setFormAberto(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold">O que precisa da sua atenção</h3>
        <p className="text-xs text-slate-400 mt-1">Fique por dentro das suas contas antes que elas te peguem de surpresa.</p>
      </div>

      {/* Resumo rápido em uma única faixa — em telas estreitas empilha, no desktop fica lado a lado */}
      <div className={`flex flex-col sm:flex-row rounded-lg border divide-y sm:divide-y-0 sm:divide-x ${modoEscuro ? 'bg-slate-900 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 shadow-sm divide-slate-100'}`}>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 sm:py-4">
          <AlertTriangle size={16} className="text-rose-500 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Atrasadas</p>
            <p className="text-base font-bold text-rose-500 font-mono">{atrasadasCount}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 sm:py-4">
          <Clock3 size={16} className="text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Vencem hoje</p>
            <p className="text-base font-bold text-amber-500 font-mono">{hojeCount}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-3 sm:py-4">
          <CalendarClock size={16} style={{ color: primaryColor }} className="flex-shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total pendente</p>
            <p className="text-base font-bold font-mono">R$ {totalPendente.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Ação discreta de adicionar — vira formulário apenas quando aberto, sem caixa fixa ocupando espaço */}
      {!formAberto ? (
        <button
          type="button"
          onClick={() => setFormAberto(true)}
          className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-lg border border-dashed transition hover:opacity-80 ${modoEscuro ? 'border-slate-800' : 'border-slate-300'}`}
          style={{ color: primaryColor }}
        >
          <Plus size={16} /> Lembrar de uma nova conta
        </button>
      ) : (
        <div className={`rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Novo lembrete</p>
              <button type="button" onClick={() => setFormAberto(false)}>
                <X size={16} className="text-slate-400" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Do que você precisa lembrar? (ex: Aluguel)"
                value={novo.titulo}
                onChange={(e) => setNovo({ ...novo, titulo: e.target.value })}
                className={`md:col-span-2 p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              />
              <input
                type="number"
                placeholder="Valor (R$)"
                value={novo.valor}
                onChange={(e) => setNovo({ ...novo, valor: e.target.value })}
                className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              />
              <input
                type="date"
                value={novo.vencimento}
                onChange={(e) => setNovo({ ...novo, vencimento: e.target.value })}
                className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={novo.recorrente}
                  onChange={(e) => setNovo({ ...novo, recorrente: e.target.checked })}
                />
                Repete todo mês
              </label>
              <button
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="text-white font-bold text-xs px-5 py-2.5 rounded-md hover:opacity-90 transition"
              >
                Criar lembrete
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista agrupada por urgência, tudo num único contêiner — menos caixas, mais fácil de escanear */}
      <div className={`rounded-lg border overflow-hidden ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        {SECOES.filter((s) => grupos[s.chave]?.length).map((secao, idx) => {
          const tom = TONS[secao.tom];
          return (
            <div key={secao.chave} className={idx > 0 ? `border-t ${modoEscuro ? 'border-slate-800' : 'border-slate-100'}` : undefined}>
              <div className={`flex items-center gap-2 px-5 py-2.5 ${modoEscuro ? 'bg-slate-950/40' : 'bg-slate-50'}`}>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{secao.titulo}</h4>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm border ${tom.badge}`}>
                  {grupos[secao.chave].length}
                </span>
              </div>

              <div className={`divide-y ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
                {grupos[secao.chave].map((lembrete) => (
                  <div key={lembrete.id} className="flex items-center gap-4 px-5 py-3">
                    <button
                      type="button"
                      onClick={() => onTogglePago(lembrete.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition ${
                        lembrete.pago
                          ? 'border-emerald-500 bg-emerald-500'
                          : modoEscuro ? 'border-slate-700 hover:border-slate-500' : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {lembrete.pago && <Check size={12} className="text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm truncate ${lembrete.pago ? 'line-through text-slate-400' : ''}`}>
                        {lembrete.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-medium ${tom.dot}`}>
                          {new Date(lembrete.vencimento + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                        {lembrete.recorrente && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Repeat size={10} /> mensal
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="font-bold text-sm flex-shrink-0 font-mono">R$ {lembrete.valor.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
