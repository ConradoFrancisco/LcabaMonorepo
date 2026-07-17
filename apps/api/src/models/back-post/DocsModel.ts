import path from 'path';
import sharp from 'sharp';
import axios from 'axios';
import pool from '../../db/dbConfig';

export interface file {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

interface FileServerResponse {
  location: string;
  filename: string;
  downloadUrl: string;
}

const FILE_SERVER_URL = process.env.FILE_SERVER_URL;
const FILE_SERVER_ADMIN_KEY = process.env.FILE_SERVER_ADMIN_KEY;

class DocsModel {
  private async uploadToFileServer(
    buffer: Buffer,
    originalName: string,
    section: string,
    usuario: string = '-',
  ): Promise<FileServerResponse> {
    if (!FILE_SERVER_URL || !FILE_SERVER_ADMIN_KEY) {
      throw new Error('Configuración de Fileserver incompleta en .env');
    }

    try {
      const url = `${FILE_SERVER_URL}/upload?name=${encodeURIComponent(originalName)}&section=${section}`;

      const response = await axios.post(url, buffer, {
        headers: {
          'X-API-Key': FILE_SERVER_ADMIN_KEY,
          'Content-Type': 'application/octet-stream',
          'X-User': usuario,
        },
      });

      if (response.data?.location && response.data?.filename) {
        return {
          location: response.data.location, // _pagedata/magazine_posts/imagenes
          filename: response.data.filename, // foto.jpg
          downloadUrl: response.data.downloadUrl,
        };
      }

      throw new Error('La respuesta del Fileserver no contiene los campos esperados');
    } catch (error: any) {
      console.error('❌ Error subiendo al Fileserver:', error.response?.data || error.message);
      throw new Error('Fallo al comunicar con el Fileserver');
    }
  }

  public async generateThumbnail(buffer: Buffer): Promise<Buffer> {
    return await sharp(buffer).resize(200).toBuffer();
  }

  public async saveImages(
    files: file[],
    seccion: string,
    table: string,
    postId: number,
    usuario: string = '-',
  ) {
    try {
      for (const file of files) {
        if (file.mimetype.startsWith('image/')) {
          try {
            // 1. Generar miniatura en memoria
            const thumbnailBuffer = await this.generateThumbnail(file.buffer);

            // 2. Subir original al Fileserver
            const originalData = await this.uploadToFileServer(
              file.buffer,
              file.originalname,
              seccion,
              usuario,
            );

            // 3. Subir miniatura al Fileserver (misma sección, prefijo tn_)
            const ext = path.extname(file.originalname);
            const base = path.basename(file.originalname, ext);
            const tnName = `tn_${base}${ext}`;
            const thumbnailData = await this.uploadToFileServer(
              thumbnailBuffer,
              tnName,
              seccion,
              usuario,
            );

            const query = `
              INSERT INTO docs (location, filename, mimetype, size, tn,title)
              VALUES (?, ?, ?, ?, ?,?)
            `;
            const values = [
              originalData.location, // _pagedata/magazine_posts/imagenes
              originalData.filename, // foto.jpg
              file.mimetype,
              file.size,
              thumbnailData.filename, // tn_foto.jpg
              originalData.filename,
            ];
            const [result]: any = await pool.query(query, values);
            const lastInsertId = result.insertId;

            let imageType = 'render';
            if (table === 'page') imageType = 'logo';

            const linkQuery = `
              INSERT INTO ${table}_docs (fk_iddoc, fk_id, image_type)
              VALUES (?, ?, ?)
            `;
            await pool.query(linkQuery, [lastInsertId, postId, imageType]);
          } catch (fileError) {
            console.error(`❌ Error procesando imagen ${file.originalname}:`, fileError);
          }
        }
      }

      const query = `
        SELECT * FROM ${table}_docs
        INNER JOIN docs ON ${table}_docs.fk_iddoc = docs.id
        WHERE ${table}_docs.fk_id = ?
      `;
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error('error al insertar imagenes', e);
    }
  }

  public async saveFiles(
    files: file[],
    seccion: string,
    table: string,
    postId: number,
    usuario: string = '-',
  ) {
    try {
      for (const file of files) {
        try {
          const fileData = await this.uploadToFileServer(
            file.buffer,
            file.originalname,
            seccion,
            usuario,
          );

          const query = `
            INSERT INTO docs (location, filename, mimetype, size)
            VALUES (?, ?, ?, ?)
          `;
          const values = [
            fileData.location, // _pagedata/magazine_posts/files
            fileData.filename, // documento.pdf
            file.mimetype,
            file.size,
          ];
          const [result]: any = await pool.query(query, values);
          const lastInsertId = result.insertId;

          const linkQuery = `
            INSERT INTO ${table}_files (fk_iddoc, fk_id)
            VALUES (?, ?)
          `;
          console.log(linkQuery)
          await pool.query(linkQuery, [lastInsertId, postId]);
        } catch (fileError) {
          console.error(`❌ Error procesando archivo ${file.originalname}:`, fileError);
        }
      }

      const query = `
        SELECT * FROM ${table}_files
        INNER JOIN docs ON ${table}_files.fk_iddoc = docs.id
        WHERE ${table}_files.fk_id = ?
      `;
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error('error al insertar archivos', e);
    }
  }
  public async updateImage({
    fk_iddoc,
    table,
    postId,
    type,
    title = '',
  }: {
    fk_iddoc: number;
    table: string;
    postId: number;
    type: string;
    title?: string;
  }) {
    try {
      const query = `
            UPDATE ${table}_docs SET image_type = ?
            WHERE fk_id = ? and fk_iddoc = ?
          `;
      const query2 = `
            UPDATE docs SET title = ?
            WHERE id = ?
          `;
      const values = [type, postId, fk_iddoc];
      const values2 = [title, fk_iddoc];
      await pool.query(query, values);
      await pool.query(query2, values2);
    } catch (fileError) {
      console.error(`❌ Error procesando archivo :`, fileError);
    }
  }

  public async deleteImage({
    fk_iddoc,
    table,
    postId,
  }: {
    fk_iddoc: number;
    table: string;
    postId: number;
  }) {
    try {
      const query = `
            DELETE FROM ${table}_docs 
            WHERE fk_id = ? AND fk_iddoc = ?
          `;
      const values = [postId, fk_iddoc];
      const [result]: any = await pool.query(query, values);
      return result;
    } catch (error) {
      console.error(`❌ Error eliminando relación de imagen :`, error);
      throw error;
    }
  }
  public async updateFile({
    fk_iddoc,
    table,
    postId,
    type,
    desc,
    status,
    title = '',
  }: {
    fk_iddoc: number;
    table: string;
    postId: number;
    type?: string;
    title?: string;
    desc?: string;
    status?: boolean;
  }) {
    try {
      let values = [];
      let values2 = [];
      let updateFields = [];
      if (type) {
        // Enforce lowercase enum values
        updateFields.push('file_type = ?');
        values.push(type.toLowerCase());
      }

      if (updateFields.length > 0) {
        const query = `
              UPDATE ${table}_files SET ${updateFields.join(', ')}
              WHERE fk_id = ? and fk_iddoc = ?
            `;
        values.push(postId, fk_iddoc);
        await pool.query(query, values);
      }

      let docsUpdateFields = [];
      if (title) {
        docsUpdateFields.push('title = ?');
        values2.push(title);
      }
      if (desc) {
        docsUpdateFields.push('description = ?');
        values2.push(desc);
      }
      if (status !== undefined) {
        docsUpdateFields.push('status = ?');
        values2.push(status);
      }

      if (docsUpdateFields.length > 0) {
        const query2 = `
              UPDATE docs SET ${docsUpdateFields.join(', ')}
              WHERE id = ?
            `;
        values2.push(fk_iddoc);
        await pool.query(query2, values2);
      }
    } catch (fileError) {
      console.error(`❌ Error procesando archivo :`, fileError);
    }
  }

  public async deleteFile({
    fk_iddoc,
    table,
    postId,
  }: {
    fk_iddoc: number;
    table: string;
    postId: number;
  }) {
    try {
      const query = `
            DELETE FROM ${table}_files 
            WHERE fk_id = ? AND fk_iddoc = ?
          `;
      const values = [postId, fk_iddoc];
      const [result]: any = await pool.query(query, values);
      return result;
    } catch (error) {
      console.error(`❌ Error eliminando relación de imagen :`, error);
      throw error;
    }
  }
}

export default new DocsModel();
