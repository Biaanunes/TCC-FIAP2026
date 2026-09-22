// Configuração de disponibilidade do contador: em que dias e horários
// ele atende (podendo variar por dia da semana), e a duração de cada
// atendimento. O almoço é o mesmo horário em todos os dias ativos.
export const mockDisponibilidade = {
  duracaoMin: 60,
  almocoInicio: '12:00',
  almocoFim: '13:00',
  dias: {
    0: { ativo: false, inicio: '09:00', fim: '18:00' }, // domingo
    1: { ativo: true, inicio: '09:00', fim: '18:00' },
    2: { ativo: true, inicio: '09:00', fim: '18:00' },
    3: { ativo: true, inicio: '09:00', fim: '18:00' },
    4: { ativo: true, inicio: '09:00', fim: '18:00' },
    5: { ativo: true, inicio: '09:00', fim: '17:00' },
    6: { ativo: false, inicio: '09:00', fim: '13:00' }, // sábado
  },
};

// Dias em que o contador marcou que não vai poder atender
// (feriado, compromisso pessoal, etc.)
export const mockDiasBloqueados = [
  { data: '2026-09-21', motivo: 'Feriado' },
  { data: '2026-09-25', motivo: 'Compromisso pessoal' },
];

// Agendamentos já confirmados entre clientes e o contador.
export const mockAgendamentos = [
  { id: 1, data: '2026-09-18', horario: '10:00', clienteNome: 'Beatriz Nunes', assunto: 'Revisão de gastos do mês' },
  { id: 2, data: '2026-09-22', horario: '14:00', clienteNome: 'Beatriz Nunes', assunto: 'Planejamento de Imposto de Renda' },
  { id: 3, data: '2026-09-18', horario: '15:00', clienteNome: 'Carlos Eduardo Silva', assunto: 'Dúvidas sobre investimentos' },
  { id: 4, data: '2026-09-23', horario: '09:00', clienteNome: 'Fernanda Costa Almeida', assunto: 'Organização de documentos' },
];
