import React, { useState } from 'react';
import { UserPlus, Dices, Copy, Check, Send } from 'lucide-react';

const LETRAS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const NUMEROS = '0123456789';

function gerarCodigo() {
  let letras = '';
  for (let i = 0; i < 3; i++) letras += LETRAS[Math.floor(Math.random() * LETRAS.length)];
  let numeros = '';
  for (let i = 0; i < 3; i++) numeros += NUMEROS[Math.floor(Math.random() * NUMEROS.length)];
  return `${letras}-${numeros}`;
}

export default function AbaAdicionarCliente({ modoEscuro, primaryColor }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState(null);
  const [girando, setGirando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [convidado, setConvidado] = useState(false);

  const handleGirar = () => {
    setGirando(true);
    setCopiado(false);
    setTimeout(() => {
      setCodigo(gerarCodigo());
      setGirando(false);
    }, 400);
  };

  const handleCopiar = async () => {
    if (!codigo) return;
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard indisponível — segue sem copiar
    }
  };

  const handleConvidar = (e) => {
    e.preventDefault();
    if (!nome || !email || !codigo) return;
    setConvidado(true);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <UserPlus size={18} style={{ color: primaryColor }} /> Adicionar Cliente
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Gere um código de convite e envie para o seu cliente vincular a conta dele a você.
        </p>
      </div>

      <form onSubmit={handleConvidar} className={`p-6 rounded-lg border space-y-4 ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">Nome do cliente</label>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => { setNome(e.target.value); setConvidado(false); }}
            className={`w-full p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-400">E-mail do cliente</label>
          <input
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setConvidado(false); }}
            className={`w-full p-3 rounded-md border text-xs outline-none ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          />
        </div>

        <div className={`p-4 rounded-md border ${modoEscuro ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-xs text-slate-400 mb-3">Código de convite</p>

          <div className="flex items-center gap-3">
            <div
              className={`flex-1 text-center py-3 rounded-md border font-mono text-xl font-bold tracking-[0.2em] transition ${
                modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              } ${girando ? 'opacity-40' : 'opacity-100'}`}
              style={{ color: codigo ? primaryColor : undefined }}
            >
              {codigo || '---   ---'}
            </div>

            {codigo && (
              <button
                type="button"
                onClick={handleCopiar}
                title="Copiar código"
                className={`w-11 h-11 flex-shrink-0 rounded-md border flex items-center justify-center transition ${
                  modoEscuro ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
                }`}
              >
                {copiado ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-slate-400" />}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleGirar}
            style={{ backgroundColor: primaryColor }}
            className="w-full mt-3 text-white font-bold text-xs py-3 rounded-md hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Dices size={14} className={girando ? 'animate-spin' : ''} />
            {codigo ? 'Girar Novamente' : 'Girar Código'}
          </button>
        </div>

        <button
          type="submit"
          disabled={!nome || !email || !codigo}
          className={`w-full font-bold text-xs py-3 rounded-md border transition flex items-center justify-center gap-2 ${
            !nome || !email || !codigo
              ? 'opacity-40 cursor-not-allowed border-slate-300 text-slate-400'
              : 'hover:opacity-80'
          }`}
          style={nome && email && codigo ? { borderColor: primaryColor, color: primaryColor } : undefined}
        >
          <Send size={14} /> Enviar Convite
        </button>

        {convidado && (
          <p className="text-xs text-emerald-500 text-center">
            Convite pronto! Envie o código <strong>{codigo}</strong> para {nome} confirmar o vínculo com a sua conta.
          </p>
        )}
      </form>
    </div>
  );
}
