import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NOMES_DIAS_SEMANA, NOMES_MESES, formatarDataISO, gerarGradeMes } from '../utils/agenda';

export default function Calendario({
  mesReferencia,
  onMudarMes,
  diaSelecionado,
  onSelecionarDia,
  statusDia,
  modoEscuro,
  primaryColor,
  permitirDiasPassados = false,
}) {
  const ano = mesReferencia.getFullYear();
  const mes = mesReferencia.getMonth();
  const celulas = gerarGradeMes(ano, mes);
  const hojeStr = formatarDataISO(new Date());

  const irParaMesAnterior = () => onMudarMes(new Date(ano, mes - 1, 1));
  const irParaProximoMes = () => onMudarMes(new Date(ano, mes + 1, 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold">{NOMES_MESES[mes]} {ano}</h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={irParaMesAnterior}
            className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${modoEscuro ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={irParaProximoMes}
            className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${modoEscuro ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {NOMES_DIAS_SEMANA.map((n) => (
          <div key={n} className="text-center text-[10px] font-bold uppercase text-slate-400 py-1">{n}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {celulas.map((data, i) => {
          if (!data) return <div key={`vazio-${i}`} />;

          const dataStr = formatarDataISO(data);
          const status = statusDia ? statusDia(dataStr) : 'normal';
          const passado = dataStr < hojeStr;
          const desabilitado = (passado && !permitirDiasPassados) || status === 'bloqueado';
          const ehHoje = dataStr === hojeStr;
          const selecionado = dataStr === diaSelecionado;

          return (
            <button
              key={dataStr}
              type="button"
              disabled={desabilitado}
              onClick={() => onSelecionarDia(dataStr)}
              className={`relative aspect-square rounded-md text-xs font-semibold flex items-center justify-center transition ${
                desabilitado
                  ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : modoEscuro ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              } ${ehHoje && !selecionado ? 'border' : ''}`}
              style={{
                backgroundColor: selecionado ? primaryColor : undefined,
                color: selecionado ? '#ffffff' : undefined,
                borderColor: ehHoje && !selecionado ? primaryColor : undefined,
              }}
            >
              {data.getDate()}
              {status === 'agendado' && !selecionado && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
              )}
              {status === 'bloqueado' && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-rose-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
