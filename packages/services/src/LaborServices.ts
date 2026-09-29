class LaborServices {
    servidor: string | undefined;
    hashIdServLabor: string | undefined;

    constructor() {
        this.servidor = process.env.NEXT_PUBLIC_LABOR_URL;
        this.hashIdServLabor = process.env.NEXT_PUBLIC_LABOR_HASH;

        if (!this.servidor) {
            throw new Error('NEXT_PUBLIC_LABOR_URL is not defined');
        }
    }

    public async getAudiencias() {
        try {
            const res = await fetch(`${this.servidor}/AudienciasPublicas/GetAudiencias?hash=${this.hashIdServLabor}&bHabilitado=true&bPublicado=true&bProximas=true`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        } catch (error) {
            console.error('Error al obtener audiencias:', error);
            throw error;
        }
    }

}
export default new LaborServices();



