import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const { LABOR_SERVICES } = process.env;

class LaborServiceModel {
  private async fetchAndParseXml(endpoint: string, params?: URLSearchParams) {
    try {
      const url = `${LABOR_SERVICES}/${endpoint}`;

      const response = await axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/xml',
        },
        responseType: 'text',
      });

      const xmlData = response.data;

      return await parseStringPromise(xmlData, { explicitArray: false });
    } catch (error) {
      console.error(`❌ Error en fetchAndParseXml para ${endpoint}:`, error);
      throw new Error(`Fallo al comunicar con Labor Parlam. API: ${endpoint}`);
    }
  }

  public async getExpedienteByNroyAnio({ numero, anio }: { numero: number; anio: number }) {
    try {
      const params = new URLSearchParams({
        NroExpediente: numero.toString(),
        AnioExpediente: anio.toString(),
      });
      const data = await this.fetchAndParseXml(`GetExpedienteByNroyAnio`, params);
      console.log(data);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getExpedienteById({ id }: { id: number }) {
    try {
      const params = new URLSearchParams({
        IdExpediente: id as unknown as string,
        NumeroOrden: '',
        AnoParlamentario: '',
        IdExpedientes: '',
      });

      const data = await this.fetchAndParseXml(`GetExpedienteDatosBasicos`, params);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getDespachoNroAno({ numero, anio }: { numero: number; anio: number }) {
    try {
      const params = new URLSearchParams({
        nroDespacho: numero as unknown as string,
        anoDespacho: anio as unknown as string,
      });
      const data = await this.fetchAndParseXml(`GetDespachoNroAno`, params);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getSancionNroDeLey({ numero }: { numero: number }) {
    try {
      const params = new URLSearchParams({
        NroDeLey: numero as unknown as string,
      });
      const data = await this.fetchAndParseXml(`GetSancionNroDeLey`, params);

      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getSancionNroOrdenAnoParlamentario({
    numero,
    anio,
  }: {
    numero: number;
    anio: number;
  }) {
    try {
      const params = new URLSearchParams({
        nroOrden: numero as unknown as string,
        anoParlamentario: anio as unknown as string,
      });
      const data = await this.fetchAndParseXml(`GetSancionNroOrdenAnoParlamentario`, params);

      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getComisionByNombre(title: string) {
    if (title === '') {
      return [];
    }
    try {
      const response = await axios.get(`${LABOR_SERVICES}/GetComisionesActivas`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/xml',
        },
        responseType: 'text',
      });

      const xmlData = response.data;
      const jsonData = await parseStringPromise(xmlData, {
        explicitArray: false,
      });

      const normalizedTitle = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const data = jsonData?.ArrayOfComisiones?.comisiones.filter((dato: any) => {
        const normalizedDatoNombre = dato.nombre
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return normalizedDatoNombre.includes(normalizedTitle);
      });

      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getComisionById(id: string) {
    try {
      const response = await axios.get(`${LABOR_SERVICES}/GetComisionesActivas`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/xml',
        },
        responseType: 'text',
      });

      const xmlData = response.data;
      const jsonData = await parseStringPromise(xmlData, {
        explicitArray: false,
      });

      const data = jsonData?.ArrayOfComisiones?.comisiones.filter(
        (dato: any) => dato.id_comision === id.toString(),
      );
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getAudienciasPorRangoFecha(
    fch_desde: string,
    fch_hasta: string,
    page: number = 1,
    limit: number = 10,
  ) {
    // formato AAAA/MM/DD

    const params = new URLSearchParams({
      fch_desde: fch_desde as unknown as string,
      fch_hasta: fch_hasta as unknown as string,
    });

    try {
      const rawData = await this.fetchAndParseXml(`GetAudienciasByRangoFecha`, params);

      const audienciasPorFecha = rawData.RespuestaOfFechaAudiencia.Listado.FechaAudiencia;
      if (!audienciasPorFecha) {
        return;
      }

      let allAudiencias: any[] = [];

      for (const grupo of audienciasPorFecha) {
        let audienciasEnGrupo = grupo.Lista.Audiencia;
        if (!Array.isArray(audienciasEnGrupo)) {
          audienciasEnGrupo = [audienciasEnGrupo];
        }
        const audienciasConFecha = audienciasEnGrupo.map((audiencia: any) => ({
          ...audiencia,
          fecha_agrupacion: grupo.Fecha.trim(), // Agregamos la fecha de agrupación
        }));

        // 4. Concatenar al array final
        allAudiencias = allAudiencias.concat(audienciasConFecha);
      }

      if (!allAudiencias || allAudiencias.length === 0) {
        return { data: [], totalItems: 0, totalPages: 0 };
      }

      // 2. Lógica de paginación y slicing
      const totalItems = allAudiencias.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = allAudiencias.slice(startIndex, endIndex);

      // 3. (Aquí se aplicaría mapAudienciaToDTO(results))

      return {
        data: results,
        page,
        limit,
        totalItems,
        totalPages,
      };
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getAudienciaById(id: string) {
    const params = new URLSearchParams({
      id_audiencia: id as unknown as string,
      id_expediente: '',
      id_comision: '',
    });

    try {
      const data = await this.fetchAndParseXml(`GetAudiencias`, params);

      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  public async getSesionesAvanzado(
    fch_desde: string,
    fch_hasta: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const params = new URLSearchParams({
      FechaDesde: fch_desde as unknown as string,
      FechaHasta: fch_hasta as unknown as string,
    });

    try {
      const data = await this.fetchAndParseXml(`GetSesionesAvanzado`, params);
      console.log(data);

      const sesionesRaw = data?.ArrayOfSesiones?.sesiones;
      if (!sesionesRaw) {
        return { data: [], totalItems: 0, totalPages: 0, page, limit };
      }

      const allSesiones = Array.isArray(sesionesRaw) ? sesionesRaw : [sesionesRaw];

      const totalItems = allSesiones.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = allSesiones.slice(startIndex, endIndex);

      return {
        data: results,
        page,
        limit,
        totalItems,
        totalPages,
      };
    } catch (error) {
      console.error('❌ Error en getSesionesAvanzado:', error);
      return { data: [], totalItems: 0, totalPages: 0, page, limit };
    }
  }

  public async getDiputadosHistorico(search: string = '') {
    try {
      const params = new URLSearchParams({
        search: (search || '') as unknown as string,
      });

      const data = await this.fetchAndParseXml(`GetDiputadosHistorico`, params);
      const listadoRaw = data?.RespuestaOfdiputadosHistorico?.Listado?.diputadosHistorico;
      if (!listadoRaw) {
        return [];
      }

      const listado = Array.isArray(listadoRaw) ? listadoRaw : [listadoRaw];

      if (!search || search.trim() === '') {
        return listado;
      }

      const normalizedSearch = search
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return listado.filter((diputado: any) => {
        const nombre = (diputado.nombre || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const apellido = (diputado.apellido || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return nombre.includes(normalizedSearch) || apellido.includes(normalizedSearch);
      });
    } catch (error) {
      console.error('❌ Error:', error);
      return [];
    }
  }

  public async getDiputadosbyId(id: string) {
    const params = new URLSearchParams({
      id_legislador: id as unknown as string,
    });

    try {
      const data = await this.fetchAndParseXml(`GetDiputadoDatos`, params);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
  public async getSesionById(id: string) {
    const params = new URLSearchParams({
      idSesionLabor: id as unknown as string,
    });

    try {
      const data = await this.fetchAndParseXml(`GetSesionById`, params);
      return data;
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
}
export default new LaborServiceModel();
