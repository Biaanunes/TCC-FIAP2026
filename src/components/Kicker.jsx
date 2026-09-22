import React from 'react';

// Rótulo pequeno e discreto: quadrado sólido + texto mono maiúsculo.
// Usado para "assinar" seções sem depender de badges arredondados/gradientes.
export default function Kicker({ children, color, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{children}</span>
    </div>
  );
}
