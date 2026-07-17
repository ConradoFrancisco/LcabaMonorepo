import { FileText, FileArchive, File } from 'lucide-react';
import { FaFilePdf, FaFileWord, FaFileExcel } from 'react-icons/fa'; // opcional si querés más realistas

export const getFileIcon = (file: File | string) => {
  if (typeof file === 'string') return <File className="h-8 w-8 text-gray-400" />;

  const ext = file.name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return <FaFilePdf className="h-8 w-8 text-red-500" />;
    case 'doc':
    case 'docx':
    case 'dotx':
      return <FaFileWord className="h-8 w-8 text-blue-600" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FaFileExcel className="h-8 w-8 text-green-600" />;
    case 'zip':
    case 'rar':
    case '7z':
    case '001':
    case '002':
      return <FileArchive className="h-8 w-8 text-yellow-500" />;
    default:
      return <FileText className="h-8 w-8 text-gray-500" />;
  }
};
