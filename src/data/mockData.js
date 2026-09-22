export const mockUsuarioCliente = {
    nome: "Beatriz Nunes",
    saldo: 14850.00,
    gastosMes: 3350.00,
    investimentosTotal: 28400.00,
  };
  
  export const mockCategoriasGastos = [
    { nome: "Gastos Fixos", valor: 1400.00, cor: "#4C1D95", porcentagem: 41 },
    { nome: "Alimentação & Mercado", valor: 850.00, cor: "#7C3AED", porcentagem: 25 },
    { nome: "Desejos & Lazer", valor: 600.00, cor: "#A78BFA", porcentagem: 18 },
    { nome: "Emergências & Saúde", valor: 500.00, cor: "#C4B5FD", porcentagem: 16 },
  ];
  
  export const mockGastosIniciais = [
    { id: 1, descricao: "Aluguel", categoria: "Gastos Fixos", valor: 1200.00, data: "2026-09-01", tipo: "fixo" },
    { id: 2, descricao: "Assinatura Netflix & Spotify", categoria: "Gastos Fixos", valor: 70.00, data: "2026-09-02", tipo: "fixo" },
    { id: 3, descricao: "Supermercado Semanal", categoria: "Alimentação & Mercado", valor: 450.00, data: "2026-09-03", tipo: "variavel" },
    { id: 4, descricao: "Farmácia - Medicamentos", categoria: "Emergências & Saúde", valor: 120.00, data: "2026-09-04", tipo: "variavel" },
    { id: 5, descricao: "Jantar Restaurante", categoria: "Desejos & Lazer", valor: 180.00, data: "2026-09-05", tipo: "variavel" },
  ];
  
  export const mockPlanos = [
    {
      id: "gratis",
      nome: "Gratuito",
      preco: "R$ 0",
      periodo: "/mês",
      descricao: "Ideal para organização pessoal e controle de gastos diários.",
      recursos: [
        "Categorização básica de gastos",
        "Dashboard financeiro mensal",
        "Até 2 cartões cadastrados",
        "Lembretes de contas fixas",
      ],
      destaque: false,
      cta: "Plano Atual",
    },
    {
      id: "premium",
      nome: "Plano Premium",
      preco: "R$ 30",
      periodo: "/mês",
      descricao: "Completo para quem busca inteligência artificial e planejamento financeiro avançado.",
      recursos: [
        "Consultoria financeira com IA",
        "Análise dos seus gastos",
        "Recomendações personalizadas",
        "Planejamento financeiro avançado",
        "Metas personalizadas",
      ],
      destaque: true,
      cta: "Assinar Plano Premium",
    },
    {
      id: "complementar",
      nome: "Complementar",
      preco: "R$ 15",
      periodo: "/mês",
      descricao: "Um adicional para quem precisa organizar a parte contábil e ir além dos números.",
      recursos: [
        "Upload e organização de documentos",
        "Serviços e documentos contábeis",
        "Análises financeiras avançadas",
      ],
      destaque: false,
      cta: "Adicionar Complementar",
    },
  ];

  export const mockLembretes = [
    { id: 1, titulo: "Aluguel", valor: 1200.00, vencimento: "2026-09-10", pago: false, recorrente: true },
    { id: 2, titulo: "Fatura do Cartão de Crédito", valor: 890.00, vencimento: "2026-09-15", pago: false, recorrente: true },
    { id: 3, titulo: "Internet", valor: 99.90, vencimento: "2026-09-08", pago: true, recorrente: true },
    { id: 4, titulo: "Seguro do Carro", valor: 210.00, vencimento: "2026-09-20", pago: false, recorrente: false },
  ];

  export const mockMetas = [
    { id: 1, nome: "Viagem para a praia", valorAlvo: 5000.00, valorAtual: 2100.00, prazo: "2026-12-20" },
    { id: 2, nome: "Reserva de emergência", valorAlvo: 10000.00, valorAtual: 6800.00, prazo: "2027-03-01" },
    { id: 3, nome: "Notebook novo", valorAlvo: 4500.00, valorAtual: 900.00, prazo: "2026-11-15" },
  ];