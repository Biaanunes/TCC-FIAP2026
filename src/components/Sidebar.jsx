import React from 'react';
import { LayoutDashboard, Receipt, Bot, ShieldCheck, LogOut, Bell, Target, CalendarDays, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Sidebar({ abaAtiva, setAbaAtiva, setLogado, modoEscuro, aberto, onFechar }) {
  const primaryColor = modoEscuro ? '#A78BFA' : '#7C3AED';

  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gastos', label: 'Gastos', icon: Receipt },
    { id: 'lembretes', label: 'Lembretes', icon: Bell },
    { id: 'calendario', label: 'Calendário', icon: CalendarDays },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'ia', label: 'IA Financeira', icon: Bot },
  ];

  const handleNavegar = (id) => {
    setAbaAtiva(id);
    onFechar?.();
  };

  return (
    <>
      {/* Fundo escurecido atrás do menu no mobile — clicar nele fecha o menu */}
      {aberto && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onFechar} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 h-full flex-shrink-0 flex flex-col backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
        aberto ? 'translate-x-0' : '-translate-x-full'
      } ${modoEscuro ? 'bg-slate-950/70 text-slate-300' : 'bg-white/60 text-slate-600'}`}>
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Contta+" className="w-9 h-9 object-contain" />
            <span className={`font-bold text-lg tracking-tight ${modoEscuro ? 'text-white' : 'text-slate-900'}`}>
              Con<span style={{ color: primaryColor }}>tta+</span>
            </span>
          </div>
          <button type="button" onClick={onFechar} className="lg:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 pt-2 flex flex-col gap-0.5 overflow-y-auto">
          <p className={`px-4 pb-2 text-[10px] font-bold uppercase tracking-widest ${modoEscuro ? 'text-slate-600' : 'text-slate-400'}`}>
            Menu Principal
          </p>
          {menus.map((item) => {
            const Icon = item.icon;
            const ativo = abaAtiva === item.id;
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
          <div className={`flex items-center gap-1.5 px-1 font-mono text-[9px] uppercase tracking-widest ${modoEscuro ? 'text-slate-600' : 'text-slate-400'}`}>
            <ShieldCheck size={12} className="text-emerald-500" />
            Ambiente seguro
          </div>
          <button onClick={() => setLogado(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-400 text-sm font-medium transition">
            <LogOut size={17} strokeWidth={1.75} /> Sair da Conta
          </button>
        </div>
      </aside>
    </>
  );
}
