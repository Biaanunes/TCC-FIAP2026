import React, { useEffect, useRef, useState } from 'react';
import { Zap, Droplet, TrendingUp, CalendarClock, X } from 'lucide-react';
import { mockNotificacoes } from '../data/notificacoes';
import IconSquare from './IconSquare';

const INTERVALO_MS = 40000;
const DURACAO_TOAST_MS = 10000;

const ICONES_POR_CATEGORIA = {
  'Efeito Dominó Financeiro': Zap,
  'Vazamento Financeiro': Droplet,
  'Previsão Financeira': TrendingUp,
  'Conta a pagar': CalendarClock,
};

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function partirMensagem(texto) {
  const [categoria, ...resto] = texto.split(':');
  return { categoria: categoria.trim(), mensagem: resto.join(':').trim() };
}

export default function NotificacaoToast({ modoEscuro, primaryColor }) {
  const [toasts, setToasts] = useState([]);
  const filaRef = useRef(embaralhar(mockNotificacoes));
  const indiceRef = useRef(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (indiceRef.current >= filaRef.current.length) {
        filaRef.current = embaralhar(mockNotificacoes);
        indiceRef.current = 0;
      }
      const texto = filaRef.current[indiceRef.current];
      indiceRef.current += 1;

      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...partirMensagem(texto) }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, DURACAO_TOAST_MS);
    }, INTERVALO_MS);

    return () => clearInterval(intervalo);
  }, []);

  const fechar = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-3 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((toast) => {
        const Icone = ICONES_POR_CATEGORIA[toast.categoria] || Zap;
        return (
          <div
            key={toast.id}
            className={`rounded-lg border border-l-4 shadow-md p-4 flex gap-3 transition-all ${
              modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
            style={{ borderLeftColor: primaryColor }}
          >
            <IconSquare icon={Icone} color={primaryColor} size={16} className="w-8 h-8" />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                {toast.categoria}
              </p>
              <p className="text-xs mt-1 leading-relaxed text-slate-500 dark:text-slate-300">
                {toast.mensagem}
              </p>
            </div>
            <button onClick={() => fechar(toast.id)} type="button" className="flex-shrink-0 h-fit">
              <X size={14} className="text-slate-400" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
