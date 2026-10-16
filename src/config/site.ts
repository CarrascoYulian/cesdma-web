/**
 * CONFIGURACIÓN INSTITUCIONAL DE CESDMA
 * ------------------------------------------------------------------
 * Este es el ÚNICO lugar donde se editan los datos del centro.
 * Cada dato lleva `verified`: ponlo en `true` solo cuando CESDMA lo
 * haya confirmado. Mientras esté en `false`, el sitio muestra una
 * etiqueta "Por confirmar" (si PUBLIC_SHOW_PENDING no es "false") y el
 * dato NO se incluye en los datos estructurados para Google.
 *
 * `npm run check:data` lista todo lo pendiente.
 */

export interface Verifiable<T> {
  value: T;
  verified: boolean;
  /** De dónde salió el dato. */
  source: string;
  /** Qué falta confirmar. */
  note?: string;
}

export interface HoursRow {
  /** Ej.: "Lunes a viernes" */
  days: string;
  /** Ej.: "8:00 a. m. – 5:00 p. m." */
  time: string;
  /** Días en formato schema.org para los datos estructurados. */
  schemaDays: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;
  /** 24 h, "08:00" */
  opens: string;
  closes: string;
}

export interface Doctor {
  name: string;
  specialty: string;
  /** Credenciales publicadas y verificadas (exequátur, colegiatura, etc.). */
  credentials?: string;
  /** Ruta en /public, ej. "/team/dra-ejemplo.webp" (con permiso de uso). */
  photo?: string;
}

export interface GalleryImage {
  /** Ruta en /public, ej. "/gallery/recepcion.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
}

const BRIEF = 'Brief del cliente (15 oct 2026)';

/** Tipa un dato como `Verifiable` (así `note` existe aunque el dato ya esté verificado). */
const verifiable = <T>(d: Verifiable<T>): Verifiable<T> => d;

export const site = {
  shortName: 'CESDMA',
  legalName: 'Centro de Sonografía y Diagnósticos Médico Dra. Cruzveris Martínez',
  tagline: 'Atención cercana y estudios diagnósticos en un mismo lugar.',

  /**
   * Logo: emblema extraído del logotipo oficial + nombre "CESDMA" como texto.
   * La imagen recibida estaba recortada (el texto del logo se corta), por eso el
   * nombre se compone en HTML. Con el archivo original completo se puede usar entero.
   */
  logo: {
    emblem: '/brand/emblema.webp',
    /** Versión PNG en alta resolución (datos estructurados, redes). */
    emblemPng: '/brand/emblema.png',
    width: 312,
    height: 222,
    isPlaceholder: false,
  },

  phone: verifiable({
    value: { display: '809-549-8560', e164: '+18095498560' },
    verified: true,
    source: 'Instagram oficial @cesdma (captura enviada por el cliente, 15 oct 2026)',
  }),

  whatsapp: {
    /** Solo dígitos, formato internacional sin "+": 1 + código de área + número. */
    value: '18095498560',
    verified: false,
    source: 'Mismo número publicado en Instagram',
    note: 'El número está confirmado; falta confirmar que tiene WhatsApp activo.',
  } satisfies Verifiable<string>,

  address: verifiable({
    value: {
      street: 'Calle Mella #58',
      sector: 'Valiente, La Caleta',
      city: 'Santo Domingo',
      region: 'Santo Domingo',
      country: 'DO',
      countryName: 'República Dominicana',
      reference: 'Próximo a la marginal de Las Américas',
    },
    verified: true,
    source: 'Instagram oficial @cesdma (captura enviada por el cliente, 15 oct 2026). La referencia "próximo a la marginal" viene del brief.',
  }),

  /** Coordenadas exactas para el mapa. `null` = se busca por dirección. */
  geo: {
    value: { lat: 18.459206, lng: -69.697304 } as null | { lat: number; lng: number },
    verified: true,
    source: 'Instagram oficial @cesdma (captura enviada por el cliente, 15 oct 2026): enlace maps.google.com/?q=18.459206,-69.697304',
  } satisfies Verifiable<null | { lat: number; lng: number }>,

  hours: {
    value: [] as HoursRow[],
    verified: false,
    source: 'Sin datos: Instagram/Facebook no accesibles de forma automatizada',
    note: 'Pedir horario de atención por día.',
  } satisfies Verifiable<HoursRow[]>,

  email: {
    value: 'infocesdma@gmail.com',
    verified: true,
    source: 'Instagram oficial @cesdma (captura enviada por el cliente, 15 oct 2026)',
  } satisfies Verifiable<string>,

  instagram: {
    value: { url: 'https://www.instagram.com/cesdma/', handle: '@cesdma' },
    verified: true,
    source: BRIEF + ': "Instagram oficial"',
  } satisfies Verifiable<{ url: string; handle: string }>,

  facebook: {
    value: { url: 'https://www.facebook.com/CESDMA/' },
    verified: false,
    source: 'Resultado de búsqueda web con el nombre completo del centro',
    note: 'Confirmar que la página de Facebook es oficial antes de enlazarla.',
  } satisfies Verifiable<{ url: string }>,

  /** "Más de 14 consultas especializadas" — dato aportado por el cliente. */
  specialtiesCount: {
    value: 14,
    verified: true,
    source: BRIEF,
  } satisfies Verifiable<number>,

  /** Listado oficial de especialidades. Vacío = se invita a consultar por WhatsApp. */
  specialties: {
    value: [] as string[],
    verified: false,
    source: 'Sin datos',
    note: 'Pedir el listado oficial de especialidades con su nombre exacto.',
  } satisfies Verifiable<string[]>,

  /** Médicos con permiso y credenciales verificadas. Vacío = no se muestra la sección de perfiles. */
  doctors: [] as Doctor[],

  /** ARS / seguros aceptados. Vacío = la FAQ invita a consultar. */
  insurers: {
    value: [] as string[],
    verified: false,
    source: 'Sin datos',
    note: 'Pedir listado de ARS aceptadas.',
  } satisfies Verifiable<string[]>,

  /** Foto principal del hero (autorizada). `null` = composición gráfica de marca. */
  heroImage: null as null | GalleryImage,

  /** Galería de instalaciones (fotos reales y autorizadas). Vacía = la sección no se muestra. */
  gallery: [] as GalleryImage[],
} as const;

export type Site = typeof site;

/** Muestra etiquetas "Por confirmar". Por defecto, sí. */
export const SHOW_PENDING = import.meta.env?.PUBLIC_SHOW_PENDING !== 'false';

export const fullAddress = (a = site.address.value) =>
  `${a.street}, ${a.sector}, ${a.city}, ${a.countryName}`;

/** Enlace a Google Maps (abre la app en el móvil). */
export const mapsUrl = (): string => {
  const g = site.geo.value;
  const q = g ? `${g.lat},${g.lng}` : `${site.shortName}, ${fullAddress()}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};

export const directionsUrl = (): string => {
  const g = site.geo.value;
  const q = g ? `${g.lat},${g.lng}` : fullAddress();
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
};

export const mapEmbedUrl = (): string => {
  const g = site.geo.value;
  const q = g ? `${g.lat},${g.lng}` : `${site.shortName}, ${fullAddress()}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
};
