import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';
import Kicker from './Kicker';

export default function Auth({ onLogin }) {
  const [tipo, setTipo] = useState('cliente');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Contta+" className="w-11 h-11 rounded-md object-contain flex-shrink-0" />
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">Con<span className="text-[#A78BFA]">tta+</span></h1>
            <Kicker color="#A78BFA" className="mt-1.5">Gestão Financeira</Kicker>
          </div>
        </div>

        <div className="border-t-2 border-[#7C3AED] bg-slate-900 border border-slate-800 rounded-md p-6 sm:p-8">
          <div className="flex gap-6 mb-6 border-b border-slate-800">
            <button
              type="button"
              onClick={() => setTipo('cliente')}
              className={`pb-3 text-xs font-bold transition border-b-2 -mb-px ${tipo === 'cliente' ? 'text-white border-[#A78BFA]' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => setTipo('contador')}
              className={`pb-3 text-xs font-bold transition border-b-2 -mb-px ${tipo === 'contador' ? 'text-white border-[#A78BFA]' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Contador
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(tipo); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">E-mail</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 focus-within:border-[#A78BFA]">
                <Mail size={16} className="text-slate-500" />
                <input
                  type="email"
                  defaultValue={tipo === 'cliente' ? 'beatriz@email.com' : 'contador@email.com'}
                  key={tipo}
                  className="bg-transparent outline-none w-full text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Senha</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 focus-within:border-[#A78BFA]">
                <Lock size={16} className="text-slate-500" />
                <input type="password" defaultValue="123456" className="bg-transparent outline-none w-full text-slate-100" />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3 rounded-md transition flex items-center justify-center gap-2">
              Entrar no Sistema <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-slate-500 text-[10px]">
          <ShieldCheck size={13} className="text-emerald-500" />
          Seus dados são protegidos com criptografia de ponta a ponta
        </div>
      </div>
    </div>
  );
}
