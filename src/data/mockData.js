export const mockUsuarioCliente = {
    nome: "Beatriz Nunes",
    saldo: 14850.00,
    gastosMes: 3215.00,
    investimentosTotal: 28400.00,
  };

  export const mockCategoriasGastos = [
    { nome: "Gastos Fixos", valor: 1610.00, cor: "#3B1E77", porcentagem: 50 },
    { nome: "Alimentação & Mercado", valor: 945.00, cor: "#7C3AED", porcentagem: 29 },
    { nome: "Desejos & Lazer", valor: 290.00, cor: "#A78BFA", porcentagem: 9 },
    { nome: "Emergências & Saúde", valor: 370.00, cor: "#D9CCFB", porcentagem: 12 },
  ];

  export const mockGastosIniciais = [
    { id: 1, descricao: "Conta de Luz", categoria: "Gastos Fixos", valor: 210.00, data: "2026-09-23", tipo: "fixo" },
    { id: 2, descricao: "Uber", categoria: "Desejos & Lazer", valor: 45.00, data: "2026-09-22", tipo: "variavel" },
    { id: 3, descricao: "Supermercado Semanal", categoria: "Alimentação & Mercado", valor: 410.00, data: "2026-09-21", tipo: "variavel" },
    { id: 4, descricao: "Consulta Médica", categoria: "Emergências & Saúde", valor: 250.00, data: "2026-09-20", tipo: "variavel" },
    { id: 5, descricao: "Cinema com Amigos", categoria: "Desejos & Lazer", valor: 65.00, data: "2026-09-18", tipo: "variavel" },
    { id: 6, descricao: "Jantar Restaurante", categoria: "Desejos & Lazer", valor: 180.00, data: "2026-09-16", tipo: "variavel" },
    { id: 7, descricao: "Farmácia - Medicamentos", categoria: "Emergências & Saúde", valor: 120.00, data: "2026-09-14", tipo: "variavel" },
    { id: 8, descricao: "iFood", categoria: "Alimentação & Mercado", valor: 85.00, data: "2026-09-12", tipo: "variavel" },
    { id: 9, descricao: "Supermercado Semanal", categoria: "Alimentação & Mercado", valor: 450.00, data: "2026-09-07", tipo: "variavel" },
    { id: 10, descricao: "Academia", categoria: "Gastos Fixos", valor: 130.00, data: "2026-09-05", tipo: "fixo" },
    { id: 11, descricao: "Assinatura Netflix & Spotify", categoria: "Gastos Fixos", valor: 70.00, data: "2026-09-03", tipo: "fixo" },
    { id: 12, descricao: "Aluguel", categoria: "Gastos Fixos", valor: 1200.00, data: "2026-09-02", tipo: "fixo" },
    { id: 13, descricao: "Internet Fibra", categoria: "Gastos Fixos", valor: 120.00, data: "2026-09-01", tipo: "fixo" },
    { id: 14, descricao: "Plano de Saúde", categoria: "Gastos Fixos", valor: 350.00, data: "2026-09-01", tipo: "fixo" },
    { id: 15, descricao: "Gasolina", categoria: "Transporte", valor: 180.00, data: "2026-08-30", tipo: "variavel" },
    { id: 16, descricao: "Curso de Inglês", categoria: "Educação", valor: 220.00, data: "2026-08-28", tipo: "fixo" },
    { id: 17, descricao: "Padaria", categoria: "Alimentação & Mercado", valor: 32.50, data: "2026-08-27", tipo: "variavel" },
    { id: 18, descricao: "Ingresso Show", categoria: "Desejos & Lazer", valor: 150.00, data: "2026-08-25", tipo: "variavel" },
    { id: 19, descricao: "Manutenção Carro", categoria: "Transporte", valor: 380.00, data: "2026-08-24", tipo: "variavel" },
    { id: 20, descricao: "Ração do Pet", categoria: "Outros Gastos", valor: 110.00, data: "2026-08-22", tipo: "variavel" },
    { id: 21, descricao: "Supermercado Semanal", categoria: "Alimentação & Mercado", valor: 425.00, data: "2026-08-21", tipo: "variavel" },
    { id: 22, descricao: "Corte de Cabelo", categoria: "Cuidados Pessoais", valor: 60.00, data: "2026-08-19", tipo: "variavel" },
    { id: 23, descricao: "Recarga Celular", categoria: "Gastos Fixos", valor: 40.00, data: "2026-08-18", tipo: "fixo" },
    { id: 24, descricao: "Feira de Frutas e Verduras", categoria: "Alimentação & Mercado", valor: 75.00, data: "2026-08-16", tipo: "variavel" },
    { id: 25, descricao: "Livro Técnico", categoria: "Educação", valor: 89.90, data: "2026-08-15", tipo: "variavel" },
    { id: 26, descricao: "Presente Aniversário", categoria: "Desejos & Lazer", valor: 120.00, data: "2026-08-12", tipo: "variavel" },
    { id: 27, descricao: "iFood", categoria: "Alimentação & Mercado", valor: 62.00, data: "2026-08-10", tipo: "variavel" },
    { id: 28, descricao: "Conta de Água", categoria: "Gastos Fixos", valor: 85.00, data: "2026-08-08", tipo: "fixo" },
    { id: 29, descricao: "Lava Rápido", categoria: "Transporte", valor: 50.00, data: "2026-08-05", tipo: "variavel" },
    { id: 30, descricao: "Farmácia - Vitaminas", categoria: "Emergências & Saúde", valor: 95.00, data: "2026-08-04", tipo: "variavel" },
    { id: 31, descricao: "Uber", categoria: "Desejos & Lazer", valor: 38.00, data: "2026-08-03", tipo: "variavel" },
    { id: 32, descricao: "Material de Escritório", categoria: "Outros Gastos", valor: 48.00, data: "2026-08-01", tipo: "variavel" },
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
    { id: 1, titulo: "Fatura do Cartão de Crédito", valor: 890.00, vencimento: "2026-09-18", pago: false, recorrente: true },
    { id: 2, titulo: "Seguro do Carro", valor: 210.00, vencimento: "2026-09-20", pago: false, recorrente: false },
    { id: 3, titulo: "Mensalidade da Academia", valor: 130.00, vencimento: "2026-09-23", pago: false, recorrente: true },
    { id: 4, titulo: "Aluguel", valor: 1200.00, vencimento: "2026-09-25", pago: false, recorrente: true },
    { id: 5, titulo: "Internet", valor: 99.90, vencimento: "2026-09-28", pago: false, recorrente: true },
    { id: 6, titulo: "Plano de Saúde", valor: 340.00, vencimento: "2026-10-05", pago: false, recorrente: true },
    { id: 7, titulo: "IPVA", valor: 620.00, vencimento: "2026-10-15", pago: false, recorrente: false },
    { id: 8, titulo: "Conta de Água", valor: 95.00, vencimento: "2026-09-12", pago: true, recorrente: true },
    { id: 9, titulo: "Conta de Luz", valor: 210.00, vencimento: "2026-09-10", pago: true, recorrente: true },
  ];

  export const mockMetas = [
    { id: 1, nome: "Viagem para a praia", valorAlvo: 5000.00, valorAtual: 2100.00, prazo: "2026-12-20" },
    { id: 2, nome: "Reserva de emergência", valorAlvo: 10000.00, valorAtual: 6800.00, prazo: "2027-03-01" },
    { id: 3, nome: "Notebook novo", valorAlvo: 4500.00, valorAtual: 900.00, prazo: "2026-11-15" },
  ];