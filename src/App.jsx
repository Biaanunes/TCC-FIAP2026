import React, { useState } from 'react';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import AbaLembretes from './components/AbaLembretes';
import AbaMetas from './components/AbaMetas';
import AbaIA from './components/AbaIA';
import AbaCalendario from './components/AbaCalendario';
import ScannerNotaFiscal from './components/ScannerNotaFiscal';
import NotificacaoToast from './components/NotificacaoToast';
import GraficoPizza from './components/GraficoPizza';
import BolhaIA from './components/BolhaIA';
import ContadorApp from './components/ContadorApp';
import IconSquare from './components/IconSquare';
import Kicker from './components/Kicker';
import {
  mockUsuarioCliente,
  mockCategoriasGastos,
  mockGastosIniciais,
  mockLembretes,
  mockMetas,
} from './data/mockData';
import {
  Sun, Moon, Plus, QrCode, Wallet, Receipt, TrendingUp, Target, Bell, ArrowRight, Menu,
} from 'lucide-react';

function iniciais(nome) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function App() {
  const [logado, setLogado] = useState(false);
  const [tipoConta, setTipoConta] = useState('cliente');
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [modoEscuro, setModoEscuro] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Estado dos gastos cadastrados
  const [listaGastos, setListaGastos] = useState(mockGastosIniciais);
  const [novoGasto, setNovoGasto] = useState({
    descricao: '',
    categoria: 'Gastos Fixos',
    valor: '',
    data: new Date().toISOString().split('T')[0]
  });

  // Estado dos lembretes de contas
  const [listaLembretes, setListaLembretes] = useState(mockLembretes);

  // Estado das metas financeiras
  const [listaMetas, setListaMetas] = useState(mockMetas);

  // Estado do scanner de nota fiscal (QR Code)
  const [mostrarScanner, setMostrarScanner] = useState(false);

  const primaryColor = modoEscuro ? '#A78BFA' : '#7C3AED';

  if (!logado) {
    return <Auth onLogin={(tipo) => { setLogado(true); setTipoConta(tipo); }} />;
  }

  if (tipoConta === 'contador') {
    return (
      <ContadorApp
        onLogout={() => setLogado(false)}
        modoEscuro={modoEscuro}
        setModoEscuro={setModoEscuro}
      />
    );
  }

  const handleAdicionarGasto = (e) => {
    e.preventDefault();
    if (!novoGasto.descricao || !novoGasto.valor) return;

    const item = {
      id: Date.now(),
      descricao: novoGasto.descricao,
      categoria: novoGasto.categoria,
      valor: parseFloat(novoGasto.valor),
      data: novoGasto.data
    };

    setListaGastos([item, ...listaGastos]);
    setNovoGasto({
      descricao: '',
      categoria: 'Gastos Fixos',
      valor: '',
      data: new Date().toISOString().split('T')[0]
    });
  };

  const handleAdicionarLembrete = (lembrete) => {
    setListaLembretes([lembrete, ...listaLembretes]);
  };

  const handleTogglePago = (id) => {
    setListaLembretes(listaLembretes.map((l) => l.id === id ? { ...l, pago: !l.pago } : l));
  };

  const handleAdicionarMeta = (meta) => {
    setListaMetas([meta, ...listaMetas]);
  };

  const handleContribuirMeta = (id, valor) => {
    setListaMetas(listaMetas.map((m) => m.id === id ? { ...m, valorAtual: m.valorAtual + valor } : m));
  };

  const handleQRLido = (valor, _textoQr) => {
    setNovoGasto((prev) => ({
      ...prev,
      descricao: prev.descricao || 'Compra via Nota Fiscal',
      valor: valor !== null ? String(valor) : prev.valor,
    }));
    setMostrarScanner(false);
  };

  return (
    <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${modoEscuro ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <NotificacaoToast modoEscuro={modoEscuro} primaryColor={primaryColor} />

      <Sidebar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        setLogado={setLogado}
        modoEscuro={modoEscuro}
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
      />

      <main className="flex-1 flex flex-col min-h-0 min-w-0">
        {/* Topbar com Toggle Switch Ajustado */}
        <header className={`h-16 flex-shrink-0 border-b flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              className="lg:hidden flex-shrink-0 text-slate-400"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              {abaAtiva}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline text-xs font-semibold text-slate-400">
              {modoEscuro ? 'Escuro' : 'Claro'}
            </span>

            <button
              onClick={() => setModoEscuro(!modoEscuro)}
              className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 border flex items-center justify-between outline-none flex-shrink-0 ${
                modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-200 border-slate-300'
              }`}
            >
              <div
                className={`absolute top-1 bottom-1 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${
                  modoEscuro ? 'transform translate-x-8 bg-[#A78BFA]' : 'transform translate-x-0 bg-white'
                }`}
              />
              <div className="z-10 w-6 h-6 flex items-center justify-center">
                <Sun size={14} className={!modoEscuro ? 'text-amber-500' : 'text-slate-500'} />
              </div>
              <div className="z-10 w-6 h-6 flex items-center justify-center">
                <Moon size={14} className={modoEscuro ? 'text-slate-950' : 'text-slate-400'} />
              </div>
            </button>

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              {iniciais(mockUsuarioCliente.nome)}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 pb-20 sm:pb-6 lg:pb-8 flex-1 overflow-y-auto min-h-0">

          {/* ABA DASHBOARD */}
          {abaAtiva === 'dashboard' && (
            <div className="space-y-6">
              {/* Cabeçalho de boas-vindas: flat, sem gradiente ou brilho decorativo */}
              <div className="w-full border-l-2 pl-5 py-1" style={{ borderColor: primaryColor }}>
                <Kicker color={primaryColor}>Bem-vindo de volta</Kicker>
                <h1 className="text-2xl font-bold mt-1.5">{mockUsuarioCliente.nome}</h1>
                <p className="text-xs text-slate-400 mt-1">Aqui está um retrato de como sua vida financeira está hoje.</p>
              </div>

              {/* Painel principal: gráfico de gastos + indicadores */}
              <div className={`p-5 sm:p-6 lg:p-8 rounded-md border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="mb-6">
                  <h3 className="text-base font-bold">Visão Geral Financeira</h3>
                  <p className="text-xs text-slate-400 mt-1">Seu saldo, investimentos e para onde seu dinheiro está indo este mês.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-center">
                  <GraficoPizza dados={mockCategoriasGastos} modoEscuro={modoEscuro} />

                  <div className={`w-full divide-y ${modoEscuro ? 'divide-slate-800' : 'divide-slate-100'}`}>
                    <div className="flex items-center justify-between py-4 first:pt-0">
                      <div className="flex items-center gap-3">
                        <IconSquare icon={Wallet} color={primaryColor} />
                        <div>
                          <p className="text-xs text-slate-400">Saldo Atual</p>
                          <p className="text-lg font-bold font-mono">R$ {mockUsuarioCliente.saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <IconSquare icon={Receipt} color="#F43F5E" />
                        <div>
                          <p className="text-xs text-slate-400">Gastos do Mês</p>
                          <p className="text-lg font-bold text-rose-500 font-mono">R$ {mockUsuarioCliente.gastosMes.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-rose-500 border border-rose-500/30 px-2 py-1 rounded-sm">
                        {((mockUsuarioCliente.gastosMes / mockUsuarioCliente.saldo) * 100).toFixed(0)}% do saldo
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-4 last:pb-0">
                      <div className="flex items-center gap-3">
                        <IconSquare icon={TrendingUp} color="#10B981" />
                        <div>
                          <p className="text-xs text-slate-400">Investimentos</p>
                          <p className="text-lg font-bold text-emerald-500 font-mono">R$ {mockUsuarioCliente.investimentosTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded-sm">
                        {((mockUsuarioCliente.investimentosTotal / (mockUsuarioCliente.saldo + mockUsuarioCliente.investimentosTotal)) * 100).toFixed(0)}% do patrimônio
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Atalhos de lembrete: só consulta, edição fica nas próprias áreas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setAbaAtiva('metas')}
                  className={`text-left p-6 rounded-lg border transition hover:-translate-y-0.5 ${modoEscuro ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Target size={16} style={{ color: primaryColor }} /> Seus Objetivos
                    </h4>
                    <ArrowRight size={14} className="text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    {listaMetas.slice(0, 2).map((meta) => {
                      const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
                      return (
                        <div key={meta.id}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="font-semibold">{meta.nome}</span>
                            <span className="text-slate-400">{progresso.toFixed(0)}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${modoEscuro ? 'bg-slate-950' : 'bg-slate-100'}`}>
                            <div className="h-full rounded-full" style={{ width: `${progresso}%`, backgroundColor: primaryColor }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAbaAtiva('lembretes')}
                  className={`text-left p-6 rounded-lg border transition hover:-translate-y-0.5 ${modoEscuro ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Bell size={16} style={{ color: primaryColor }} /> Próximos Lembretes
                    </h4>
                    <ArrowRight size={14} className="text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {listaLembretes
                      .filter((l) => !l.pago)
                      .sort((a, b) => a.vencimento.localeCompare(b.vencimento))
                      .slice(0, 3)
                      .map((lembrete) => (
                        <div key={lembrete.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold truncate pr-2">{lembrete.titulo}</span>
                          <span className="text-slate-400 flex-shrink-0">
                            {new Date(lembrete.vencimento + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                      ))}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ABA GASTOS */}
          {abaAtiva === 'gastos' && (
            <div className="space-y-8">
              {/* Form de Cadastro de Gasto */}
              <div className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Plus size={18} style={{ color: primaryColor }} /> Cadastrar Novo Gasto
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMostrarScanner(true)}
                    style={{ borderColor: primaryColor, color: primaryColor }}
                    className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-md border hover:opacity-80 transition"
                  >
                    <QrCode size={14} /> Escanear Nota Fiscal
                  </button>
                </div>
                {mostrarScanner && (
                  <ScannerNotaFiscal
                    onFechar={() => setMostrarScanner(false)}
                    onLido={handleQRLido}
                    modoEscuro={modoEscuro}
                    primaryColor={primaryColor}
                  />
                )}
                <form onSubmit={handleAdicionarGasto} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Descrição (ex: Netflix, Mercado)"
                    value={novoGasto.descricao}
                    onChange={(e) => setNovoGasto({...novoGasto, descricao: e.target.value})}
                    className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <select
                    value={novoGasto.categoria}
                    onChange={(e) => setNovoGasto({...novoGasto, categoria: e.target.value})}
                    className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Gastos Fixos">Gastos Fixos (Assinaturas, Aluguel)</option>
                    <option value="Alimentação & Mercado">Alimentação & Mercado</option>
                    <option value="Desejos & Lazer">Desejos & Lazer</option>
                    <option value="Emergências & Saúde">Emergências & Saúde</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Valor (R$)"
                    value={novoGasto.valor}
                    onChange={(e) => setNovoGasto({...novoGasto, valor: e.target.value})}
                    className={`p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: primaryColor }}
                    className="text-white font-bold text-xs py-3 rounded-md hover:opacity-90 transition"
                  >
                    Adicionar Gasto
                  </button>
                </form>
              </div>

              {/* Tabela de Gastos */}
              <div className={`p-6 rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-base font-bold mb-4">Histórico de Gastos Cadastrados</h3>
                <div className="space-y-3">
                  {listaGastos.map((gasto) => (
                    <div
                      key={gasto.id}
                      className={`flex justify-between items-center p-4 rounded-md border transition ${
                        modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-xs">{gasto.descricao}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-sm border mt-1 inline-block ${modoEscuro ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-500'}`}>
                          {gasto.categoria}
                        </span>
                      </div>
                      <span className="font-bold text-xs text-rose-500 font-mono">
                        - R$ {gasto.valor.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA LEMBRETES */}
          {abaAtiva === 'lembretes' && (
            <AbaLembretes
              lembretes={listaLembretes}
              onAdicionar={handleAdicionarLembrete}
              onTogglePago={handleTogglePago}
              modoEscuro={modoEscuro}
              primaryColor={primaryColor}
            />
          )}

          {/* ABA CALENDÁRIO */}
          {abaAtiva === 'calendario' && (
            <AbaCalendario
              usuarioNome={mockUsuarioCliente.nome}
              modoEscuro={modoEscuro}
              primaryColor={primaryColor}
            />
          )}

          {/* ABA METAS */}
          {abaAtiva === 'metas' && (
            <AbaMetas
              metas={listaMetas}
              onAdicionar={handleAdicionarMeta}
              onContribuir={handleContribuirMeta}
              modoEscuro={modoEscuro}
              primaryColor={primaryColor}
            />
          )}

          {/* ABA IA FINANCEIRA */}
          {abaAtiva === 'ia' && (
            <AbaIA
              dadosFinanceiros={{ usuario: mockUsuarioCliente, categorias: mockCategoriasGastos, gastos: listaGastos }}
              modoEscuro={modoEscuro}
              primaryColor={primaryColor}
            />
          )}

        </div>
      </main>

      {abaAtiva !== 'ia' && (
        <BolhaIA onClick={() => setAbaAtiva('ia')} modoEscuro={modoEscuro} primaryColor={primaryColor} />
      )}
    </div>
  );
}
