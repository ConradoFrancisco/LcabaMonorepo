import { useState } from 'react';
import { exportarPDF, exportarExcel } from '@/utils/exportUtils';
import { BaseResponse } from '@/hooks/useData';

interface ParametrosExportar {
  obtenerTodos: (params: {
    offset?: number;
    limit?: number;
    input?: string;
    table?: string;
    filtros?: any;
  }) => Promise<BaseResponse<any>>;
  tabla: string;
  filtros: any;
  busqueda: string;
  claves: string[];
  nombreArchivo: string;
  titulo: string;
}

export function useExportar({
  obtenerTodos,
  tabla,
  filtros,
  busqueda,
  claves,
  nombreArchivo,
  titulo,
}: ParametrosExportar) {
  const [exportando, setExportando] = useState(false);

  const handleExportar = async (formato: 'pdf' | 'excel') => {
    setExportando(true);
    try {
      const respuesta = await obtenerTodos({
        offset: 0,
        limit: 100000,
        input: busqueda,
        table: tabla,
        filtros,
      });
      if (formato === 'excel') {
        await exportarExcel(respuesta.data, claves, nombreArchivo);
      } else {
        await exportarPDF(respuesta.data, claves, nombreArchivo, titulo);
      }
    } catch (error) {
      console.error('Error al exportar:', error);
    } finally {
      setExportando(false);
    }
  };

  return { handleExportar, exportando };
}
