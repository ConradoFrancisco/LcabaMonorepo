'use client';

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

type QRProps = {
  value: string;
  size?: number;
  logoSrc?: string;
  logoSize?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  title?: string;
};

export default function QR({
  value,
  size = 260,
  logoSrc = '/images/logo/logitoLegis.png',
  logoSize = 64,
  level = 'H',
}: QRProps) {
  const linkPubli = (value || '').trim();
  const [descargado, setDescargado] = useState(false);

  const handleDescargar = () => {
    const canvas = document.getElementById('qr-generado') as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'qr.png';
    link.href = canvas.toDataURL();
    link.click();

    setDescargado(true);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* HEADER: título + botón */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Código QR</h3>

        <button
          type="button"
          onClick={handleDescargar}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          {descargado ? 'QR descargado' : 'Descargar QR'}
        </button>
      </div>

      <p className="mt-1 mb-3 text-sm break-all text-gray-500">{linkPubli}</p>

      <div className="flex justify-center">
        <div className="rounded-xl border border-gray-200 p-3">
          <QRCodeCanvas
            id="qr-generado"
            value={linkPubli}
            size={size}
            level={level}
            marginSize={4}
            imageSettings={{
              src: logoSrc,
              height: logoSize,
              width: logoSize,
              excavate: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
