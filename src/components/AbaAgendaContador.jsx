import React, { useMemo, useState } from 'react';
import { CalendarOff, Check, Clock, Settings2, Trash2, User, X } from 'lucide-react';
import CalendarioMensalContador from './CalendarioMensalContador';
import { mockDisponibilidade, mockDiasBloqueados, mockAgendamentos, mockFeriados } from '../data/mockAgenda';
import { NOMES_DIAS_SEMANA, formatarDataISO, gerarGradeMesCompleta } from '../utils/agenda';

const DURACOES = [30, 45, 60, 90];

export default function AbaAgendaContador({ modoEscuro, primaryColor }) {
  const [disponibilidade, setDisponibilidade] = useState(mockDisponibilidade);
  const [rascunho, setRascunho] = useState(mockDisponibilidade);
  const [diasBloqueados, setDiasBloqueados] = useState(mockDiasBloqueados);
  const [agendamentos, setAgendamentos] = useState(mockAgendamentos);

  const [mesReferencia, setMesReferencia] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(formatarDataISO(new Date()));
  const [motivoBloqueio, setMotivoBloqueio] = useState('');
  const [horarioAberto, setHorarioAberto] = useState(false);

  const celulas = useMemo(
    () => gerarGradeMesCompleta(mesReferencia.getFullYear(), mesReferencia.getMonth()),
    [mesReferencia]
  );

  const diasComAgendamento = useMemo(
    () => new Set(agendamentos.map((a) => a.data)),
    [agendamentos]
  );

  const statusDia = (dataStr) => {
    if (diasBloqueados.some((d) => d.data === dataStr)) return 'bloqueado';
    if (diasComAgendamento.has(dataStr)) return 'agendado';
    return 'normal';
  };

  const feriadoDoDia = (dataStr) => mockFeriados.find((f) => f.data === dataStr) || null;
  const temAgendamento = (dataStr) => diasComAgendamento.has(dataStr);

  const agendamentosDoDia = diaSelecionado
    ? agendamentos.filter((a) => a.data === diaSelecionado).sort((a, b) => a.horario.localeCompare(b.horario))
    : [];

  const diaSelecionadoBloqueado = diaSelecionado
    ? diasBloqueados.find((d) => d.data === diaSelecionado)
    : null;

  const haAlteracoesPendentes = JSON.stringify(rascunho) !== JSON.stringify(disponibilidade);

  const atualizarDia = (idx, campo, valor) => {
    setRascunho((prev) => ({
      ...prev,
      dias: { ...prev.dias, [idx]: { ...prev.dias[idx], [campo]: valor } },
    }));
  };

  const atualizarCampo = (campo, valor) => {
    setRascunho((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarHorario = () => {
    setDisponibilidade(rascunho);
  };

  const handleBloquearDiaSelecionado = () => {
    if (!diaSelecionado || diaSelecionadoBloqueado) return;
    setDiasBloqueados((prev) => [...prev, { data: diaSelecionado, motivo: motivoBloqueio.trim() || 'Indisponível' }]);
    setMotivoBloqueio('');
  };

  const handleDesbloquearDiaSelecionado = () => {
    setDiasBloqueados((prev) => prev.filter((d) => d.data !== diaSelecionado));
  };

  const handleRemoverBloqueio = (data) => {
    setDiasBloqueados((prev) => prev.filter((d) => d.data !== data));
    if (data === diaSelecionado) setDiaSelecionado(null);
  };

  const handleCancelarAgendamento = (id) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
  };

  const dataFormatada = (dataStr) => new Date(dataStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold">Agenda</h1>
          <p className="text-xs text-slate-400 mt-1">Veja seus agendamentos e defina quando você está disponível para atender.</p>
        </div>

        <button
          type="button"
          onClick={() => setHorarioAberto((v) => !v)}
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition hover:opacity-80"
          style={{ backgroundColor: `${primaryColor}1f`, color: primaryColor }}
        >
          <Clock size={13} /> Horário de trabalho
        </button>
      </div>

      {horarioAberto && (
        <div className={`p-4 sm:p-6 rounded-lg border space-y-4 ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold">Horário de trabalho</h3>
            <button
              type="button"
              onClick={() => setHorarioAberto(false)}
              className="text-slate-400 hover:text-slate-600 flex-shrink-0"
              title="Ocultar horário de trabalho"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-end">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider block text-right">Duração do atendimento</label>
              <select
                value={rascunho.duracaoMin}
                onChange={(e) => atualizarCampo('duracaoMin', Number(e.target.value))}
                className={`p-1.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              >
                {DURACOES.map((d) => (
                  <option key={d} value={d}>{d} min</option>
                ))}
              </select>
            </div>
          </div>

          {/* Um horário por dia da semana — permite fechar mais cedo na sexta, folgar no sábado, etc. */}
          <div className={`rounded-md border divide-y ${modoEscuro ? 'border-slate-800 divide-slate-800' : 'border-slate-200 divide-slate-100'}`}>
            {NOMES_DIAS_SEMANA.map((nome, idx) => {
              const dia = rascunho.dias[idx];
              return (
                <div key={nome} className="flex items-center gap-3 p-2.5">
                  <button
                    type="button"
                    onClick={() => atualizarDia(idx, 'ativo', !dia.ativo)}
                    className={`w-10 flex-shrink-0 py-1.5 rounded-md border text-[10px] font-bold transition ${dia.ativo ? 'text-white' : modoEscuro ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-400'}`}
                    style={{ backgroundColor: dia.ativo ? primaryColor : undefined, borderColor: dia.ativo ? primaryColor : undefined }}
                  >
                    {nome}
                  </button>

                  {dia.ativo ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={dia.inicio}
                        onChange={(e) => atualizarDia(idx, 'inicio', e.target.value)}
                        className={`flex-1 min-w-0 p-1.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                      <span className="text-slate-400 text-xs flex-shrink-0">até</span>
                      <input
                        type="time"
                        value={dia.fim}
                        onChange={(e) => atualizarDia(idx, 'fim', e.target.value)}
                        className={`flex-1 min-w-0 p-1.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 flex-1">Fechado</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider">Início do almoço</label>
              <input
                type="time"
                value={rascunho.almocoInicio}
                onChange={(e) => atualizarCampo('almocoInicio', e.target.value)}
                className={`w-full p-2.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider">Fim do almoço</label>
              <input
                type="time"
                value={rascunho.almocoFim}
                onChange={(e) => atualizarCampo('almocoFim', e.target.value)}
                className={`w-full p-2.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSalvarHorario}
            disabled={!haAlteracoesPendentes}
            style={{ backgroundColor: haAlteracoesPendentes ? primaryColor : undefined }}
            className={`w-full flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-md transition ${
              haAlteracoesPendentes
                ? 'text-white hover:opacity-90'
                : modoEscuro ? 'bg-slate-800 text-slate-500 cursor-default' : 'bg-slate-100 text-slate-400 cursor-default'
            }`}
          >
            {haAlteracoesPendentes ? 'Salvar horário' : <><Check size={14} /> Horário salvo</>}
          </button>
        </div>
      )}

      {/* Calendário mensal cheio + painel do dia selecionado */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6 items-start">
        <CalendarioMensalContador
          celulas={celulas}
          mesReferencia={mesReferencia}
          onMudarMes={setMesReferencia}
          diaSelecionado={diaSelecionado}
          onSelecionarDia={setDiaSelecionado}
          statusDia={statusDia}
          feriadoDoDia={feriadoDoDia}
          temAgendamento={temAgendamento}
          modoEscuro={modoEscuro}
          primaryColor={primaryColor}
        />

        <div className={`rounded-lg border p-4 ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          {!diaSelecionado ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <Clock size={22} className="text-slate-400 mb-2" />
              <p className="text-xs text-slate-400">Selecione um dia para ver os atendimentos ou bloquear a agenda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{dataFormatada(diaSelecionado)}</p>

              {agendamentosDoDia.length > 0 && (
                <div className={`rounded-md border divide-y ${modoEscuro ? 'border-slate-800 divide-slate-800' : 'border-slate-200 divide-slate-100'}`}>
                  {agendamentosDoDia.map((a) => (
                    <div key={a.id} className="flex items-center gap-2.5 p-2.5">
                      <span className="text-xs font-bold font-mono flex-shrink-0">{a.horario}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold flex items-center gap-1 truncate"><User size={10} className="flex-shrink-0" /> {a.clienteNome}</p>
                        <p className="text-[10px] text-slate-400 truncate">{a.assunto}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCancelarAgendamento(a.id)}
                        title="Cancelar agendamento"
                        className="flex-shrink-0"
                      >
                        <Trash2 size={13} className="text-slate-400 hover:text-rose-500 transition" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {diaSelecionadoBloqueado ? (
                <div className={`p-3 rounded-md border text-xs ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="font-semibold flex items-center gap-1.5 text-rose-500"><CalendarOff size={13} /> Dia bloqueado</p>
                  <p className="text-slate-400 mt-1">{diaSelecionadoBloqueado.motivo}</p>
                  <button
                    type="button"
                    onClick={handleDesbloquearDiaSelecionado}
                    className="text-xs font-bold mt-2"
                    style={{ color: primaryColor }}
                  >
                    Desbloquear este dia
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Motivo (ex: Feriado, compromisso pessoal)"
                    value={motivoBloqueio}
                    onChange={(e) => setMotivoBloqueio(e.target.value)}
                    className={`w-full p-2.5 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <button
                    type="button"
                    onClick={handleBloquearDiaSelecionado}
                    className={`w-full py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition hover:opacity-80 ${modoEscuro ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
                  >
                    Bloquear esse dia
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`rounded-lg border overflow-hidden ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="p-4 sm:p-6 pb-0">
          <h3 className="text-sm font-bold mb-1">Dias indisponíveis</h3>
          <p className="text-xs text-slate-400 mb-4">Selecione um dia no calendário para bloqueá-lo.</p>
        </div>
        {diasBloqueados.length === 0 ? (
          <p className="text-xs text-slate-400 px-4 sm:px-6 pb-6">Nenhum dia bloqueado no momento.</p>
        ) : (
          <div className={`divide-y ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {[...diasBloqueados].sort((a, b) => a.data.localeCompare(b.data)).map((d) => (
              <div key={d.data} className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold">{dataFormatada(d.data)}</p>
                  <p className="text-[10px] text-slate-400 truncate">{d.motivo}</p>
                </div>
                <button type="button" onClick={() => handleRemoverBloqueio(d.data)} className="flex-shrink-0">
                  <Trash2 size={14} className="text-slate-400 hover:text-rose-500 transition" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
