import { useEffect, useState } from 'react';
import GeneralService from '../../../../../../../../services/GeneralService';
import { ArrowUpDown, X, GripVertical, GitCompareArrows, Pencil } from 'lucide-react';
import Link from 'next/link';
import StatusChangeModal from '@/components/modals/StatusChangeModal';
import Badge from '@/components/ui/badge/Badge';

export default function PageSections({ pageId }: { pageId: number }) {
  const [sections, setSections] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderedSections, setOrderedSections] = useState<any[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusRowId, setSelectedStatusRowId] = useState<number | null>(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState<number>(1);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const fetchSections = async () => {
    try {
      const response = (await GeneralService.getAllSections({
        pageId: pageId,
        offset: 0,
        limit: 100,
      })) as any;
      if (response && response.data) {
        setSections(response.data);
      }
    } catch (error) {
      console.error('Error al obtener secciones:', error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [pageId]);

  const isActivo = (s: any) => {
    if (s.Estado?.data) return s.Estado.data[0] === 1;
    if (s.status?.data) return s.status.data[0] === 1;
    return s.Estado === 1 || s.Estado === true || s.status === 1 || s.status === true;
  };

  const activeSections = sections.filter(isActivo);

  const handleOpenModal = () => {
    // Inicializar las secciones ordenadas cuando se abre el modal
    const sortedActive = [...activeSections].sort(
      (a, b) => (a.Orden ?? a.orderby) - (b.Orden ?? b.orderby),
    );
    setOrderedSections(sortedActive);
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrdered = [...orderedSections];
    const draggedItem = newOrdered[draggedIndex];

    newOrdered.splice(draggedIndex, 1);
    newOrdered.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setOrderedSections(newOrdered);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSaveOrder = async () => {
    // Acá se debería enviar el nuevo orden al backend
    const newOrderData = orderedSections.map((s, idx) => ({ id: s.id, orderby: idx }));
    console.log('Guardar nuevo orden:', newOrderData);

    // TODO: Llamar al servicio para guardar
    // await GeneralService.updateSectionsOrder(newOrderData)

    // Actualizamos localmente para que se vea reflejado
    const updatedSections = sections.map((s) => {
      const indexInOrdered = newOrderData.findIndex((no) => no.id === s.id);
      if (indexInOrdered !== -1) {
        return { ...s, Orden: indexInOrdered, orderby: indexInOrdered };
      }
      return s;
    });
    setSections(updatedSections);
    setIsModalOpen(false);
  };

  const handleStatusClick = (id: number, currentStatus: number) => {
    setSelectedStatusRowId(id);
    setSelectedRowStatus(currentStatus);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async (newStatus: number) => {
    if (selectedStatusRowId === null) return;
    setIsChangingStatus(true);
    try {
      await GeneralService.changeSectionStatus(selectedStatusRowId, newStatus);
      setIsStatusModalOpen(false);
      setSelectedStatusRowId(null);
      await fetchSections();
    } catch (error) {
      console.error('Error al cambiar el estado', error);
    } finally {
      setIsChangingStatus(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Bar / Sort Button */}
      <div
        className="flex cursor-pointer items-center gap-2 rounded-t-sm bg-[#4ebdec] p-3 text-white transition-colors hover:bg-[#3ea8d6]"
        onClick={handleOpenModal}
      >
        <span className="text-sm font-semibold">
          Para ordenar las secciones haga click (solo activos se ordenan)
        </span>
        <ArrowUpDown size={16} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-sm border border-t-0 border-gray-200">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-200 bg-white">
            <tr>
              <th className="w-16 p-4 font-bold">#</th>
              <th className="p-4 font-bold">Titulo</th>
              <th className="p-4 font-bold">Orden</th>
              <th className="p-4 font-bold">Activo</th>
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sections
              .sort((a, b) => (a.Orden ?? a.orderby) - (b.Orden ?? b.orderby))
              .map((section, index) => (
                <tr
                  key={section.id}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-4 font-medium">{section.id}</td>
                  <td className="p-4 text-gray-800">{section.Titulo || section.title}</td>
                  <td className="p-4">{section.Orden ?? section.orderby}</td>
                  <td className="p-4">
                    <Badge size="sm" color={isActivo(section) ? 'success' : 'warning'}>
                      {isActivo(section) ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStatusClick(section.id, isActivo(section) ? 1 : 0)}
                        className="hover:text-brand-500 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
                        title="Cambiar estado"
                      >
                        <GitCompareArrows size={18} />
                      </button>
                      <Link
                        href={`/general/secciones/edit/${section.id}`}
                        className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            {sections.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay secciones para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Ordenar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="m-4 flex w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold text-gray-800">Ordenar Secciones Activas</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 transition-colors hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto bg-gray-50 p-4">
              <p className="mb-2 text-sm text-gray-500">
                Arrastra y suelta para cambiar el orden de las secciones en la página.
              </p>
              {orderedSections.map((section, index) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  className={`flex cursor-grab items-center gap-3 rounded border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:border-blue-300 active:cursor-grabbing ${draggedIndex === index ? 'border-dashed border-blue-400 opacity-50' : ''}`}
                >
                  <GripVertical size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-700">
                    {index}. {section.Titulo || section.title}
                  </span>
                </div>
              ))}
              {orderedSections.length === 0 && (
                <div className="py-4 text-center text-sm text-gray-500">
                  No hay secciones activas para ordenar.
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 rounded-b-lg border-t bg-white p-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={handleSaveOrder}
              >
                Guardar Orden
              </button>
            </div>
          </div>
        </div>
      )}

      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        currentStatus={selectedRowStatus}
        isLoading={isChangingStatus}
      />
    </div>
  );
}
