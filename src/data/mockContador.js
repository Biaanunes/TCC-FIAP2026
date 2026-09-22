export const mockContadorLogado = {
  nome: "Rafael Andrade",
  email: "contador@email.com",
};

export const mockClientesContador = [
  {
    id: 1,
    nome: "Carlos Eduardo Silva",
    email: "carlos.silva@email.com",
    saldo: 8200.00,
    gastosMes: 2450.00,
    investimentosTotal: 15300.00,
    categorias: [
      { nome: "Gastos Fixos", valor: 1100.00, cor: "#4C1D95", porcentagem: 45 },
      { nome: "Alimentação & Mercado", valor: 660.00, cor: "#7C3AED", porcentagem: 27 },
      { nome: "Desejos & Lazer", valor: 390.00, cor: "#A78BFA", porcentagem: 16 },
      { nome: "Emergências & Saúde", valor: 300.00, cor: "#C4B5FD", porcentagem: 12 },
    ],
    metas: [
      { id: 1, nome: "Reserva de emergência", valorAlvo: 10000.00, valorAtual: 4200.00, prazo: "2027-02-01" },
      { id: 2, nome: "Troca de notebook", valorAlvo: 3500.00, valorAtual: 3150.00, prazo: "2026-10-30" },
    ],
    ultimosGastos: [
      { id: 1, descricao: "Aluguel", categoria: "Gastos Fixos", valor: 950.00, data: "2026-09-02" },
      { id: 2, descricao: "Supermercado", categoria: "Alimentação & Mercado", valor: 380.00, data: "2026-09-04" },
      { id: 3, descricao: "Academia", categoria: "Desejos & Lazer", valor: 120.00, data: "2026-09-06" },
    ],
  },
  {
    id: 2,
    nome: "Fernanda Costa Almeida",
    email: "fernanda.almeida@email.com",
    saldo: 22400.00,
    gastosMes: 4180.00,
    investimentosTotal: 41200.00,
    categorias: [
      { nome: "Gastos Fixos", valor: 1900.00, cor: "#4C1D95", porcentagem: 45 },
      { nome: "Alimentação & Mercado", valor: 1050.00, cor: "#7C3AED", porcentagem: 25 },
      { nome: "Desejos & Lazer", valor: 830.00, cor: "#A78BFA", porcentagem: 20 },
      { nome: "Emergências & Saúde", valor: 400.00, cor: "#C4B5FD", porcentagem: 10 },
    ],
    metas: [
      { id: 1, nome: "Entrada do apartamento", valorAlvo: 60000.00, valorAtual: 38400.00, prazo: "2027-06-01" },
      { id: 2, nome: "Viagem para a Europa", valorAlvo: 15000.00, valorAtual: 6200.00, prazo: "2027-01-15" },
    ],
    ultimosGastos: [
      { id: 1, descricao: "Condomínio", categoria: "Gastos Fixos", valor: 780.00, data: "2026-09-01" },
      { id: 2, descricao: "Restaurante", categoria: "Desejos & Lazer", valor: 260.00, data: "2026-09-05" },
      { id: 3, descricao: "Farmácia", categoria: "Emergências & Saúde", valor: 95.00, data: "2026-09-07" },
    ],
  },
  {
    id: 3,
    nome: "Ricardo Souza Martins",
    email: "ricardo.martins@email.com",
    saldo: 5100.00,
    gastosMes: 3020.00,
    investimentosTotal: 6800.00,
    categorias: [
      { nome: "Gastos Fixos", valor: 1550.00, cor: "#4C1D95", porcentagem: 51 },
      { nome: "Alimentação & Mercado", valor: 720.00, cor: "#7C3AED", porcentagem: 24 },
      { nome: "Desejos & Lazer", valor: 450.00, cor: "#A78BFA", porcentagem: 15 },
      { nome: "Emergências & Saúde", valor: 300.00, cor: "#C4B5FD", porcentagem: 10 },
    ],
    metas: [
      { id: 1, nome: "Quitar o financiamento do carro", valorAlvo: 18000.00, valorAtual: 5400.00, prazo: "2028-04-01" },
    ],
    ultimosGastos: [
      { id: 1, descricao: "Financiamento do carro", categoria: "Gastos Fixos", valor: 890.00, data: "2026-09-03" },
      { id: 2, descricao: "Mercado", categoria: "Alimentação & Mercado", valor: 310.00, data: "2026-09-06" },
      { id: 3, descricao: "Cinema", categoria: "Desejos & Lazer", valor: 80.00, data: "2026-09-08" },
    ],
  },
];

export const mockPlanosContador = [
  {
    id: "gratis",
    nome: "Gratuito",
    preco: "R$ 0",
    periodo: "/mês",
    descricao: "Ideal para começar a acompanhar seus primeiros clientes.",
    recursos: [
      "Até 2 clientes",
      "Visão geral financeira de cada cliente",
      "Suporte por e-mail",
    ],
    destaque: false,
    cta: "Plano Atual",
  },
  {
    id: "pago",
    nome: "Profissional",
    preco: "R$ 50",
    periodo: "/mês",
    descricao: "Para contadores com uma carteira de clientes em crescimento.",
    recursos: [
      "+5 clientes inclusos",
      "Relatórios detalhados por cliente",
      "Suporte prioritário",
    ],
    destaque: true,
    cta: "Assinar Profissional",
  },
  {
    id: "complementar",
    nome: "Complementar",
    preco: "R$ 15",
    periodo: "/mês por cliente",
    descricao: "Adicione clientes extras além do limite do seu plano atual.",
    recursos: [
      "R$ 15 por cliente adicional/mês",
      "Mesmos recursos do plano contratado",
      "Cobrança proporcional aos clientes ativos",
    ],
    destaque: false,
    cta: "Adicionar Cliente Extra",
  },
];
