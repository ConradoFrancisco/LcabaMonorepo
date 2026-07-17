import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';

const SIGLAS = ['id', 'url', 'api', 'html', 'css', 'pdf', 'dni', 'cuit'];

function formatearEncabezado(clave: string): string {
  return clave
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()
    .split(' ')
    .map((palabra) => {
      const enMinuscula = palabra.toLowerCase();
      if (SIGLAS.includes(enMinuscula)) return palabra.toUpperCase();
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(' ');
}

function serializarCelda(clave: string, valor: unknown): string {
  if (valor === null || valor === undefined || String(valor).trim().toLowerCase() === 'null') {
    return '';
  }
  if (typeof valor === 'object' && valor !== null && 'data' in valor) {
    const primero = (valor as { data?: unknown[] }).data?.[0];
    if (clave === 'status' || clave === 'estado') {
      return primero === 1 ? 'Activo' : 'Inactivo';
    }
    return primero === 1 ? 'Sí' : 'No';
  }
  if (typeof valor === 'object') return '';
  return String(valor);
}

function construirTabla(
  datos: any[],
  claves: string[],
): { encabezados: string[]; filas: string[][] } {
  const encabezados = claves.map(formatearEncabezado);
  const filas = datos.map((fila) => claves.map((clave) => serializarCelda(clave, fila[clave])));
  return { encabezados, filas };
}

const ANCHOS_COLUMNAS: Record<string, number> = {
  id: 18,
  titulo: 75,
  title: 75,
  status: 24,
  estado: 24,
  tipo: 36,
  tipo_post: 36,
  destacado: 22,
  desta: 22,
  ultimaAccion: 36,
  url: 18,
};

async function cargarImagenBase64(url: string): Promise<string> {
  const respuesta = await fetch(url);
  const blob = await respuesta.blob();
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onloadend = () => resolve(lector.result as string);
    lector.onerror = reject;
    lector.readAsDataURL(blob);
  });
}

export async function exportarPDF(
  datos: any[],
  claves: string[],
  nombreArchivo: string,
  titulo: string,
) {
  const { encabezados, filas } = construirTabla(datos, claves);
  const doc = new jsPDF({ orientation: 'landscape' });
  const anchoHoja = doc.internal.pageSize.getWidth();
  const altoHoja = doc.internal.pageSize.getHeight();

  const anchoLogo = 70;
  const altoLogo = 26;
  const xLogo = (anchoHoja - anchoLogo) / 2;
  let inicioTabla = 22;

  try {
    const base64 = await cargarImagenBase64('/images/logo/logoLegislatura.png');
    doc.addImage(base64, 'PNG', xLogo, 10, anchoLogo, altoLogo);
    inicioTabla = 10 + altoLogo + 6;
  } catch {
    // sigue sin logo si no se puede cargar
  }

  doc.setFontSize(11);
  doc.setTextColor(40);
  doc.text(titulo, anchoHoja / 2, inicioTabla, { align: 'center' });
  inicioTabla += 7;

  const estilosColumnas = Object.fromEntries(
    claves.map((clave, i) => {
      const ancho = ANCHOS_COLUMNAS[clave];
      return [i, ancho ? { cellWidth: ancho } : { cellWidth: 'auto' }];
    }),
  );

  autoTable(doc, {
    head: [encabezados],
    body: filas,
    startY: inicioTabla,
    styles: { fontSize: 7, overflow: 'linebreak', cellPadding: 2 },
    headStyles: { fillColor: [41, 128, 185], fontStyle: 'bold', fontSize: 7 },
    columnStyles: estilosColumnas,
    tableWidth: 'auto',
  });

  const totalPaginas = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${totalPaginas}`, anchoHoja / 2, altoHoja - 6, { align: 'center' });
  }

  doc.save(`${nombreArchivo}.pdf`);
}

export async function exportarExcel(datos: any[], claves: string[], nombreArchivo: string) {
  const { encabezados, filas } = construirTabla(datos, claves);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Datos');

  // Agregar encabezados y filas
  sheet.addRow(encabezados);
  filas.forEach((fila) => sheet.addRow(fila));

  // Estilizar fila de encabezados
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2980B9' },
  };

  // Auto-ancho de columnas basado en contenido
  sheet.columns.forEach((col) => {
    let maxLen = 10;
    col.eachCell?.({ includeEmpty: true }, (cell) => {
      const len = cell.value ? String(cell.value).length : 0;
      if (len > maxLen) maxLen = len;
    });
    col.width = Math.min(maxLen + 4, 60);
  });

  // Generar buffer y descargar en el navegador
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nombreArchivo}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
