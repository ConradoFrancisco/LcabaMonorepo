export default async function AudienciaDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <h1>Audiencia Detalle {id}</h1>
        </div>
    )
}