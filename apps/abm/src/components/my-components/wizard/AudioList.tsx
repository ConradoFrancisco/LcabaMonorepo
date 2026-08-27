'use client';

import { useState } from 'react';
import { Modal } from '../../ui/modal';
import { toast } from 'react-toastify';

import { Edit, Trash2 } from 'lucide-react';
import { IAudio } from '@/types/postTypes';
import ConfirmationModal, {
  ParlamentariaOptions,
} from './InfoParlamentaria/components/modals/ConfirmationModal';
import apiClient from '../../../../services/apiClient';

interface NewIAudio {
  url: string;
  title: string;
  description: string;
}

export default function AudioList({
  audiosdb = [],
  setAudiosdb,
  newAudios = [],
  setNewAudios,
}: {
  audiosdb: IAudio[];
  setAudiosdb?: (newAuds: IAudio[]) => void;
  newAudios: NewIAudio[];
  setNewAudios: (newAuds: NewIAudio[]) => void;
}) {
  const [url, setUrl] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para el Modal de Edición de audios EXISTENTES (db)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<IAudio | null>(null);
  const [editData, setEditData] = useState({ title: '', description: '', url: '' });

  // Estados para el Modal de Edición de audios NUEVOS
  const [isEditNewOpen, setIsEditNewOpen] = useState(false);
  const [editNewIndex, setEditNewIndex] = useState<number | null>(null);
  const [editNewData, setEditNewData] = useState({ title: '', description: '', url: '' });

  // Estados para el Modal de Confirmación de eliminación
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
  const [pendingDeleteIsExisting, setPendingDeleteIsExisting] = useState(false);
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState('');

  // Player oficial de SoundCloud (oEmbed URL dentro del player)
  const getSoundCloudEmbedUrl = (soundUrl: string) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      soundUrl,
    )}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  };

  // Título vía oEmbed de SoundCloud
  const fetchSoundCloudTitle = async (soundUrl: string) => {
    try {
      const response = await fetch(
        `https://soundcloud.com/oembed?url=${encodeURIComponent(soundUrl)}&format=json`,
      );
      if (!response.ok) throw new Error('Error al obtener el título');
      const data = await response.json();
      return (data.title as string) || 'Audio sin título';
    } catch {
      return 'Audio sin título';
    }
  };

  const isValidSoundCloudUrl = (u: string) =>
    /(^https?:\/\/)?(www\.)?(m\.)?(soundcloud\.com|on\.soundcloud\.com)\//i.test(u.trim());

  const handleAddAudio = async () => {
    if (!isValidSoundCloudUrl(url)) {
      alert('Debes ingresar una URL válida de SoundCloud');
      return;
    }

    setLoading(true);
    let finalTitle = titulo.trim();
    if (!finalTitle) {
      finalTitle = await fetchSoundCloudTitle(url);
    }

    const newAudio: NewIAudio = {
      url: url.trim(),
      title: finalTitle,
      description: descripcion.trim(),
    };

    setNewAudios([...newAudios, newAudio]);

    setUrl('');
    setTitulo('');
    setDescripcion('');
    setLoading(false);
  };

  const handleAskDeleteAudio = (index: number, isExisting: boolean) => {
    const title = isExisting
      ? audiosdb[index]?.title || 'este audio'
      : newAudios[index]?.title || 'este audio';
    setPendingDeleteIndex(index);
    setPendingDeleteIsExisting(isExisting);
    setPendingDeleteTitle(title);
    setIsDeleteOpen(true);
  };

  const handleConfirmDeleteAudio = async () => {
    if (pendingDeleteIndex === null) return;

    if (pendingDeleteIsExisting) {
      const audio = audiosdb[pendingDeleteIndex];
      try {
        await apiClient.delete(`/magazine/audio/${audio.id}`);
        if (setAudiosdb) {
          setAudiosdb(audiosdb.filter((_, i) => i !== pendingDeleteIndex));
        }
        toast.success('Audio eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar audio:', error);
        toast.error('Error al eliminar el audio');
      }
    } else {
      setNewAudios(newAudios.filter((_, i) => i !== pendingDeleteIndex));
    }

    setIsDeleteOpen(false);
    setPendingDeleteIndex(null);
    setPendingDeleteTitle('');
  };

  const handleOpenEditModal = (audio: IAudio) => {
    setSelectedAudio(audio);
    setEditData({ title: audio.title, description: audio.description, url: audio.url });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAudio) return;

    try {
      await apiClient.put('/magazine/audio', {
        id: selectedAudio.id,
        title: editData.title,
        description: editData.description,
        url: editData.url,
      });

      if (setAudiosdb) {
        const updatedAudios = audiosdb.map((a) =>
          a.id === selectedAudio.id
            ? { ...a, title: editData.title, description: editData.description, url: editData.url }
            : a,
        );
        setAudiosdb(updatedAudios);
      }

      toast.success('Audio actualizado correctamente');
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error al actualizar audio:', error);
      toast.error('Error al actualizar el audio');
    }
  };
  const handleOpenEditNewModal = (index: number) => {
    const audio = newAudios[index];
    setEditNewIndex(index);
    setEditNewData({ title: audio.title, description: audio.description, url: audio.url });
    setIsEditNewOpen(true);
  };

  const handleSaveEditNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (editNewIndex === null) return;
    const updated = newAudios.map((a, i) => (i === editNewIndex ? { ...a, ...editNewData } : a));
    setNewAudios(updated);
    setIsEditNewOpen(false);
  };

  const safeAudiosdb = Array.isArray(audiosdb) ? audiosdb : [];
  const safeNewAudios = Array.isArray(newAudios) ? newAudios : [];

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-4">
      {/* Inputs */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Pegá la URL de SoundCloud"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del audio (opcional)"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción del audio"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />

      {/* Botón agregar */}
      <button
        onClick={handleAddAudio}
        disabled={loading}
        className="rounded-lg bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
      >
        {loading ? 'Agregando...' : 'Agregar audio'}
      </button>

      {/* Listas */}
      <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {/* EXISTENTES (DB) */}
        {safeAudiosdb.map((audio, index) => (
          <div
            key={`existing-${index}`}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            <iframe
              className="h-36 w-full"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={getSoundCloudEmbedUrl(audio.url)}
            />
            <div className="flex flex-col gap-2 p-4">
              <h3 className="line-clamp-1 text-lg font-semibold">{audio.title}</h3>
              <span
                dangerouslySetInnerHTML={{ __html: audio.description }}
                className="line-clamp-2 text-sm text-gray-600"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleOpenEditModal(audio)}
                  className="bg-brand-500 hover:bg-brand-600 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => handleAskDeleteAudio(index, true)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* NUEVOS (estado local) */}
        {safeNewAudios.map((audio, index) => (
          <div
            key={`new-${index}`}
            className="flex flex-col overflow-hidden rounded-xl border border-dashed border-green-300 bg-white shadow-lg"
          >
            <div className="px-3 pt-2 pb-0">
              <span className="text-xs font-semibold tracking-wide text-green-600 uppercase">
                Nuevo · pendiente de guardar
              </span>
            </div>
            <iframe
              className="h-36 w-full"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={getSoundCloudEmbedUrl(audio.url)}
            />
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-lg font-semibold">{audio.title}</h3>
              <span
                dangerouslySetInnerHTML={{ __html: audio.description }}
                className="text-sm text-gray-600"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleOpenEditNewModal(index)}
                  className="bg-brand-500 hover:bg-brand-600 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => handleAskDeleteAudio(index, false)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmationModal
        SetIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
        handleRequest={handleConfirmDeleteAudio}
        title={pendingDeleteTitle}
        option={ParlamentariaOptions.Audio}
        isAdd={false}
      />

      {/* Modal de Edición de Audio */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <div className="p-6">
          <form onSubmit={handleSaveEdit}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Editar Información del Audio
            </h4>
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  URL de SoundCloud
                </label>
                <input
                  type="text"
                  value={editData.url}
                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="https://soundcloud.com/..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Título del Audio
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Título..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Descripción
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Escribe una breve descripción..."
                  rows={4}
                />
              </div>
              {isValidSoundCloudUrl(editData.url) && (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    className="h-36 w-full"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={getSoundCloudEmbedUrl(editData.url)}
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex w-full items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 shadow-theme-xs rounded-lg px-4 py-3 text-sm font-medium text-white"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de Edición de Audio NUEVO */}
      <Modal isOpen={isEditNewOpen} onClose={() => setIsEditNewOpen(false)}>
        <div className="p-6">
          <form onSubmit={handleSaveEditNew}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Editar Audio Nuevo
            </h4>
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  URL de SoundCloud
                </label>
                <input
                  type="text"
                  value={editNewData.url}
                  onChange={(e) => setEditNewData({ ...editNewData, url: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="https://soundcloud.com/..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Título del Audio
                </label>
                <input
                  type="text"
                  value={editNewData.title}
                  onChange={(e) => setEditNewData({ ...editNewData, title: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Título..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Descripción
                </label>
                <textarea
                  value={editNewData.description}
                  onChange={(e) => setEditNewData({ ...editNewData, description: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Escribe una breve descripción..."
                  rows={4}
                />
              </div>
              {isValidSoundCloudUrl(editNewData.url) && (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    className="h-36 w-full"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={getSoundCloudEmbedUrl(editNewData.url)}
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex w-full items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditNewOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 shadow-theme-xs rounded-lg px-4 py-3 text-sm font-medium text-white"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
