import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, LogOut, Sun, Moon, CheckCircle2, CalendarDays, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import ClienteCard from './ClienteCard';
import ClienteDetalhe from './ClienteDetalhe';
import AbaAdicionarCliente from './AbaAdicionarCliente';
import AbaAgendaContador from './AbaAgendaContador';
import { mockContadorLogado, mockClientesContador, mockPlanosContador } from '../data/mockContador';
import { gradienteFundoClaro, gradienteFundoEscuro } from '../theme';

function iniciais(nome) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function ContadorApp({ onLogout, modoEscuro, setModoEscuro }) {
  const [aba, setAba] = useState('clientes');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const primaryColor = modoEscuro ? '#A78BFA' : '#7C3AED';

  const menus = [
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: CalendarDays },
    { id: 'adicionar', label: 'Adicionar Cliente', icon: UserPlus },
    { id: 'planos', label: 'Planos', icon: ShieldCheck },
  ];

  const handleNavegar = (id) => {
    setAba(id);
    setClienteSelecionado(null);
    setMenuAberto(false);
  };

  return (
    <div
      className={`h-screen flex overflow-hidden transition-colors duration-300 ${modoEscuro ? 'text-slate-100' : 'text-slate-800'}`}
      style={{ background: modoEscuro ? gradienteFundoEscuro : gradienteFundoClaro }}
    >
      {menuAberto && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMenuAberto(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 h-full flex-shrink-0 flex flex-col backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
        menuAberto ? 'translate-x-0' : '-translate-x-full'
      } ${modoEscuro ? 'bg-slate-950/70 text-slate-300' : 'bg-white/60 text-slate-600'}`}>
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Contta+" className="w-9 h-9 object-contain" />
            <span className={`font-bold text-lg tracking-wide ${modoEscuro ? 'text-white' : 'text-slate-900'}`}>
              Con<span style={{ color: primaryColor }}>tta+</span>
            </span>
          </div>
          <button type="button" onClick={() => setMenuAberto(false)} className="lg:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 pt-2 flex flex-col gap-0.5 overflow-y-auto">
          <p className={`px-4 pb-2 text-[10px] font-bold uppercase tracking-widest ${modoEscuro ? 'text-slate-600' : 'text-slate-400'}`}>
            Menu Principal
          </p>
          {menus.map((item) => {
            const Icon = item.icon;
            const ativo = aba === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavegar(item.id)}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                  ativo
                    ? `font-semibold ${modoEscuro ? 'text-white' : 'text-slate-900'}`
                    : `font-medium ${modoEscuro ? 'text-slate-500 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`
                }`}
              >
                {ativo && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] rounded-full"
                    style={{ background: `linear-gradient(to bottom, transparent, ${primaryColor}, transparent)` }}
                  />
                )}
                <Icon size={17} strokeWidth={ativo ? 2.25 : 1.75} style={{ color: ativo ? primaryColor : undefined }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-3">
          <div className={`flex items-center gap-2 px-2 text-[10px] font-medium ${modoEscuro ? 'text-slate-500' : 'text-slate-400'}`}>
            <ShieldCheck size={13} className="text-emerald-500" />
            Ambiente seguro e criptografado
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 text-sm font-medium transition">
            <LogOut size={18} /> Sair da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-0 min-w-0">
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
              {clienteSelecionado ? clienteSelecionado.nome : aba}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline text-xs font-semibold text-slate-400">
              {modoEscuro ? 'Escuro' : 'Claro'}
            </span>
            <button
              onClick={() => setModoEscuro(!modoEscuro)}
              className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 border flex items-center justify-between outline-none ${
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
              {iniciais(mockContadorLogado.nome)}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto min-h-0">
          {aba === 'clientes' && !clienteSelecionado && (
            <div className="space-y-6">
              <div>
                <h1 className="text-lg font-bold">Seus Clientes</h1>
                <p className="text-xs text-slate-400 mt-1">Clique em um cliente para ver todas as informações financeiras dele.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockClientesContador.map((cliente) => (
                  <ClienteCard
                    key={cliente.id}
                    cliente={cliente}
                    onClick={() => setClienteSelecionado(cliente)}
                    modoEscuro={modoEscuro}
                    primaryColor={primaryColor}
                  />
                ))}
              </div>
            </div>
          )}

          {aba === 'clientes' && clienteSelecionado && (
            <ClienteDetalhe
              cliente={clienteSelecionado}
              onVoltar={() => setClienteSelecionado(null)}
              modoEscuro={modoEscuro}
              primaryColor={primaryColor}
            />
          )}

          {aba === 'agenda' && (
            <AbaAgendaContador modoEscuro={modoEscuro} primaryColor={primaryColor} />
          )}

          {aba === 'adicionar' && (
            <AbaAdicionarCliente modoEscuro={modoEscuro} primaryColor={primaryColor} />
          )}

          {aba === 'planos' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Escolha o plano ideal para sua carteira</h1>
                <p className="text-xs text-slate-400">Quanto mais clientes você acompanha, mais recursos você libera.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mockPlanosContador.map((plano) => (
                  <div
                    key={plano.id}
                    className={`p-6 sm:p-8 rounded-md border flex flex-col justify-between relative transition-all ${
                      plano.destaque
                        ? modoEscuro
                          ? 'bg-slate-900 border-[#A78BFA]'
                          : 'bg-white border-[#7C3AED]'
                        : modoEscuro
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                    }`}
                  >
                    {plano.destaque && (
                      <span
                        style={{ backgroundColor: primaryColor }}
                        className="absolute -top-3 right-8 text-white font-bold text-[10px] px-3 py-1 rounded-sm uppercase tracking-wider"
                      >
                        Mais Popular
                      </span>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">{plano.nome}</h3>
                      <p className="text-xs text-slate-400">{plano.descricao}</p>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold">{plano.preco}</span>
                        <span className="text-xs text-slate-400">{plano.periodo}</span>
                      </div>

                      <hr className={modoEscuro ? 'border-slate-800' : 'border-slate-100'} />

                      <ul className="space-y-3 text-xs">
                        {plano.recursos.map((rec, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 size={16} style={{ color: primaryColor }} />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      style={{
                        backgroundColor: plano.destaque ? primaryColor : 'transparent',
                        borderColor: primaryColor,
                        color: plano.destaque ? '#ffffff' : primaryColor,
                      }}
                      className="mt-8 w-full font-bold text-xs py-3 rounded-md border transition hover:opacity-90"
                    >
                      {plano.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
