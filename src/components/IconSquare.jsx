import React from 'react';

// Ícone em caixa com contorno — substitui o clichê do círculo preenchido
// colorido que aparece em praticamente todo dashboard genérico.
export default function IconSquare({ icon: Icon, color, size = 18, className = '' }) {
  return (
    <div
      className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ borderColor: `${color}40`, backgroundColor: `${color}0d` }}
    >
      <Icon size={size} style={{ color }} />
    </div>
  );
}
