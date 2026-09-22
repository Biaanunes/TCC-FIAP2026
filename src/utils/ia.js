// Assistente financeiro simples: cruza a pergunta do usuário com o saldo e
// os gastos já cadastrados, sem exigir que o usuário explique o contexto.
export function responderPergunta(pergunta, { usuario, categorias, gastos }) {
  const texto = pergunta.toLowerCase();

  const match = texto.match(/(\d+(?:[.,]\d+)?)/);
  const valor = match ? parseFloat(match[1].replace(',', '.')) : null;

  const totalGastoMes = gastos.reduce((acc, g) => acc + g.valor, 0);
  const saldoLivre = usuario.saldo - totalGastoMes;

  const perguntaSobreCompra = valor !== null && /compr|posso|gastar|dar pra/.test(texto);

  if (perguntaSobreCompra) {
    if (saldoLivre <= 0) {
      return `Agora não é um bom momento: seus gastos deste mês (R$ ${totalGastoMes.toFixed(2)}) já consomem praticamente todo o seu saldo. Eu evitaria essa compra de R$ ${valor.toFixed(2)} e revisaria os gastos fixos primeiro.`;
    }

    const percentual = (valor / saldoLivre) * 100;

    if (percentual <= 10) {
      return `Sim, tranquilo! R$ ${valor.toFixed(2)} representa só ${percentual.toFixed(1)}% do seu saldo livre (R$ ${saldoLivre.toFixed(2)}). Não deve comprometer seu orçamento do mês.`;
    }
    if (percentual <= 30) {
      return `Dá pra comprar, mas com atenção: R$ ${valor.toFixed(2)} é ${percentual.toFixed(1)}% do que você tem livre esse mês (R$ ${saldoLivre.toFixed(2)}). Se puder, considere parcelar.`;
    }
    return `Eu seguraria essa por enquanto. R$ ${valor.toFixed(2)} equivale a ${percentual.toFixed(1)}% do seu saldo livre (R$ ${saldoLivre.toFixed(2)}), o que pode apertar seu mês.`;
  }

  if (texto.includes('gasto')) {
    const maiorCategoria = [...categorias].sort((a, b) => b.valor - a.valor)[0];
    return `Você já comprometeu R$ ${totalGastoMes.toFixed(2)} este mês. A categoria que mais pesa é "${maiorCategoria.nome}", com ${maiorCategoria.porcentagem}% do total.`;
  }

  if (texto.includes('saldo') || texto.includes('disponível') || texto.includes('disponivel')) {
    return `Seu saldo atual é de R$ ${usuario.saldo.toFixed(2)}. Descontando os gastos já registrados neste mês, você tem cerca de R$ ${saldoLivre.toFixed(2)} livres.`;
  }

  if (texto.includes('invest')) {
    return `Você tem R$ ${usuario.investimentosTotal.toFixed(2)} investidos atualmente. Se quiser, posso te ajudar a pensar em quanto disso vale a pena direcionar para suas metas.`;
  }

  return `Pode perguntar direto, sem precisar me contextualizar — eu já sei seu saldo e seus gastos. Exemplos: "posso comprar uma calça de R$ 300?", "como estão meus gastos esse mês?" ou "qual meu saldo disponível?".`;
}
