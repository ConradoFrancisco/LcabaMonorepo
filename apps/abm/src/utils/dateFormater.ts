export default function formatDate(dateString: string): string {
  const fechaArgentina = new Date(dateString).toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return fechaArgentina;
}
