'use client';

import { useState } from 'react';
import { Modal } from '../../ui/modal';
import { toast } from 'react-toastify';
import apiClient from '../../../../services/apiClient';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmationModal, {
  ParlamentariaOptions,
} from './InfoParlamentaria/components/modals/ConfirmationModal';

interface VideoItem {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

interface NewVideoItem {
  url: string;
  title: string;
  description: string;
}

export default function VideoList({
  videosdb,
  setVideosdb,
  newVideos,
  setNewVideos,
  table = 'magazine_',
}: {
  videosdb: VideoItem[];
  setVideosdb?: (newVids: VideoItem[]) => void;
  newVideos?: NewVideoItem[];
  setNewVideos: (newVids: NewVideoItem[]) => void;
  // Prefijo de sección para que delete/edit peguen en la tabla correcta:
  // Prensa -> ' ' | Cultura -> 'cultura_' | Revista -> 'magazine_'
  table?: string;
}) {
  const [url, setUrl] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para el Modal de Edición de videos EXISTENTES (db)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    url: '',
  });

  // Estados para el Modal de Edición de videos NUEVOS
  const [isEditNewOpen, setIsEditNewOpen] = useState(false);
  const [editNewIndex, setEditNewIndex] = useState<number | null>(null);
  const [editNewData, setEditNewData] = useState({ title: '', description: '', url: '' });

  // Estados para el Modal de Confirmación de eliminación
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
  const [pendingDeleteIsExisting, setPendingDeleteIsExisting] = useState(false);
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState('');

  const getYoutubeId = (youtubeUrl: string) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const fetchYoutubeTitle = async (videoUrl: string) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${videoUrl}&format=json`);
      if (!response.ok) throw new Error('Error al obtener el título');
      const data = await response.json();
      return data.title as string;
    } catch {
      return 'Video sin título';
    }
  };

  const handleAddVideo = async () => {
    const id = getYoutubeId(url);
    if (!id) {
      alert('Debes ingresar una URL válida de YouTube');
      return;
    }

    setLoading(true);
    let finalTitle = titulo.trim();

    if (!finalTitle) {
      finalTitle = await fetchYoutubeTitle(url);
    }

    const newVideo: NewVideoItem = {
      url,
      title: finalTitle,
      description: descripcion.trim(),
    };

    if (newVideos) {
      setNewVideos([...newVideos, newVideo]);
    } else {
      setNewVideos([newVideo]);
    }

    setUrl('');
    setTitulo('');
    setDescripcion('');
    setLoading(false);
  };

  const handleAskDeleteVideo = (index: number, isExisting: boolean) => {
    const title = isExisting
      ? videosdb[index]?.title || 'este video'
      : newVideos?.[index]?.title || 'este video';
    setPendingDeleteIndex(index);
    setPendingDeleteIsExisting(isExisting);
    setPendingDeleteTitle(title);
    setIsDeleteOpen(true);
  };

  const handleConfirmDeleteVideo = async () => {
    if (pendingDeleteIndex === null) return;

    if (pendingDeleteIsExisting) {
      const video = videosdb[pendingDeleteIndex];
      try {
        await apiClient.delete(`/magazine/video/${video.id}`, {
          params: { table },
        });
        if (setVideosdb) {
          setVideosdb(videosdb.filter((_, i) => i !== pendingDeleteIndex));
        }
        toast.success('Video eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar video:', error);
        toast.error('Error al eliminar el video');
      }
    } else {
      if (newVideos) {
        setNewVideos(newVideos.filter((_, i) => i !== pendingDeleteIndex));
      }
    }

    setIsDeleteOpen(false);
    setPendingDeleteIndex(null);
    setPendingDeleteTitle('');
  };

  const handleOpenEditModal = (video: VideoItem) => {
    setSelectedVideo(video);
    setEditData({
      title: video.title,
      description: video.description,
      url: video.url,
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) return;

    try {
      await apiClient.put('/magazine/video', {
        id: selectedVideo.id,
        title: editData.title,
        description: editData.description,
        url: editData.url,
        table,
      });

      // Actualizar el estado local (videosdb en el padre) si el setter existe
      if (setVideosdb) {
        const updatedVideos = videosdb.map((v) =>
          v.id === selectedVideo.id
            ? {
              ...v,
              title: editData.title,
              description: editData.description,
              url: editData.url,
            }
            : v,
        );
        setVideosdb(updatedVideos);
      }

      toast.success('Video actualizado correctamente');
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error al actualizar video:', error);
      toast.error('Error al actualizar el video');
    }
  };

  const handleOpenEditNewModal = (index: number) => {
    const video = newVideos?.[index];
    if (!video) return;
    setEditNewIndex(index);
    setEditNewData({ title: video.title, description: video.description, url: video.url });
    setIsEditNewOpen(true);
  };

  const handleSaveEditNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (editNewIndex === null || !newVideos) return;
    const updated = newVideos.map((v, i) => (i === editNewIndex ? { ...v, ...editNewData } : v));
    setNewVideos(updated);
    setIsEditNewOpen(false);
  };

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-4">
      {/* Inputs para datos */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Pegá la URL de YouTube"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del video (opcional)"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción del video"
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Botón agregar */}
      <button
        onClick={handleAddVideo}
        disabled={loading}
        className="rounded-lg bg-green-600 px-4 py-2 text-white shadow transition hover:bg-green-700"
      >
        {loading ? 'Agregando...' : 'Agregar video'}
      </button>

      {/* Lista de videos EXISTENTES (de DB) */}
      <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {videosdb?.map((video, index) => (
          <div
            key={`existing-${index}`}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(video.url)}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="line-clamp-1 text-lg font-semibold">{video.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">{video.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleOpenEditModal(video)}
                  className="bg-brand-500 hover:bg-brand-600 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => handleAskDeleteVideo(index, true)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Lista de NUEVOS videos */}
        {newVideos?.map((video, index) => (
          <div
            key={`new-${index}`}
            className="flex flex-col overflow-hidden rounded-xl border border-dashed border-green-300 bg-white shadow-lg"
          >
            <div className="px-3 pt-2 pb-0">
              <span className="text-xs font-semibold tracking-wide text-green-600 uppercase">
                Nuevo · pendiente de guardar
              </span>
            </div>
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(video.url)}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleOpenEditNewModal(index)}
                  className="bg-brand-500 hover:bg-brand-600 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => handleAskDeleteVideo(index, false)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edición de Video EXISTENTE */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="m-4 w-full max-w-[550px]"
      >
        <div className="p-6">
          <form onSubmit={handleSaveEdit}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Editar Información del Video
            </h4>
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  URL de YouTube
                </label>
                <input
                  type="text"
                  value={editData.url}
                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Título del Video
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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Vista Previa
                </label>
                <div className="relative mx-auto aspect-video w-full max-w-[360px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  {getYoutubeId(editData.url) && (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${getYoutubeId(editData.url)}`}
                      title="Vista previa"
                    />
                  )}
                </div>
              </div>
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

      {/* Modal de Edición de Video NUEVO */}
      <Modal
        isOpen={isEditNewOpen}
        onClose={() => setIsEditNewOpen(false)}
        className="m-4 w-full max-w-[550px]"
      >
        <div className="p-6">
          <form onSubmit={handleSaveEditNew}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Editar Video Nuevo
            </h4>
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  URL de YouTube
                </label>
                <input
                  type="text"
                  value={editNewData.url}
                  onChange={(e) => setEditNewData({ ...editNewData, url: e.target.value })}
                  className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Título del Video
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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Vista Previa
                </label>
                <div className="relative mx-auto aspect-video w-full max-w-[360px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  {getYoutubeId(editNewData.url) && (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${getYoutubeId(editNewData.url)}`}
                      title="Vista previa"
                    />
                  )}
                </div>
              </div>
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

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmationModal
        SetIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
        handleRequest={handleConfirmDeleteVideo}
        title={pendingDeleteTitle}
        option={ParlamentariaOptions.Video}
        isAdd={false}
      />
    </div>
  );
}
