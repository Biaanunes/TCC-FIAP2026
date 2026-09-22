import React, { useRef, useState } from 'react';

function ponto(cx, cy, r, anguloGraus) {
  const rad = ((anguloGraus - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function caminhoFatia(cx, cy, r, anguloInicial, anguloFinal) {
  const p1 = ponto(cx, cy, r, anguloInicial);
  const p2 = ponto(cx, cy, r, anguloFinal);
  const arcoGrande = anguloFinal - anguloInicial > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${arcoGrande} 1 ${p2.x} ${p2.y} Z`;
}

export default function GraficoPizza({ dados, modoEscuro }) {
  const containerRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const total = dados.reduce((acc, d) => acc + d.valor, 0);
  const cx = 180;
  const cy = 180;
  const raio = 160;
  const raioInterno = 96;
  const corGutter = modoEscuro ? '#0f172a' : '#ffffff';

  const fatias = dados.reduce((acc, d) => {
    const anguloInicial = acc.length ? acc[acc.length - 1].anguloFinal : 0;
    const fracao = d.valor / total;
    const anguloFinal = anguloInicial + fracao * 360;
    acc.push({ ...d, anguloInicial, anguloFinal, porcentagem: fracao * 100 });
    return acc;
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const fatiaAtiva = hoverIndex !== null ? fatias[hoverIndex] : null;

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative flex flex-col items-center py-4 w-full">
      <svg viewBox="0 0 360 360" overflow="visible" className="w-full max-w-[280px] sm:max-w-[360px] h-auto">
        {fatias.map((f, i) => {
          const ativa = hoverIndex === i;
          const pontoLabel = ponto(cx, cy, (raio + raioInterno) / 2, (f.anguloInicial + f.anguloFinal) / 2);
          const mostrarLabel = f.porcentagem >= 8;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                transition: 'opacity 150ms ease',
                opacity: hoverIndex === null || ativa ? 1 : 0.45,
                cursor: 'pointer',
              }}
            >
              <path
                d={caminhoFatia(cx, cy, raio, f.anguloInicial, f.anguloFinal)}
                fill={f.cor}
                stroke={corGutter}
                strokeWidth="3"
              />
              {mostrarLabel && (
                <text
                  x={pontoLabel.x}
                  y={pontoLabel.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  fill="#ffffff"
                  style={{ fontSize: 14, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {f.porcentagem.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}

        {/* miolo do donut, recorta o centro para exibir o total */}
        <circle cx={cx} cy={cy} r={raioInterno} fill={corGutter} />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          className={`pointer-events-none select-none font-mono uppercase tracking-widest ${modoEscuro ? 'fill-slate-500' : 'fill-slate-400'}`}
          style={{ fontSize: 9, fontWeight: 700 }}
        >
          Total do mês
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          className={`pointer-events-none select-none font-mono font-bold ${modoEscuro ? 'fill-slate-100' : 'fill-slate-800'}`}
          style={{ fontSize: 20 }}
        >
          R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </text>
      </svg>

      {/* legenda discreta, sempre visível — independente do hover */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 max-w-[280px]">
        {dados.map((d, i) => (
          <span key={i} className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: d.cor }} />
            {d.nome}
          </span>
        ))}
      </div>

      {fatiaAtiva && (
        <div
          className={`absolute z-10 pointer-events-none px-3 py-2 rounded-md border text-xs ${
            modoEscuro ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-900 border-slate-900 text-white'
          }`}
          style={{ left: mousePos.x + 14, top: mousePos.y - 10 }}
        >
          <p className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 inline-block" style={{ backgroundColor: fatiaAtiva.cor }} />
            {fatiaAtiva.nome}
          </p>
          <p className="text-slate-300 font-mono">R$ {fatiaAtiva.valor.toFixed(2)} · {fatiaAtiva.porcentagem.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
