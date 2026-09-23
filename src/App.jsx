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
import { gradienteFundoClaro, gradienteFundoEscuro } from './theme';
import {
  mockUsuarioCliente,
  mockCategoriasGastos,
  mockGastosIniciais,
  mockLembretes,
  mockMetas,
} from './data/mockData';
import {
  Sun, Moon, Plus, QrCode, Wallet, Receipt, TrendingUp, ArrowRight, Menu, RefreshCcw,
  Pencil, Printer, Settings,
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
    <div
      className={`h-screen flex overflow-hidden transition-colors duration-300 ${modoEscuro ? 'text-slate-100' : 'text-slate-800'}`}
      style={{ background: modoEscuro ? gradienteFundoEscuro : gradienteFundoClaro }}
    >
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
        {/* Topbar transparente — deixa o degradê da página aparecer por trás */}
        <header className={`h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${modoEscuro ? 'bg-slate-900 border-b border-slate-800' : ''}`}>
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
              {/* Cabeçalho de boas-vindas */}
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${modoEscuro ? 'text-white' : 'text-slate-900'}`}>
                  Olá,{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      backgroundImage: modoEscuro
                        ? 'linear-gradient(90deg, #C4B5FD 0%, #7C3AED 100%)'
                        : 'linear-gradient(90deg, #7C3AED 0%, #3B1E77 100%)',
                    }}
                  >
                    {mockUsuarioCliente.nome.split(' ')[0]}
                  </span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">Aqui está um retrato de como sua vida financeira está hoje.</p>
              </div>

              {/* Faixa de indicadores — pílula única, como no dashboard de referência */}
              <div className={`flex flex-wrap items-center gap-x-10 gap-y-4 px-6 sm:px-8 py-5 rounded-[28px] shadow-sm ${modoEscuro ? 'bg-slate-900/80' : 'bg-white/80'}`}>
                {[
                  { label: 'Saldo Atual', valor: mockUsuarioCliente.saldo, icon: Wallet, cor: primaryColor },
                  { label: 'Gastos do Mês', valor: mockUsuarioCliente.gastosMes, icon: Receipt, cor: '#F43F5E' },
                  { label: 'Investimentos', valor: mockUsuarioCliente.investimentosTotal, icon: TrendingUp, cor: '#10B981' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.cor}1a` }}>
                      <item.icon size={19} style={{ color: item.cor }} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-lg font-bold font-mono">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
                {/* Coluna principal */}
                <div className="space-y-6">
                  <div className={`p-5 sm:p-6 lg:p-8 rounded-[28px] shadow-sm ${modoEscuro ? 'bg-slate-900/80' : 'bg-white/80'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-base font-bold">Visão Geral Financeira</h3>
                        <p className="text-xs text-slate-500 mt-1">Para onde seu dinheiro está indo este mês.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-center">
                      <GraficoPizza dados={mockCategoriasGastos} modoEscuro={modoEscuro} />

                      <div className={`w-full rounded-2xl p-5 ${modoEscuro ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-sm">Seus Objetivos</h4>
                          <button type="button" onClick={() => setAbaAtiva('metas')} className="text-slate-400 hover:text-slate-600">
                            <ArrowRight size={14} />
                          </button>
                        </div>
                        <div className="space-y-4">
                          {listaMetas.slice(0, 4).map((meta, idx) => {
                            const progresso = Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
                            return (
                              <div key={meta.id} className="flex items-center gap-3">
                                <span
                                  className="relative w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  {idx + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold truncate">{meta.nome}</p>
                                  <p className="text-[10px] text-slate-400">{progresso.toFixed(0)}% concluído</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna lateral */}
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setAbaAtiva('lembretes')}
                    className="w-full text-left bg-slate-950 rounded-[28px] p-6 text-white relative overflow-hidden"
                  >
                    <h4 className="text-lg font-bold mb-4">Próximos Lembretes</h4>
                    <div className="space-y-4">
                      {listaLembretes
                        .filter((l) => !l.pago)
                        .sort((a, b) => a.vencimento.localeCompare(b.vencimento))
                        .slice(0, 3)
                        .map((lembrete) => (
                          <div key={lembrete.id} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">{lembrete.titulo}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {new Date(lembrete.vencimento + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      {listaLembretes.filter((l) => !l.pago).length === 0 && (
                        <p className="text-xs text-slate-400">Nenhum lembrete pendente.</p>
                      )}
                    </div>
                  </button>

                  <div className={`p-6 rounded-[28px] shadow-sm ${modoEscuro ? 'bg-slate-900/80' : 'bg-white/80'}`}>
                    <h4 className="text-base font-bold mb-4">Distribuição de Gastos</h4>
                    <div className="space-y-3">
                      {mockCategoriasGastos.map((cat) => (
                        <div key={cat.nome} className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{cat.nome}</p>
                            <p className="text-[10px] text-slate-400 font-mono">R$ {cat.valor.toFixed(2)}</p>
                          </div>
                          <div className={`w-20 h-8 rounded-full flex items-center justify-end px-2.5 flex-shrink-0 ${modoEscuro ? 'bg-slate-950/60' : 'bg-slate-50'}`} style={{ color: cat.cor }}>
                            <span className="text-xs font-bold font-mono">{cat.porcentagem}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA GASTOS */}
          {abaAtiva === 'gastos' && (
            <div className="space-y-8">
              {/* Form de Cadastro de Gasto */}
              <div className={`p-6 rounded-2xl shadow-sm ${modoEscuro ? 'bg-slate-900/80' : 'bg-white/80'}`}>
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
              <div className={`p-6 rounded-2xl shadow-sm ${modoEscuro ? 'bg-slate-900/80' : 'bg-white/80'}`}>
                <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="text-base font-bold">Histórico de Gastos Cadastrados</h3>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      type="button"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                      className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-md border hover:opacity-80 transition"
                    >
                      <RefreshCcw size={14} /> Cadastrar seu extrato automático
                    </button>
                    <div className={`flex items-center gap-1 ${modoEscuro ? 'text-slate-500' : 'text-slate-400'}`}>
                      <button type="button" className="p-2 rounded-md hover:opacity-70 transition" style={{ color: primaryColor }}>
                        <Pencil size={15} />
                      </button>
                      <button type="button" className="p-2 rounded-md hover:opacity-70 transition" style={{ color: primaryColor }}>
                        <Printer size={15} />
                      </button>
                      <button type="button" className="p-2 rounded-md hover:opacity-70 transition" style={{ color: primaryColor }}>
                        <Settings size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cabeçalho de colunas — some em telas estreitas */}
                <div className={`hidden sm:grid grid-cols-[2fr_1.2fr_1fr_1fr] gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400`}>
                  <span>Descrição</span>
                  <span>Categoria</span>
                  <span>Data</span>
                  <span className="text-right">Valor</span>
                </div>

                <div className="space-y-2">
                  {listaGastos.slice(0, 8).map((gasto) => (
                    <div
                      key={gasto.id}
                      className={`grid grid-cols-1 sm:grid-cols-[2fr_1.2fr_1fr_1fr] gap-1 sm:gap-3 items-center p-4 rounded-xl transition ${
                        modoEscuro ? 'bg-slate-950/60 hover:bg-slate-950' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <p className="font-semibold text-xs">{gasto.descricao}</p>
                      <span className="text-[11px] text-slate-400">{gasto.categoria}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(gasto.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </span>
                      <span className="font-bold text-xs text-rose-500 font-mono sm:text-right">
                        - R$ {gasto.valor.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {listaGastos.length > 8 && (
                  <div className="flex justify-end mt-4">
                    <button type="button" className="text-xs font-bold hover:underline" style={{ color: primaryColor }}>
                      Mostrar mais...
                    </button>
                  </div>
                )}
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
