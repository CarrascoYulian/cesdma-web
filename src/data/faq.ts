import type { WaContext } from '../config/whatsapp';

/**
 * PREGUNTAS FRECUENTES
 * `verified: false` = respuesta redactada como orientación general; CESDMA
 * debe revisarla. Ninguna respuesta afirma precios, horarios ni seguros.
 */
export interface Faq {
  q: string;
  /** Texto plano (también se usa en los datos estructurados). */
  a: string;
  /** Si se añade, la respuesta incluye un enlace a WhatsApp con este contexto. */
  wa?: WaContext;
  verified: boolean;
}

export const faqs: Faq[] = [
  {
    q: '¿Cómo puedo solicitar una cita?',
    a: 'Escríbenos por WhatsApp indicando el servicio que necesitas. Desde allí coordinamos contigo la fecha, el horario y las indicaciones para tu cita.',
    wa: 'general',
    verified: true,
  },
  {
    q: '¿Qué estudios y servicios ofrece CESDMA?',
    a: 'Consulta médica general, más de 14 consultas especializadas, sonografías 4D, sonografía musculoesquelética, laboratorio clínico, electrocardiograma (EKG), ecocardiograma, estudios Doppler, Holter y MAPA (monitoreo ambulatorio de la presión arterial).',
    verified: true,
  },
  {
    q: '¿Qué consultas especializadas están disponibles?',
    a: 'CESDMA cuenta con más de 14 especialidades. Escríbenos con la especialidad que necesitas y te confirmamos disponibilidad y días de consulta.',
    wa: 'specialties',
    verified: true,
  },
  {
    q: '¿Cómo puedo saber el precio de un estudio o consulta?',
    a: 'Escríbenos por WhatsApp con el nombre del estudio o la consulta y te informamos el precio vigente.',
    wa: 'prices',
    verified: true,
  },
  {
    q: '¿Qué seguros médicos aceptan?',
    a: 'Escríbenos con el nombre de tu ARS y el servicio que necesitas, y te confirmamos si aplica la cobertura.',
    wa: 'insurance',
    verified: true,
  },
  {
    q: '¿Necesito alguna preparación antes de un estudio?',
    a: 'Depende del estudio. Algunos análisis de laboratorio, por ejemplo, pueden requerir ayuno. Antes de tu cita, confirma por WhatsApp si debes seguir alguna indicación.',
    verified: true,
  },
  {
    q: '¿Qué debo llevar el día de mi cita?',
    a: 'Como recomendación general: tu documento de identidad, el carnet de tu seguro si vas a usarlo, la indicación médica si la tienes y tus estudios anteriores relacionados. Al coordinar la cita te confirmamos si hace falta algo más.',
    verified: false,
  },
  {
    q: '¿Qué información debo enviar por WhatsApp?',
    a: 'Para coordinar tu cita basta con tu nombre y el servicio que te interesa. No es necesario enviar resultados, documentos clínicos ni detalles de salud por ese medio.',
    verified: true,
  },
];
