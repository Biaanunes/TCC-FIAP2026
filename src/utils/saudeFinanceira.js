// Classifica a saúde financeira do cliente para o contador, com base em
// quanto dos gastos do mês compromete o patrimônio total (saldo + investimentos).
// Visão exclusiva do contador — o cliente (pessoa física) não vê essa avaliação.
export function calcularSaudeFinanceira(cliente) {
  const patrimonio = cliente.saldo + cliente.investimentosTotal;
  const comprometido = cliente.gastosMes / patrimonio;

  if (comprometido <= 0.15) {
    return { nivel: 'muito-bom', cor: '#10B981', label: 'Muito Bom' };
  }
  if (comprometido <= 0.30) {
    return { nivel: 'bom', cor: '#10B981', label: 'Bom' };
  }
  if (comprometido <= 0.50) {
    return { nivel: 'atencao', cor: '#F59E0B', label: 'Atenção' };
  }
  return { nivel: 'critico', cor: '#EF4444', label: 'Crítico' };
}
