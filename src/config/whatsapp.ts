/**
 * MENSAJES INICIALES DE WHATSAPP
 * ------------------------------------------------------------------
 * Texto que aparece escrito al abrir WhatsApp desde cada botón.
 * Edítalos libremente. Reglas:
 *  - Nunca incluyas datos de salud, síntomas ni resultados.
 *  - Mantén un tono amable y breve.
 * Los mensajes de cada servicio están en src/data/services.ts (campo `waMessage`).
 */
export const waMessages = {
  general: 'Hola, CESDMA. Me gustaría recibir información y coordinar una cita.',
  header: 'Hola, CESDMA. Me gustaría coordinar una cita.',
  hero: 'Hola, CESDMA. Me gustaría recibir información y coordinar una cita.',
  floating: 'Hola, CESDMA. Tengo una consulta.',
  specialties:
    'Hola, CESDMA. Me gustaría conocer las especialidades médicas disponibles y coordinar una consulta.',
  location: 'Hola, CESDMA. Quisiera confirmar la dirección y el horario de atención.',
  insurance: 'Hola, CESDMA. Quisiera saber si aceptan mi seguro médico (ARS).',
  prices: 'Hola, CESDMA. Quisiera conocer el precio de un estudio.',
  footer: 'Hola, CESDMA. Me gustaría recibir información.',
} as const;

export type WaContext = keyof typeof waMessages;
