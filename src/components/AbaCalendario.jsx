import React, { useMemo, useState } from 'react';
import { CalendarDays, CalendarClock, Clock, CheckCircle2, X, Trash2 } from 'lucide-react';
import Calendario from './Calendario';
import { mockDisponibilidade, mockDiasBloqueados, mockAgendamentos } from '../data/mockAgenda';
import { formatarDataISO, horariosDisponiveis } from '../utils/agenda';

export default function AbaCalendario({ usuarioNome, modoEscuro, primaryColor }) {
  const [agendamentos, setAgendamentos] = useState(mockAgendamentos);
  const [mesReferencia, setMesReferencia] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioEscolhido, setHorarioEscolhido] = useState(null);
  const [assunto, setAssunto] = useState('');
  const [confirmado, setConfirmado] = useState(null);
  const [reagendandoId, setReagendandoId] = useState(null);

  const diasComAgendamento = useMemo(
    () => new Set(agendamentos.map((a) => a.data)),
    [agendamentos]
  );

  const statusDia = (dataStr) => {
    if (mockDiasBloqueados.some((d) => d.data === dataStr)) return 'bloqueado';
    if (diasComAgendamento.has(dataStr)) return 'agendado';
    return 'normal';
  };

  // Ao reagendar, o próprio horário atual do agendamento não deve contar
  // como "ocupado" — senão o cliente não conseguiria manter o mesmo horário.
  const agendamentoEmEdicao = reagendandoId ? agendamentos.find((a) => a.id === reagendandoId) : null;
  const agendamentosParaConflito = reagendandoId
    ? agendamentos.filter((a) => a.id !== reagendandoId)
    : agendamentos;

  const slots = diaSelecionado
    ? horariosDisponiveis(diaSelecionado, mockDisponibilidade, mockDiasBloqueados, agendamentosParaConflito)
    : [];

  const meusAgendamentos = agendamentos
    .filter((a) => a.clienteNome === usuarioNome)
    .filter((a) => a.data >= formatarDataISO(new Date()))
    .sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario));

  const handleSelecionarDia = (dataStr) => {
    setDiaSelecionado(dataStr);
    setHorarioEscolhido(null);
    setConfirmado(null);
  };

  const handleIniciarReagendamento = (a) => {
    setReagendandoId(a.id);
    setAssunto(a.assunto);
    setMesReferencia(new Date(a.data + 'T00:00:00'));
    setDiaSelecionado(a.data);
    setHorarioEscolhido(null);
    setConfirmado(null);
  };

  const handleCancelarReagendamento = () => {
    setReagendandoId(null);
    setAssunto('');
    setHorarioEscolhido(null);
    setConfirmado(null);
  };

  const handleConfirmar = (e) => {
    e.preventDefault();

    if (reagendandoId) {
      const atualizado = {
        ...agendamentoEmEdicao,
        data: diaSelecionado,
        horario: horarioEscolhido,
        assunto: assunto.trim() || 'Consulta financeira',
      };
      setAgendamentos((prev) => prev.map((a) => (a.id === reagendandoId ? atualizado : a)));
      setConfirmado({ ...atualizado, reagendado: true });
      setReagendandoId(null);
    } else {
      const novo = {
        id: Date.now(),
        data: diaSelecionado,
        horario: horarioEscolhido,
        clienteNome: usuarioNome,
        assunto: assunto.trim() || 'Consulta financeira',
      };
      setAgendamentos((prev) => [...prev, novo]);
      setConfirmado(novo);
    }

    setHorarioEscolhido(null);
    setAssunto('');
  };

  const handleCancelar = (id) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
    if (id === reagendandoId) handleCancelarReagendamento();
  };

  const dataFormatada = (dataStr) => new Date(dataStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold">Agende um horário com seu contador</h3>
        <p className="text-xs text-slate-400 mt-1">Escolha um dia disponível e marque um horário de atendimento.</p>
      </div>

      {/* Meus agendamentos logo no topo — é a informação mais consultada, antes de abrir o calendário */}
      <div className={`rounded-lg border overflow-hidden ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className={`px-5 py-2.5 ${modoEscuro ? 'bg-slate-950/40' : 'bg-slate-50'}`}>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Meus próximos agendamentos</h4>
        </div>
        {meusAgendamentos.length === 0 ? (
          <p className="text-xs text-slate-400 px-5 py-4">Você ainda não tem agendamentos marcados.</p>
        ) : (
          <div className={`divide-y ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {meusAgendamentos.map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                <div className="text-center flex-shrink-0 w-16">
                  <p className="text-[10px] text-slate-400">{dataFormatada(a.data)}</p>
                  <p className="text-sm font-bold font-mono">{a.horario}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{a.assunto}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleIniciarReagendamento(a)}
                    title="Reagendar"
                    className="flex-shrink-0"
                  >
                    <CalendarClock size={14} className="text-slate-400 hover:opacity-70 transition" style={{ color: reagendandoId === a.id ? primaryColor : undefined }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelar(a.id)}
                    title="Cancelar agendamento"
                    className="flex-shrink-0"
                  >
                    <Trash2 size={14} className="text-slate-400 hover:text-rose-500 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendário compacto — a lista acima já cobre o que costuma importar primeiro */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_320px] gap-6">
        <div className={`p-5 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Calendario
            mesReferencia={mesReferencia}
            onMudarMes={setMesReferencia}
            diaSelecionado={diaSelecionado}
            onSelecionarDia={handleSelecionarDia}
            statusDia={statusDia}
            modoEscuro={modoEscuro}
            primaryColor={primaryColor}
          />
          <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} /> tem agendamento</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> indisponível</span>
          </div>
        </div>

        <div className={`p-5 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          {!diaSelecionado ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <CalendarDays size={24} className="text-slate-400 mb-2" />
              <p className="text-xs text-slate-400">Selecione um dia no calendário para ver os horários disponíveis.</p>
            </div>
          ) : confirmado ? (
            <div className="py-4 text-center space-y-2">
              <CheckCircle2 size={28} className="text-emerald-500 mx-auto" />
              <p className="text-sm font-bold">{confirmado.reagendado ? 'Agendamento reagendado!' : 'Agendamento confirmado!'}</p>
              <p className="text-xs text-slate-400">
                {dataFormatada(confirmado.data)} às {confirmado.horario} — {confirmado.assunto}
              </p>
              <button
                type="button"
                onClick={() => setConfirmado(null)}
                className="text-xs font-bold mt-2"
                style={{ color: primaryColor }}
              >
                Ver outros horários
              </button>
            </div>
          ) : (
            <>
              {reagendandoId && (
                <div className={`flex items-center justify-between gap-2 p-2.5 mb-3 rounded-md border text-[10px] font-semibold ${modoEscuro ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <span className="flex items-center gap-1.5" style={{ color: primaryColor }}>
                    <CalendarClock size={12} /> Reagendando: {agendamentoEmEdicao?.assunto}
                  </span>
                  <button type="button" onClick={handleCancelarReagendamento}>
                    <X size={13} className="text-slate-400" />
                  </button>
                </div>
              )}

              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Horários em {dataFormatada(diaSelecionado)}
              </p>

              {slots.length === 0 ? (
                <p className="text-xs text-slate-400">Nenhum horário disponível neste dia.</p>
              ) : !horarioEscolhido ? (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHorarioEscolhido(h)}
                      className={`flex items-center justify-center gap-1 py-2 rounded-md border text-xs font-semibold transition ${modoEscuro ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}
                    >
                      <Clock size={11} /> {h}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleConfirmar} className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-md border ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-xs font-bold">{dataFormatada(diaSelecionado)} às {horarioEscolhido}</span>
                    <button type="button" onClick={() => setHorarioEscolhido(null)}>
                      <X size={14} className="text-slate-400" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Assunto (ex: Revisão de gastos)"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className={`w-full p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: primaryColor }}
                    className="w-full text-white font-bold text-xs py-3 rounded-md hover:opacity-90 transition"
                  >
                    {reagendandoId ? 'Confirmar reagendamento' : 'Confirmar agendamento'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
