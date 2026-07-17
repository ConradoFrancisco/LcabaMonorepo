'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function PageSeteosComponent({
  seteos,
  setSeteos,
}: {
  seteos: any;
  setSeteos: (newSeteos: any) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSeteos({
      ...seteos,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="card-surface grid gap-6 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
      {/* URL */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">URL:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              https://
            </span>
            <input
              type="text"
              name="url_sitio"
              value={seteos?.urlsite ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Nota:Url de su sitio</p>
        </div>
      </div>

      <div className="my-2 border-b border-gray-200"></div>
      <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
        PRUEBA CAMPOS COLOR DE EJEMPLO
      </h3>

      {/* Color Tema */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Color tema:</label>
        <div className="flex flex-1 items-center gap-2">
          <input
            type="color"
            name="themecolor"
            value={seteos?.themecolor ?? '#000000'}
            onChange={handleChange}
            className="h-10 w-10 cursor-pointer rounded border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800"
          />
          <input
            type="text"
            name="themecolor"
            value={seteos?.themecolor ?? ''}
            onChange={handleChange}
            placeholder="#000000"
            className="form-input w-full rounded-md border px-4 py-2 text-sm uppercase"
          />
        </div>
      </div>

      {/* Marca de Agua */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Marca de agua:</label>
        <div className="flex-1">
          <input
            type="text"
            name="watermark"
            value={seteos?.watermark ?? ''}
            onChange={handleChange}
            className="form-input w-full rounded-md border px-4 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Nota:Texto opcional para imprimir sobre las imagenes cargadas.
          </p>
        </div>
      </div>

      {/* Publicar Logo Luto? */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">¿Publicar logo luto?:</label>
        <div className="flex min-h-[40px] flex-1 items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="logo_luto"
              checked={seteos?.logo_luto == 1 || seteos?.logo_luto === true}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div className="peer peer-checked:bg-brand-500 h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <p className="ml-3 text-xs text-gray-500">
            Nota: Si esta marcado reemplaza el logo oficial por el de Luto
          </p>
        </div>
      </div>

      {/* Email Template */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email template:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="text"
              name="email_template"
              value={seteos?.email_template ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Email Webmaster */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email webmaster:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email_webmaster"
              value={seteos?.email_webmaster ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Email Contacto */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email contacto:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email_contacto"
              value={seteos?.email_contact ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Email Info */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email info:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email_info"
              value={seteos?.email_info ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Se usara par el envio de correos de contraseñas, usuarios nuevos
          </p>
        </div>
      </div>

      {/* Email Ventas */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email ventas:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email_ventas"
              value={seteos?.email_sales ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Se usara par el envio de correos de ordenes de compras
          </p>
        </div>
      </div>

      {/* Email Facturacion */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Email facturación:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email_facturacion"
              value={seteos?.email_billing ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Se usara par el envio de correos de facturacion de ordenes de compras
          </p>
        </div>
      </div>

      {/* Telefono */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Teléfono:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <Phone className="h-4 w-4" />
            </span>
            <input
              type="number"
              name="telefono"
              value={seteos?.telephone ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Direccion */}
      <div className="flex items-start gap-4">
        <label className="form-label mt-2 w-48 text-right font-medium">Dirección:</label>
        <div className="flex-1">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
            </span>
            <input
              type="text"
              name="direccion"
              value={seteos?.address ?? ''}
              onChange={handleChange}
              className="form-input flex-1 rounded-none rounded-r-md border px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
