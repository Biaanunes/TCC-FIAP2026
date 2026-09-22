import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Camera, X, ScanLine } from 'lucide-react';

// QR Codes de NFC-e/NFe costumam trazer o valor total em parâmetros como
// vNF= ou valor=; quando não identificamos nenhum padrão conhecido,
// caímos para o primeiro número em formato monetário (0,00) do texto.
function extrairValor(texto) {
  const padroes = [/vNF=([\d.,]+)/i, /valor=([\d.,]+)/i, /total=([\d.,]+)/i];
  for (const padrao of padroes) {
    const m = texto.match(padrao);
    if (m) return parseFloat(m[1].replace(',', '.'));
  }
  const generico = texto.match(/(\d+[.,]\d{2})/);
  if (generico) return parseFloat(generico[1].replace(',', '.'));
  return null;
}

export default function ScannerNotaFiscal({ onFechar, onLido, modoEscuro, primaryColor }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);
  const [erro, setErro] = useState('');

  const pararCamera = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const fechar = () => {
    pararCamera();
    onFechar();
  };

  useEffect(() => {
    let ativo = true;

    const escanear = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const codigo = jsQR(imageData.data, imageData.width, imageData.height);
        if (codigo) {
          pararCamera();
          onLido(extrairValor(codigo.data), codigo.data);
          return;
        }
      }
      frameRef.current = requestAnimationFrame(escanear);
    };

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (!ativo) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          frameRef.current = requestAnimationFrame(escanear);
        }
      } catch {
        setErro('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
      }
    })();

    return () => {
      ativo = false;
      pararCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-lg overflow-hidden border ${modoEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`p-4 border-b flex items-center justify-between ${modoEscuro ? 'border-slate-800' : 'border-slate-200'}`}>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Camera size={16} style={{ color: primaryColor }} /> Escanear Nota Fiscal
          </h3>
          <button onClick={fechar} type="button">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        <div className="relative bg-black aspect-square">
          <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-8 border-2 rounded-lg pointer-events-none" style={{ borderColor: primaryColor }} />
        </div>

        <div className="p-4 text-center">
          {erro ? (
            <p className="text-xs text-rose-500">{erro}</p>
          ) : (
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <ScanLine size={14} /> Aponte a câmera para o QR Code da nota fiscal
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
