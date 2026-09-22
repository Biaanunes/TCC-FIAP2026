import React, { useState } from 'react';
import { Bot } from 'lucide-react';

export default function BolhaIA({ onClick, modoEscuro, primaryColor }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      <span
        className={`hidden sm:inline-block px-3 py-2 rounded-md text-xs font-bold shadow-md whitespace-nowrap transition-all duration-200 ${
          modoEscuro ? 'bg-slate-800 text-slate-100' : 'bg-slate-900 text-white'
        } ${hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}
      >
        IA Financeira
      </span>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full shadow-md flex items-center justify-center border transition hover:scale-105 ${
          modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <Bot size={20} className="sm:hidden" style={{ color: primaryColor }} />
        <Bot size={26} className="hidden sm:block" style={{ color: primaryColor }} />
      </button>
    </div>
  );
}

