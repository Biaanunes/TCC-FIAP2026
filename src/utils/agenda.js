export const NOMES_DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function formatarDataISO(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function paraMinutos(horaStr) {
  const [h, m] = horaStr.split(':').map(Number);
  return h * 60 + m;
}

function paraHoraStr(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

// Gera a semana (0=dom...6=sáb) de uma data 'YYYY-MM-DD' sem depender de
// fuso horário do navegador, já que new Date('YYYY-MM-DD') interpreta UTC.
export function diaDaSemana(dataStr) {
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  return new Date(ano, mes - 1, dia).getDay();
}

// Monta a grade de um mês: array de { data: Date|null } incluindo os
// espaços vazios antes do dia 1 para alinhar com o dia da semana correto.
export function gerarGradeMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1);
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const offset = primeiroDia.getDay();

  const celulas = [];
  for (let i = 0; i < offset; i++) celulas.push(null);
  for (let dia = 1; dia <= totalDias; dia++) celulas.push(new Date(ano, mes, dia));
  return celulas;
}

// Todos os horários possíveis num dia, respeitando o expediente daquele
// dia da semana específico e o almoço — independe de bloqueios ou
// agendamentos já feitos.
export function horariosDoDia(dataStr, disponibilidade) {
  const dia = disponibilidade.dias[diaDaSemana(dataStr)];
  if (!dia || !dia.ativo) return [];

  const fim = paraMinutos(dia.fim);
  const almocoIni = paraMinutos(disponibilidade.almocoInicio);
  const almocoFim = paraMinutos(disponibilidade.almocoFim);

  const horarios = [];
  for (let m = paraMinutos(dia.inicio); m + disponibilidade.duracaoMin <= fim; m += disponibilidade.duracaoMin) {
    const noAlmoco = m >= almocoIni && m < almocoFim;
    if (!noAlmoco) horarios.push(paraHoraStr(m));
  }
  return horarios;
}

// Horários realmente disponíveis para agendar: exclui dias bloqueados e
// horários que já têm agendamento marcado.
export function horariosDisponiveis(dataStr, disponibilidade, diasBloqueados, agendamentos) {
  if (diasBloqueados.some((d) => d.data === dataStr)) return [];
  const ocupados = new Set(agendamentos.filter((a) => a.data === dataStr).map((a) => a.horario));
  return horariosDoDia(dataStr, disponibilidade).filter((h) => !ocupados.has(h));
}
