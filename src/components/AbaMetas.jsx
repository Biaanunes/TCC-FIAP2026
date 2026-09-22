import React, { useState } from 'react';
import { Target, Plus, PlusCircle } from 'lucide-react';

export default function AbaMetas({ metas, onAdicionar, onContribuir, modoEscuro, primaryColor }) {
  const [novaMeta, setNovaMeta] = useState({ nome: '', valorAlvo: '', prazo: '' });
  const [contribuicoes, setContribuicoes] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novaMeta.nome || !novaMeta.valorAlvo || !novaMeta.prazo) return;

    onAdicionar({
      id: Date.now(),
      nome: novaMeta.nome,
      valorAlvo: parseFloat(novaMeta.valorAlvo),
      valorAtual: 0,
      prazo: novaMeta.prazo,
    });
    setNovaMeta({ nome: '', valorAlvo: '', prazo: '' });
  };

  const handleContribuir = (id) => {
    const valor = parseFloat(contribuicoes[id]);
    if (!valor) return;
    onContribuir(id, valor);
    setContribuicoes({ ...contribuicoes, [id]: '' });
  };

  return (
    <div className="space-y-8">
      <div className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <Plus size={18} style={{ color: primaryColor }} /> Nova Meta
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nome da meta (ex: Viagem, Notebook)"
            value={novaMeta.nome}
            onChange={(e) => setNovaMeta({ ...novaMeta, nome: e.target.value })}
            className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
          <input
            type="number"
            placeholder="Valor alvo (R$)"
            value={novaMeta.valorAlvo}
            onChange={(e) => setNovaMeta({ ...novaMeta, valorAlvo: e.target.value })}
            className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
          <input
            type="date"
            value={novaMeta.prazo}
            onChange={(e) => setNovaMeta({ ...novaMeta, prazo: e.target.value })}
            className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
          <button
            type="submit"
            style={{ backgroundColor: primaryColor }}
            className="text-white font-bold text-xs py-3 rounded-md hover:opacity-90 transition"
          >
            Criar Meta
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metas.map((meta) => {
          const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
          return (
            <div key={meta.id} className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <Target size={16} style={{ color: primaryColor }} /> {meta.nome}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Prazo: {new Date(meta.prazo + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className="text-xs font-bold">{progresso.toFixed(0)}%</span>
              </div>

              <div className={`w-full h-3 rounded-full overflow-hidden mb-3 ${modoEscuro ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progresso}%`, backgroundColor: primaryColor }}
                />
              </div>

              <div className="flex justify-between text-xs mb-4 font-mono">
                <span className="text-slate-400">R$ {meta.valorAtual.toFixed(2)}</span>
                <span className="font-semibold">R$ {meta.valorAlvo.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Adicionar valor"
                  value={contribuicoes[meta.id] || ''}
                  onChange={(e) => setContribuicoes({ ...contribuicoes, [meta.id]: e.target.value })}
                  className={`flex-1 p-2 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
                <button
                  onClick={() => handleContribuir(meta.id)}
                  type="button"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                  className="flex items-center gap-1 text-xs font-bold px-3 rounded-md border"
                >
                  <PlusCircle size={14} /> Guardar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
