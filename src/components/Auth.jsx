import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';
import Kicker from './Kicker';
import { gradienteFundoEscuro } from '../theme';
import './AuthHero.css';

const LINKS_NAV = ['Home', 'Quem Somos', 'Contato', 'Registrar como Contador'];

export default function Auth({ onLogin, modoEscuro = false }) {
  const [tipo, setTipo] = useState('cliente');

  const corTexto = modoEscuro ? 'text-slate-100' : 'text-[#1B0F3A]';
  const corTextoSuave = modoEscuro ? 'text-slate-400' : 'text-slate-500';
  const corCard = modoEscuro ? 'bg-slate-900/70 border-slate-800' : 'bg-white/70 border-white';
  const corInput = modoEscuro
    ? 'bg-slate-950/60 border-slate-800 text-slate-100'
    : 'bg-white/80 border-[#E6DBFB] text-[#1B0F3A]';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${corTexto} ${!modoEscuro ? 'fintar-page-bg' : ''}`}
      style={{ background: modoEscuro ? gradienteFundoEscuro : undefined }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Contta+" className="w-9 h-9 rounded-md object-contain flex-shrink-0" />
          <h1 className="text-base font-bold tracking-tight leading-none">
            Con<span style={{ color: '#7C3AED' }}>tta+</span>
          </h1>
        </div>
        <nav className={`hidden md:flex items-center gap-8 text-xs font-semibold ${corTextoSuave}`}>
          {LINKS_NAV.map((item) => (
            <a key={item} href="#" className="hover:opacity-70 transition">
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Conteúdo principal — inspirado na landing de referência: texto + orbe à direita */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 sm:px-10 lg:px-16 py-6">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Kicker color="#7C3AED" className="mb-4">Gestão Financeira Inteligente</Kicker>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Veja todo o seu dinheiro antes do próximo passo.
          </h2>
          <p className={`text-sm mb-8 ${corTextoSuave}`}>
            Acompanhe gastos, lembretes e metas em um só lugar, com clareza e simplicidade.
          </p>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-sm ${corCard}`}>
            <div className={`flex gap-6 mb-6 border-b ${modoEscuro ? 'border-slate-800' : 'border-[#E6DBFB]'}`}>
              <button
                type="button"
                onClick={() => setTipo('cliente')}
                className={`pb-3 text-xs font-bold transition border-b-2 -mb-px ${
                  tipo === 'cliente' ? `${corTexto} border-[#7C3AED]` : `${corTextoSuave} border-transparent hover:opacity-70`
                }`}
              >
                Pessoa Física
              </button>
              <button
                type="button"
                onClick={() => setTipo('contador')}
                className={`pb-3 text-xs font-bold transition border-b-2 -mb-px ${
                  tipo === 'contador' ? `${corTexto} border-[#7C3AED]` : `${corTextoSuave} border-transparent hover:opacity-70`
                }`}
              >
                Contador
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onLogin(tipo); }} className="space-y-4">
              <div className="space-y-1">
                <label className={`text-xs ${corTextoSuave}`}>E-mail</label>
                <div className={`flex items-center gap-2 border rounded-full px-4 py-2.5 text-xs focus-within:border-[#7C3AED] transition ${corInput}`}>
                  <Mail size={16} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="email"
                    defaultValue={tipo === 'cliente' ? 'beatriz@email.com' : 'contador@email.com'}
                    key={tipo}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs ${corTextoSuave}`}>Senha</label>
                <div className={`flex items-center gap-2 border rounded-full px-4 py-2.5 text-xs focus-within:border-[#7C3AED] transition ${corInput}`}>
                  <Lock size={16} className="text-slate-400 flex-shrink-0" />
                  <input type="password" defaultValue="123456" className="bg-transparent outline-none w-full" />
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#7C3AED' }}
                className="w-full text-white font-bold text-xs py-3.5 rounded-full transition flex items-center justify-center gap-2 hover:opacity-90"
              >
                Entrar no Sistema <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div className={`flex items-center gap-1.5 mt-5 text-[10px] ${corTextoSuave}`}>
            <ShieldCheck size={13} className="text-emerald-500" />
            Seus dados são protegidos com criptografia de ponta a ponta
          </div>
        </div>

        {/* Arte 3D da referência: cruz com o "C", pedestal em degraus e névoa */}
        <div className="hidden lg:flex items-center justify-end relative h-full min-h-[460px]">
          <div className="fintar-hero-art">
            <div className="pedestal">
              <div className="tier" />
              <div className="tier" />
              <div className="tier" />
              <div className="tier" />
              <div className="tier" />
            </div>

            <div className="cross">
              <div className="cross__halo" />
              <div className="cross__rim" />
              <div className="cross__body" />
              <div className="cross__mark"><span /></div>
            </div>

            <div className="cloud cloud--left" />
            <div className="cloud cloud--right" />
            <div className="cloud cloud--base" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 py-6 border-t text-[11px] ${corTextoSuave} ${modoEscuro ? 'border-slate-800' : 'border-[#E6DBFB]'}`}>
        <span>© {new Date().getFullYear()} Contta+. Todos os direitos reservados.</span>
        <nav className="flex items-center gap-6 font-semibold">
          {LINKS_NAV.map((item) => (
            <a key={item} href="#" className="hover:opacity-70 transition">
              {item}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
