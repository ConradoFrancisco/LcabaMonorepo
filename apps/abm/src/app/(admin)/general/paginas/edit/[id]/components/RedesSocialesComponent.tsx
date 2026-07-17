'use client';

import React from 'react';
import {
  Plus,
  Trash2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Image as ImageIcon,
  Link2,
} from 'lucide-react';

export type RedSocial = {
  id: string;
  url: string;
  red: string;
  icono: string;
};

const REDES_PREDEFINIDAS = [
  { label: 'Facebook', icono: 'fa-facebook', urlPrefix: 'https://www.facebook.com/' },
  { label: 'Instagram', icono: 'fa-instagram', urlPrefix: 'https://www.instagram.com/' },
  { label: 'X', icono: 'fa-x-twitter', urlPrefix: 'https://x.com/' },
  { label: 'LinkedIn', icono: 'fa-linkedin', urlPrefix: 'https://www.linkedin.com/in/' },
  { label: 'YouTube', icono: 'fa-youtube', urlPrefix: 'https://www.youtube.com/' },
  { label: 'TikTok', icono: 'fa-tiktok', urlPrefix: 'https://www.tiktok.com/@' },
  { label: 'WhatsApp', icono: 'fa-whatsapp', urlPrefix: 'https://wa.me/' },
  { label: 'Pinterest', icono: 'fa-pinterest', urlPrefix: 'https://www.pinterest.com/' },
];

const XIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="currentColor"
    className={className}
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const TikTokIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill={color}
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
  </svg>
);

const WhatsAppIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill={color}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const PinterestIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 496 512"
    fill={color}
  >
    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
  </svg>
);

const renderIcon = (label: string, fallback: string) => {
  switch (label) {
    case 'Facebook':
      return <Facebook size={24} color="#1877F2" />;
    case 'Instagram':
      return <Instagram size={24} color="#E4405F" />;
    case 'X':
      return <XIcon size={24} className="text-gray-900 dark:text-white" />;
    case 'LinkedIn':
      return <Linkedin size={24} color="#0A66C2" />;
    case 'YouTube':
      return <Youtube size={24} color="#FF0000" />;
    case 'WhatsApp':
      return <WhatsAppIcon size={24} color="#25D366" />;
    case 'TikTok':
      return <TikTokIcon size={24} color="#ff0050" />;
    case 'Pinterest':
      return <PinterestIcon size={24} color="#E60023" />;
    default:
      return <Link2 size={24} className="text-gray-400" />;
  }
};

export default function RedesSocialesComponent({
  redes = [],
  setRedes,
}: {
  redes: RedSocial[];
  setRedes: (redes: RedSocial[]) => void;
}) {
  const [customMode, setCustomMode] = React.useState<Record<string, boolean>>({});

  const handleAdd = () => {
    const newRed: RedSocial = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      url: '',
      red: '',
      icono: '',
    };
    setRedes([...redes, newRed]);
  };

  const handleRemove = (id: string) => {
    setRedes(redes.filter((r) => r.id !== id));
  };

  const handleChange = (id: string, field: keyof RedSocial, value: string) => {
    setRedes(redes.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white transition-colors"
        >
          <Plus size={16} />
          Agregar red social
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {redes.map((red, index) => {
          const isPreset = REDES_PREDEFINIDAS.some((r) => r.label === red.red);
          const showSelect = !customMode[red.id] && (isPreset || red.red === '');

          return (
            <div
              key={red.id}
              className="group hover:border-brand-300 relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md md:flex-row md:items-center dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Icon Preview */}
              <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex h-14 w-14 flex-none shrink-0 items-center justify-center rounded-lg p-3 shadow-inner">
                {renderIcon(red.red, red.icono)}
              </div>

              {/* Fields Container */}
              <div className="grid w-full flex-1 grid-cols-1 gap-4 md:grid-cols-12">
                {/* Red (3 cols) */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Red
                  </label>
                  {showSelect ? (
                    <select
                      value={red.red}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Otra') {
                          setCustomMode({ ...customMode, [red.id]: true });
                          setRedes(
                            redes.map((r) =>
                              r.id === red.id ? { ...r, red: '', icono: 'fa-link' } : r,
                            ),
                          );
                        } else {
                          const predefinida = REDES_PREDEFINIDAS.find((r) => r.label === val);
                          if (predefinida) {
                            const updates: Partial<RedSocial> = {
                              red: predefinida.label,
                              icono: predefinida.icono,
                            };

                            // Solo pisamos la URL si estaba vacía o si contenía el prefijo de otra red predefinida
                            const isCurrentUrlAPreset =
                              !red.url || REDES_PREDEFINIDAS.some((p) => p.urlPrefix === red.url);
                            if (isCurrentUrlAPreset) {
                              updates.url = predefinida.urlPrefix;
                            }

                            setRedes(
                              redes.map((r) => (r.id === red.id ? { ...r, ...updates } : r)),
                            );
                          }
                        }
                      }}
                      className="form-input focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:ring-1 dark:border-gray-700 dark:bg-gray-900/50"
                    >
                      <option value="" disabled>
                        Seleccione...
                      </option>
                      {REDES_PREDEFINIDAS.map((r) => (
                        <option key={r.label} value={r.label}>
                          {r.label}
                        </option>
                      ))}
                      <option value="Otra">Otra (Personalizada)</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={red.red}
                        onChange={(e) => handleChange(red.id, 'red', e.target.value)}
                        className="form-input focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:ring-1 dark:border-gray-700 dark:bg-gray-900/50"
                        placeholder="Nombre de la red"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCustomMode({ ...customMode, [red.id]: false });
                          handleChange(red.id, 'red', '');
                        }}
                        className="hover:text-brand-500 text-[10px] font-bold text-gray-400 uppercase transition-colors"
                      >
                        Volver
                      </button>
                    </div>
                  )}
                </div>

                {/* Icono (3 cols) */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Icono (FA)
                  </label>
                  <input
                    type="text"
                    value={red.icono}
                    onChange={(e) => handleChange(red.id, 'icono', e.target.value)}
                    className="form-input focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:ring-1 dark:border-gray-700 dark:bg-gray-900/50"
                    placeholder="Ej: fa-instagram"
                  />
                </div>

                {/* Url (6 cols) */}
                <div className="md:col-span-6">
                  <label className="mb-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {isPreset && !customMode[red.id] ? 'Ruta base' : 'URL'}
                  </label>
                  <div className="flex rounded-md">
                    {isPreset && !customMode[red.id] && (
                      <span
                        className="inline-flex max-w-[150px] shrink-0 items-center overflow-hidden rounded-l-md border border-r-0 border-gray-200 bg-gray-200 px-3 text-xs whitespace-nowrap text-gray-500 sm:text-sm md:max-w-[200px] dark:border-gray-700 dark:bg-gray-800"
                        title={REDES_PREDEFINIDAS.find((r) => r.label === red.red)?.urlPrefix}
                      >
                        {REDES_PREDEFINIDAS.find((r) => r.label === red.red)?.urlPrefix}
                      </span>
                    )}
                    <input
                      type="text"
                      value={(() => {
                        const preset = REDES_PREDEFINIDAS.find((r) => r.label === red.red);
                        if (preset && !customMode[red.id]) {
                          return red.url.startsWith(preset.urlPrefix)
                            ? red.url.slice(preset.urlPrefix.length)
                            : red.url;
                        }
                        return red.url;
                      })()}
                      onChange={(e) => {
                        const preset = REDES_PREDEFINIDAS.find((r) => r.label === red.red);
                        if (preset && !customMode[red.id]) {
                          // Evitar duplicar prefijos si el usuario pega la url completa
                          const val = e.target.value.replace(preset.urlPrefix, '');
                          handleChange(red.id, 'url', preset.urlPrefix + val);
                        } else {
                          handleChange(red.id, 'url', e.target.value);
                        }
                      }}
                      className={`form-input focus:border-brand-500 focus:ring-brand-500 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:ring-1 dark:border-gray-700 dark:bg-gray-900/50 ${isPreset && !customMode[red.id] ? 'rounded-r-md' : 'rounded-md'}`}
                      placeholder={isPreset && !customMode[red.id] ? 'ejemplo' : 'https://...'}
                    />
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleRemove(red.id)}
                className="absolute -top-3 -right-3 rounded-full bg-red-100 p-2 text-red-600 shadow-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-red-500 hover:text-white md:-top-2 md:-right-2 md:opacity-0 dark:bg-red-900/50 dark:text-red-400"
                title="Eliminar Red"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}

        {redes.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800/30">
            <p className="text-gray-500">No hay redes sociales configuradas.</p>
            <button
              type="button"
              onClick={handleAdd}
              className="text-brand-600 hover:text-brand-700 mt-4 text-sm font-medium transition-colors"
            >
              + Agregar la primera
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
