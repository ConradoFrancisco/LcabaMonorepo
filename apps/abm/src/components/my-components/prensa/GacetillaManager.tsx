'use client';

import { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import { Mail, Send, History, UserCheck, FileText, RefreshCcw, AlertTriangle } from 'lucide-react';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import MyEditor from '@/components/my-components/MyEditor';
import GacetillaService from '../../../../services/GacetillaService';
import SearchPanel from './SearchPanel';
import { toast } from 'react-toastify';
import { Modal } from '@/components/ui/modal';

interface GacetillaManagerProps {
  contentTitle?: string;
  domainLink?: string;
  searchContentMethod?: (
    query: string,
    offset: number,
    limit: number,
    filterValue?: string,
  ) => Promise<any>;
  searchSubscribersMethod?: (query: string, offset: number, limit: number) => Promise<any>;
  onContentSelect?: (item: any) => { subject: string; body: string };
  tipoOptions?: { value: string; label: string }[] | null;
  filterOptions?: { value: string; label: string }[] | null;
  getContentDetail?: (id: number | string) => Promise<any>;
  filterLabel?: string;
  filterPlaceholder?: string;
  filterDisabledText?: string;
}

const stripParagraphWrappers = (html: string) => (html || '').toString().trim();

const CONTENT_DETAIL_CONCURRENCY = 5;

async function enrichWithDetail(
  items: any[],
  getContentDetail?: (id: number | string) => Promise<any>,
): Promise<any[]> {
  if (!getContentDetail) return items;
  const result: any[] = new Array(items.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const current = cursor++;
      const item = items[current];
      if (item.textos) {
        result[current] = item;
        continue;
      }
      const itemId = item.id || item.ID;
      try {
        const detail = await getContentDetail(itemId);
        result[current] = detail ? { ...item, ...detail, id: itemId } : item;
      } catch (e) {
        console.error('Error obteniendo detalle de la publicación', e);
        result[current] = item;
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(CONTENT_DETAIL_CONCURRENCY, items.length) }, worker),
  );
  return result;
}

const buildImageUrl = (image: any): string | null => {
  if (!image) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  if (!base || !image.location || !image.filename) return null;
  return `${base}/${image.location}/${image.filename}${key ? `?key=${key}` : ''}`;
};

const buildPublicationHtml = (pub: any, domainLink: string): string => {
  const textos = pub.textos || {};
  const title = textos.title || pub.titulo || pub.title || 'Sin título';
  const volanta = textos.subtitle || '';
  const copete = stripParagraphWrappers(textos.shortdesc || '');
  const cuerpo = stripParagraphWrappers(textos.description || '');

  const renderImage = Array.isArray(pub.images)
    ? pub.images.find((img: any) => String(img.image_type || '').toLowerCase() === 'render')
    : null;
  const imgUrl = buildImageUrl(renderImage);

  const rawUrl = textos.url || pub.url || '';
  const fullUrl = rawUrl
    ? rawUrl.startsWith('http')
      ? rawUrl
      : `${domainLink.replace(/\/$/, '')}/${rawUrl.replace(/^\//, '')}`
    : '';

  return `
    <div style="margin: 32px 0; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      ${
        volanta
          ? `<p style="text-transform: uppercase; color: #6b7280; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; margin: 0 0 8px;">${volanta}</p>`
          : ''
      }
      <h2 style="margin: 0 0 12px; color: #111827; font-size: 24px; font-weight: 700; line-height: 1.25;">${title}</h2>
      ${
        copete
          ? `<div style="font-size: 16px; color: #4b5563; margin: 0 0 16px; line-height: 1.5;">${copete}</div>`
          : ''
      }
      ${
        imgUrl
          ? `<img src="${imgUrl}" alt="${title}" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; margin: 16px 0; display: block;" />`
          : ''
      }
      ${
        cuerpo
          ? `<div style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">${cuerpo}</div>`
          : ''
      }
      ${
        fullUrl
          ? `<p style="margin: 24px 0 0; text-align: center;"><a href="${fullUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 600;">Ver nota completa</a></p>`
          : ''
      }
    </div>
  `.trim();
};

export default function GacetillaManager({
  contentTitle = 'Publicación',
  domainLink = 'https://www.legislatura.gob.ar/',
  searchContentMethod = GacetillaService.searchPublications,
  searchSubscribersMethod = GacetillaService.searchSubscribers,
  onContentSelect = (item: any) => ({
    subject: item.Titulo || item.title || '',
    body: `<h2>${item.Titulo || item.title || ''}</h2><p>Vía Legislatura CABA</p>`,
  }),
  filterOptions,
  tipoOptions,
  getContentDetail,
  filterLabel = 'Tipo de publicación',
  filterPlaceholder = 'Seleccione el tipo...',
  filterDisabledText = 'Seleccione un tipo de publicación para listar',
}: GacetillaManagerProps) {
  const [activeTab, setActiveTab] = useState('new');
  const [filterValue, setFilterValue] = useState('');
  const rawOptions = filterOptions ?? tipoOptions ?? [];
  const options =
    rawOptions?.map((opt: any) => {
      if (opt && typeof opt === 'object' && 'value' in opt && 'label' in opt) {
        return opt;
      }
      return {
        value: String(opt?.id ?? opt?.value ?? ''),
        label: opt?.title ?? opt?.titulo ?? opt?.label ?? 'Sin título',
      };
    }) || [];

  // Estados para el formulario
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [selectedSus, setSelectedSus] = useState<any[]>([]);
  const [selectedContents, setSelectedContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSend = async () => {
    const faltantes: string[] = [];
    if (!asunto) faltantes.push('asunto');
    if (!mensaje) faltantes.push('mensaje');
    if (selectedContents.length === 0) faltantes.push('publicación');
    if (selectedSus.length === 0) faltantes.push('suscriptor');

    if (faltantes.length > 0) {
      toast.error(`Por favor completa: ${faltantes.join(', ')}`);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    try {
      const recipients =
        selectedSus.length > 0 ? selectedSus : [{ email: 'llanosconrado07@gmail.com', id: 0 }];

      const enrichedContents = await enrichWithDetail(selectedContents, getContentDetail);
      const publicationsHtml = enrichedContents
        .map((pub) => buildPublicationHtml(pub, domainLink))
        .join('\n');

      const finalMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
          <div>${mensaje}</div>
          ${publicationsHtml}
        </div>
      `.trim();

      await GacetillaService.sendGacetilla({
        subscribers: recipients,
        subject: asunto,
        message: finalMessage,
      });

      toast.success(`¡Gacetilla enviada con éxito a ${recipients.length} destinatarios!`);
      setAsunto('');
      setMensaje('');
      setSelectedSus([]);
      setSelectedContents([]);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error('Error al enviar el mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}

      <div className="dark:bg-dark-900 flex w-fit items-center space-x-2 rounded-xl border border-gray-100 bg-white p-1 shadow-sm dark:border-gray-800">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-all ${
            activeTab === 'new'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Mail size={18} />
          <span className="text-sm font-medium">Nuevo newsletter</span>
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-all ${
            activeTab === 'sent'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <History size={18} />
          <span className="text-sm font-medium">Enviados</span>
        </button>
      </div>

      {activeTab === 'new' ? (
        <div className="animate-in fade-in duration-500">
          <ComponentCard title="Configuración de envío">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <label className="min-w-[150px] text-sm font-semibold text-gray-700 dark:text-gray-300">
                {filterLabel}
              </label>
              <div className="max-w-2xl flex-1">
                <Select
                  options={options || [{ value: '', label: 'Cargando opciones...' }]}
                  value={filterValue}
                  onChange={(val) => {
                    setFilterValue(val);
                    setSelectedContents([]);
                  }}
                  placeholder={filterPlaceholder}
                />
              </div>
            </div>
          </ComponentCard>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Panel de Contenido Dinámico */}
            <SearchPanel
              title={contentTitle}
              placeholder={`Buscar ${contentTitle.toLowerCase()}...`}
              selectionCount={selectedContents.length}
              onClearSelection={() => {
                setSelectedContents([]);
                toast.info('Selección de publicaciones borrada');
              }}
              onSelectAll={async (query) => {
                try {
                  const res = await searchContentMethod(query, 0, 0, filterValue);
                  const items = res?.data || [];
                  setSelectedContents(items);
                  toast.info(`${items.length} publicación(es) seleccionadas`);
                } catch (e) {
                  console.error('Error seleccionando todas las publicaciones', e);
                  toast.error('No se pudo seleccionar todas las publicaciones');
                }
              }}
              refetchKey={filterValue}
              enabled={!!filterValue}
              disabledText={filterDisabledText}
              onSearch={async ({ query, offset, limit }) => {
                const res = await searchContentMethod(query, offset, limit, filterValue);
                return { data: res?.data || [], total: res?.total ?? 0 };
              }}
              onSelect={async (item) => {
                const itemId = item.id || item.ID;
                const isSelected = selectedContents.some((c) => (c.id || c.ID) === itemId);

                if (isSelected) {
                  setSelectedContents(selectedContents.filter((c) => (c.id || c.ID) !== itemId));
                  toast.info('Publicación removida');
                  return;
                }

                let enriched: any = item;
                if (getContentDetail) {
                  try {
                    const detail = await getContentDetail(itemId);
                    if (detail) {
                      enriched = { ...item, ...detail, id: itemId };
                    }
                  } catch (e) {
                    console.error('Error obteniendo detalle de la publicación', e);
                    toast.error('No se pudo cargar el detalle completo de la publicación');
                  }
                }

                setSelectedContents([...selectedContents, enriched]);
                toast.info('Publicación agregada');
              }}
              icon={<FileText size={18} />}
              renderItem={(pub) => {
                const isSelected = selectedContents.some(
                  (c) => (c.id || c.ID) === (pub.id || pub.ID),
                );
                return (
                  <div
                    className={`group flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                      isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {pub.title || pub.titulo || pub.nombre || 'Sin Título'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {pub.date_ins_parsed || pub.Fecha || ''}{' '}
                        {pub.date_ins_parsed || pub.Fecha ? '|' : ''}{' '}
                        {pub.tipo_post || pub.Tipo || pub.type || 'General'}
                      </p>
                    </div>
                  </div>
                );
              }}
            />

            {/* Panel de Suscriptores Dinámico */}
            <SearchPanel
              title="Suscriptores"
              placeholder="Buscar destinatarios..."
              selectionCount={selectedSus.length}
              onClearSelection={() => {
                setSelectedSus([]);
                toast.info('Selección de suscriptores borrada');
              }}
              onSelectAll={async (query) => {
                try {
                  const res = await searchSubscribersMethod(query, 0, 0);
                  const all = (res?.data || []).map((sus: any) => ({
                    ID: sus.ID,
                    email: sus.Email || sus.email,
                    name: sus.Nombre || sus.nombre,
                  }));
                  setSelectedSus(all);
                  toast.info(`${all.length} suscriptor(es) seleccionados`);
                } catch (e) {
                  console.error('Error seleccionando todos los suscriptores', e);
                  toast.error('No se pudo seleccionar a todos los suscriptores');
                }
              }}
              onSearch={async ({ query, offset, limit }) => {
                const res = await searchSubscribersMethod(query, offset, limit);
                return { data: res?.data || [], total: res?.total ?? 0 };
              }}
              icon={<UserCheck size={18} />}
              renderItem={(sus) => (
                <div
                  onClick={() => {
                    const isSelected = selectedSus.some((s) => s.ID === sus.ID);
                    if (isSelected) {
                      setSelectedSus(selectedSus.filter((s) => s.ID !== sus.ID));
                    } else {
                      setSelectedSus([
                        ...selectedSus,
                        {
                          ID: sus.ID,
                          email: sus.Email || sus.email,
                          name: sus.Nombre || sus.nombre,
                        },
                      ]);
                    }
                    toast.info(isSelected ? 'Suscriptor removido' : 'Suscriptor agregado');
                  }}
                  className={`group flex items-center space-x-3 p-3 hover:bg-green-50 dark:hover:bg-green-900/20 ${
                    selectedSus.some((s) => s.ID === sus.ID)
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSus.some((s) => s.ID === sus.ID)}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {sus.Nombre || sus.nombre} {sus.Apellido || sus.apellido || ''}
                    </p>
                    <p className="text-xs text-gray-400">
                      {sus.Email || sus.email} |{' '}
                      <span className="text-blue-500">{sus.Medio || sus.medio || 'Prensa'}</span>
                    </p>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="mt-6">
            <ComponentCard title="Detalles del mensaje">
              <div className="space-y-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <label className="min-w-[70px] text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Asunto:
                  </label>
                  <Input
                    type="text"
                    placeholder="Ingrese el asunto del correo..."
                    className="flex-1"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Mensaje:
                  </label>
                  <div className="dark:bg-dark-950 overflow-hidden rounded-xl border bg-white">
                    <MyEditor value={mensaje} onChange={(val) => setMensaje(val)} />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className={`flex transform items-center space-x-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 ${
                      loading ? 'opacity-50' : ''
                    }`}
                  >
                    {loading ? (
                      <RefreshCcw className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} />
                    )}
                    <span>{loading ? 'Enviando...' : 'Enviar correos'}</span>
                  </button>
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      ) : (
        <ComponentCard title="Historial de Envíos">
          <div className="py-20 text-center text-gray-400">
            <History size={48} className="mx-auto mb-4 opacity-10" />
            <p>No hay gacetillas enviadas recientemente.</p>
          </div>
        </ComponentCard>
      )}

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="flex justify-center"
      >
        <div className="relative m-16 w-full max-w-[600px] rounded-xl bg-white p-8 dark:bg-[#1E2634]">
          <div className="mb-8 flex items-start gap-5">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle size={28} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Confirmar envío
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                Está a punto de enviar{' '}
                <span className="font-bold">
                  {selectedContents.length}{' '}
                  {selectedContents.length === 1 ? 'publicación' : 'publicaciones'}
                </span>{' '}
                a{' '}
                <span className="font-bold">
                  {selectedSus.length} {selectedSus.length === 1 ? 'suscriptor' : 'suscriptores'}
                </span>
                .
                <br />
                ¿Desea continuar?
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmSend}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Send size={18} />
              Enviar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
