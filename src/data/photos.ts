/**
 * FOTOS ILUSTRATIVAS
 * ------------------------------------------------------------------
 * Fotos de bancos de imágenes de libre uso (dominio público, CC0).
 * NO muestran el centro, sus equipos ni a su personal: en la web se
 * marcan como "Imagen ilustrativa" y se acreditan en /creditos/.
 *
 * Los archivos están en /public/img/ en webp 3:2 (carrusel: -800 y
 * -1200; tarjetas: -480 y -800) y se generan con
 * `node scripts/make-photos.mjs <carpeta-originales>`.
 * Cuando CESDMA entregue fotos reales y autorizadas, basta con
 * reemplazar los archivos o cambiar `file` aquí.
 */

export interface Credit {
  author: string;
  source: 'StockSnap' | 'rawpixel';
  url: string;
}

export interface Photo {
  /** Nombre base del archivo en /public/img/ */
  file: string;
  alt: string;
  credit: Credit;
}

export const LICENSE = {
  name: 'CC0 1.0 (dominio público)',
  url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
};

const ss = (author: string, url: string): Credit => ({ author, source: 'StockSnap', url });
const rp = (author: string, url: string): Credit => ({ author, source: 'rawpixel', url });

/** Diapositivas del carrusel del inicio. */
export interface Slide {
  photo: Photo;
  title: string;
  text: string;
  href: string;
}

export const photos = {
  'hero-consulta': {
    file: 'hero-consulta',
    alt: 'Médico conversando con un paciente en un consultorio',
    credit: ss('Direct Media', 'https://stocksnap.io/photo/doctor-patient-7NQJS4WWQW'),
  },
  'hero-sono': {
    file: 'hero-sono',
    alt: 'Paciente embarazada observa en una pantalla la imagen de su sonografía',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/5924602/photo-image-public-domain-technology-free'),
  },
  'hero-lab': {
    file: 'hero-lab',
    alt: 'Tubos de muestras de sangre organizados en una gradilla de laboratorio',
    credit: rp('U.S. Forest Service', 'https://www.rawpixel.com/image/8729593/photo-image-public-domain-japan'),
  },
  'hero-cardio': {
    file: 'hero-cardio',
    alt: 'Profesional de la salud toma la presión arterial a un paciente',
    credit: rp('U.S. Embassy Ghana', 'https://www.rawpixel.com/image/8714719/photo-image-public-domain-woman-people'),
  },
  'consulta-medica-general': {
    file: 'consulta-medica-general',
    alt: 'Médico escucha a una paciente durante una consulta',
    credit: ss('Direct Media', 'https://stocksnap.io/photo/doctor-patient-N9YCBA2UBU'),
  },
  'consultas-especializadas': {
    file: 'consultas-especializadas',
    alt: 'Médico con bata y estetoscopio revisando información en una tableta',
    credit: ss('Direct Media', 'https://stocksnap.io/photo/male-doctor-KN1OCKC4Y2'),
  },
  'sonografia-4d': {
    file: 'sonografia-4d',
    alt: 'Mujer embarazada forma un corazón con las manos sobre su vientre',
    credit: ss('Suhyeon Choi', 'https://stocksnap.io/photo/hands-pregnant-0RYWABOQID'),
  },
  'sonografia-musculoesqueletica': {
    file: 'sonografia-musculoesqueletica',
    alt: 'Piernas de una persona con rodillera durante ejercicios de recuperación',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/6038567/photo-image-public-domain-house-person'),
  },
  'laboratorio-clinico': {
    file: 'laboratorio-clinico',
    alt: 'Mano con guante sostiene un tubo con una muestra de sangre',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/5922274/photo-image-background-public-domain-person'),
  },
  electrocardiograma: {
    file: 'electrocardiograma',
    alt: 'Estetoscopio sobre el papel impreso de un electrocardiograma',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/5960460/free-public-domain-cc0-photo'),
  },
  ecocardiograma: {
    file: 'ecocardiograma',
    alt: 'Equipo portátil de ultrasonido con una imagen del corazón en pantalla',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/5803545/photo-image-public-domain-school'),
  },
  'estudios-doppler': {
    file: 'estudios-doppler',
    alt: 'Profesional aplica un equipo Doppler sobre el vientre de una paciente embarazada',
    credit: rp('USAID', 'https://www.rawpixel.com/image/4031088/photo-image-background-person-baby'),
  },
  holter: {
    file: 'holter',
    alt: 'Estetoscopio junto a un teléfono móvil sobre una superficie blanca',
    credit: ss('Negative Space', 'https://stocksnap.io/photo/stethoscope-medical-RAW1RLRTM7'),
  },
  mapa: {
    file: 'mapa',
    alt: 'Persona con un tensiómetro digital en el brazo midiendo su presión arterial',
    credit: rp('rawpixel', 'https://www.rawpixel.com/image/6041854/photo-image-public-domain-wood-person'),
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const slides: Slide[] = [
  {
    photo: photos['hero-consulta'],
    title: 'Consultas médicas',
    text: 'Medicina general y especialidades.',
    href: '/servicios/consulta-medica-general/',
  },
  {
    photo: photos['hero-sono'],
    title: 'Sonografías',
    text: 'Incluida la sonografía 4D en el embarazo.',
    href: '/servicios/sonografia-4d/',
  },
  {
    photo: photos['hero-lab'],
    title: 'Laboratorio clínico',
    text: 'Análisis indicados por tu médico.',
    href: '/servicios/laboratorio-clinico/',
  },
  {
    photo: photos['hero-cardio'],
    title: 'Estudios del corazón',
    text: 'EKG, ecocardiograma, Doppler, Holter y MAPA.',
    href: '/servicios/#cat-cardiovascular',
  },
];

/** srcset para una foto: tarjetas 480/800, carrusel 800/1200. */
export const srcset = (p: Photo, sizes: number[]) =>
  sizes.map((w) => `/img/${p.file}-${w}.webp ${w}w`).join(', ');
export const src = (p: Photo, w: number) => `/img/${p.file}-${w}.webp`;
/** Miniatura más pequeña disponible de una foto. */
export const thumb = (p: Photo) => src(p, p.file.startsWith('hero-') ? 800 : 480);
