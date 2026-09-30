import React from 'react';

// Pop-up de carregamento exibido ao "conectar" o extrato automático:
// um spinner giratório em degradê lilás → roxo, fechado sozinho pelo
// componente pai depois que os dados mockados terminam de "chegar".
export default function CarregandoExtratoModal({ modoEscuro }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4">
      <div className={`w-full max-w-xs rounded-2xl p-8 flex flex-col items-center gap-5 shadow-xl ${modoEscuro ? 'bg-slate-900' : 'bg-white'}`}>
        <div
          className="w-14 h-14 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, #D9CCFB 0%, #A78BFA 35%, #7C3AED 70%, #D9CCFB 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
          }}
        />
        <p className={`text-sm font-bold ${modoEscuro ? 'text-slate-100' : 'text-slate-700'}`}>Carregando...</p>
        <p className="text-xs text-slate-400 text-center -mt-2">Conectando com o seu banco via Open Finance</p>
      </div>
    </div>
  );
}
