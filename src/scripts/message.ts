/**
 * Composición del mensaje del asistente de WhatsApp.
 * Módulo puro (sin DOM) para poder probarlo.
 */
export interface MessageInput {
  /** Nombre del servicio; vacío = mensaje general. */
  service: string;
  name: string;
  /** "mañana" | "tarde" | "" */
  time: string;
}

/** Limpia el nombre: solo letras, espacios, apóstrofo, punto y guion; máx. 60. */
export function cleanName(raw: string): string {
  return raw
    .normalize('NFC')
    .replace(/[^\p{L}\s'.-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
}

export function buildMessage({ service, name, time }: MessageInput): string {
  const parts = ['Hola, CESDMA.'];
  if (name) parts.push(`Mi nombre es ${name}.`);
  if (service && service !== 'otra consulta') {
    parts.push(`Quisiera información y coordinar una cita para: ${service}.`);
  } else {
    parts.push('Me gustaría recibir información y coordinar una cita.');
  }
  if (time === 'mañana' || time === 'tarde') parts.push(`Si es posible, prefiero en horario de la ${time}.`);
  return parts.join(' ');
}
