import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ABREV_DIAS_SEMANA, ABREV_MESES, NOMES_MESES, formatarDataISO } from '../utils/agenda';

export default function CalendarioMensalContador({
  celulas,
  mesReferencia,
  onMudarMes,
  diaSelecionado,
  onSelecionarDia,
  statusDia,
  feriadoDoDia,
  temAgendamento,
  modoEscuro,
  primaryColor,
}) {
  const ano = mesReferencia.getFullYear();
  const mes = mesReferencia.getMonth();
  const hojeStr = formatarDataISO(new Date());

  const irParaMesAnterior = () => onMudarMes(new Date(ano, mes - 1, 1));
  const irParaProximoMes = () => onMudarMes(new Date(ano, mes + 1, 1));

  const corBorda = modoEscuro ? 'border-slate-800' : 'border-slate-200';

  return (
    <div className={`rounded-lg border overflow-hidden ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h4 className="text-xl font-bold capitalize">{NOMES_MESES[mes].toLowerCase()} de {ano}</h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={irParaMesAnterior}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition text-slate-400 ${modoEscuro ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={irParaProximoMes}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition text-slate-400 ${modoEscuro ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-7 border-t ${corBorda}`}>
        {ABREV_DIAS_SEMANA.map((n) => (
          <div key={n} className={`text-center text-[11px] font-semibold text-slate-400 py-2 border-b ${corBorda}`}>{n}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {celulas.map(({ data, foraDoMes }, i) => {
          const dataStr = formatarDataISO(data);
          const status = !foraDoMes && statusDia ? statusDia(dataStr) : 'normal';
          const feriado = !foraDoMes ? feriadoDoDia(dataStr) : null;
          const ehHoje = !foraDoMes && dataStr === hojeStr;
          const selecionado = !foraDoMes && dataStr === diaSelecionado;
          const ehPrimeiroDia = data.getDate() === 1;

          return (
            <button
              key={`${dataStr}-${i}`}
              type="button"
              disabled={foraDoMes}
              onClick={() => onSelecionarDia(dataStr)}
              className={`relative flex flex-col items-stretch gap-1 min-h-[76px] sm:min-h-[86px] p-2 text-left border-b border-r last:border-r-0 transition ${corBorda} ${
                foraDoMes
                  ? `cursor-default ${modoEscuro ? 'bg-slate-950/40 text-slate-700' : 'bg-slate-50/60 text-slate-300'}`
                  : `${modoEscuro ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'}`
              }`}
              style={{ backgroundColor: selecionado ? `${primaryColor}14` : undefined }}
            >
              <span className="flex justify-end">
                {ehHoje ? (
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
                    {data.getDate()}
                  </span>
                ) : (
                  <span className={`text-xs font-semibold ${foraDoMes ? '' : modoEscuro ? 'text-slate-200' : 'text-slate-700'}`}>
                    {ehPrimeiroDia ? `${data.getDate()} de ${ABREV_MESES[data.getMonth()]}` : data.getDate()}
                  </span>
                )}
              </span>

              {feriado && (
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md truncate"
                  style={{ backgroundColor: modoEscuro ? 'rgba(217,204,251,0.18)' : '#F3E8FD', color: '#7C3AED' }}
                >
                  <Star size={9} className="flex-shrink-0" fill="currentColor" /> {feriado.nome}
                </span>
              )}

              {status === 'bloqueado' && !feriado && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md truncate bg-rose-500/10 text-rose-500 w-fit">
                  Bloqueado
                </span>
              )}

              {!foraDoMes && temAgendamento(dataStr) && (
                <span className="mt-auto self-start w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
