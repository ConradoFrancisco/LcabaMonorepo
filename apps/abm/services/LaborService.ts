import apiClient from './apiClient';

class LaborService {
  public async getExpedienteByNroyAnio(numero: number, anio: number) {
    try {
      const response = await apiClient.post(
        '/labor/getExpedienteByNroyAnio',
        { numero, anio },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching expediente por nro y año:', error);
      throw error;
    }
  }

  public async GetDespachoNroAno(numero: number, anio: number) {
    try {
      const response = await apiClient.post('/labor/GetDespachoNroAno', {
        numero,
        anio,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Expediente por despacho', error);
      throw error;
    }
  }

  public async GetSancionNroDeLey(numero: number) {
    try {
      const response = await apiClient.post('/labor/GetSancionNroDeLey', {
        numero,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Sancion por Nro de Ley:', error);
      throw error;
    }
  }

  public async GetSancionNroOrdenAnoParlamentario(numero: number, anio: number) {
    try {
      const response = await apiClient.post(
        '/labor/GetSancionNroOrdenAnoParlamentario',
        { numero, anio },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Sanciones:', error);
      throw error;
    }
  }
  public async GetComisiones(title: string) {
    try {
      const response = await apiClient.get(
        '/labor/GetComisionesActivas',
        { params: { title } },
      );
      return response;
    } catch (error) {
      console.error('Error fetching comisionesActivas:', error);
      throw error;
    }
  }
  public async GetAudienciasPorRango(
    fch_desde: string,
    fch_hasta: string,
    page: number,
    limit: number,
  ) {
    try {
      const response = await apiClient.post(
        '/labor/getAudienciasPorRangoFecha',
        { fch_desde, fch_hasta },
        { params: { page, limit } },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching comisionesActivas:', error);
      throw error;
    }
  }
  public async getDiputados(search: string) {
    try {
      const response = await apiClient.post(
        '/labor/getDiputadosHistorico',
        { search },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching diputados:', error);
      throw error;
    }
  }
  public async GetSesionesAvanzado(
    fch_desde: string,
    fch_hasta: string,
    page: number,
    limit: number,
  ) {

    try {
      const response = await apiClient.post(
        '/labor/GetSesionesAvanzado',
        { fch_desde, fch_hasta },
        { params: { page, limit } },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching comisionesActivas:', error);
      throw error;
    }
  }
}
export default new LaborService();
