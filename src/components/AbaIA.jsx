import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { responderPergunta } from '../utils/ia';

const SUGESTOES = [
  'Posso comprar algo de R$ 300?',
  'Como estão meus gastos esse mês?',
  'Qual é o meu saldo disponível?',
];

export default function AbaIA({ dadosFinanceiros, modoEscuro, primaryColor }) {
  const [mensagens, setMensagens] = useState([
    {
      autor: 'ia',
      texto: `Oi, ${dadosFinanceiros.usuario.nome.split(' ')[0]}! Eu já conheço seu saldo e seus gastos — pode perguntar direto, sem precisar explicar contexto. Por exemplo: "posso comprar uma calça de R$ 300?"`,
    },
  ]);
  const [pergunta, setPergunta] = useState('');
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const enviar = (texto) => {
    const valorTexto = texto ?? pergunta;
    if (!valorTexto.trim()) return;

    const resposta = responderPergunta(valorTexto, dadosFinanceiros);

    setMensagens((prev) => [
      ...prev,
      { autor: 'usuario', texto: valorTexto },
      { autor: 'ia', texto: resposta },
    ]);
    setPergunta('');
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-9rem)] rounded-lg border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className={`p-4 border-b flex items-center gap-2 ${modoEscuro ? 'border-slate-800' : 'border-slate-200'}`}>
        <Sparkles size={18} style={{ color: primaryColor }} />
        <h3 className="text-sm font-bold">IA Financeira Contta</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mensagens.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.autor === 'usuario' ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: msg.autor === 'ia' ? `${primaryColor}20` : primaryColor }}
            >
              {msg.autor === 'ia'
                ? <Bot size={16} style={{ color: primaryColor }} />
                : <User size={16} className="text-white" />}
            </div>
            <div
              className={`max-w-md p-3 rounded-lg text-xs leading-relaxed ${
                msg.autor === 'usuario'
                  ? 'text-white rounded-tr-none'
                  : modoEscuro ? 'bg-slate-950 rounded-tl-none' : 'bg-slate-100 rounded-tl-none'
              }`}
              style={msg.autor === 'usuario' ? { backgroundColor: primaryColor } : undefined}
            >
              {msg.texto}
            </div>
          </div>
        ))}
        <div ref={fimRef} />
      </div>

      <div className={`p-4 border-t space-y-3 ${modoEscuro ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex flex-wrap gap-2">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              onClick={() => enviar(s)}
              className={`text-[10px] px-3 py-1.5 rounded-md border transition ${
                modoEscuro ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="flex gap-2">
          <input
            type="text"
            placeholder="Pergunte sobre seus gastos, sem precisar explicar contexto..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className={`flex-1 p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
          <button
            type="submit"
            style={{ backgroundColor: primaryColor }}
            className="text-white px-4 rounded-md hover:opacity-90 transition"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
