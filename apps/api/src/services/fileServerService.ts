// \Lcaba-Admin-API\src\services\fileServerService.ts

import fs from 'fs';
import path from 'path';

const FILE_SERVER_URL = process.env.FILE_SERVER_URL || 'http://127.0.0.1:3005/files-api';
const ADMIN_KEY = process.env.FILE_SERVER_ADMIN_KEY || '';
const READONLY_KEY = process.env.FILE_SERVER_READONLY_KEY || '';

export interface FileItem {
  name: string;
  size: number;
  modified: string;
  downloadUrl: string;
}

export interface UploadResult {
  ok: boolean;
  filename: string;
  bytes: number;
  downloadUrl: string;
  path: string;
  section: string;
  type: string;
}

export async function listFiles(): Promise<FileItem[]> {
  const res = await fetch(`${FILE_SERVER_URL}/list`, {
    headers: { 'X-API-Key': READONLY_KEY },
  });
  if (!res.ok) throw new Error(`Error al listar archivos: ${res.status}`);
  const data = await res.json();
  return data.files;
}

export async function uploadFromBuffer(
  buffer: Buffer,
  filename: string,
  section: string = 'otros',
  user: string = '-',
): Promise<UploadResult> {
  const res = await fetch(
    `${FILE_SERVER_URL}/upload?name=${encodeURIComponent(filename)}&section=${encodeURIComponent(section)}`,
    {
      method: 'POST',
      headers: {
        'X-API-Key': ADMIN_KEY,
        'Content-Type': 'application/octet-stream',
        'X-User': user,
      },
      body: new Uint8Array(buffer),
    },
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al subir archivo');
  }
  return res.json();
}

export async function uploadFromPath(
  filePath: string,
  filename?: string,
  section: string = 'otros',
  user: string = '-',
): Promise<UploadResult> {
  const name = filename || path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  return uploadFromBuffer(fileBuffer, name, section, user);
}

export async function downloadFile(filename: string): Promise<Buffer> {
  const res = await fetch(`${FILE_SERVER_URL}/files/${encodeURIComponent(filename)}`, {
    headers: { 'X-API-Key': READONLY_KEY },
  });
  if (!res.ok) throw new Error(`Archivo no encontrado: ${filename}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function deleteFile(filename: string): Promise<{ ok: boolean; deleted: string }> {
  const res = await fetch(`${FILE_SERVER_URL}/files/${encodeURIComponent(filename)}`, {
    method: 'DELETE',
    headers: { 'X-API-Key': ADMIN_KEY },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al eliminar archivo');
  }
  return res.json();
}
