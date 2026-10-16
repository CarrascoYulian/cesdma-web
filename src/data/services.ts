/**
 * CATÁLOGO DE SERVICIOS
 * ------------------------------------------------------------------
 * Los 10 servicios provienen del listado aportado por el cliente.
 * Las descripciones son información general y neutral sobre cada tipo
 * de consulta o estudio (no son afirmaciones sobre equipos, tiempos,
 * precios ni resultados de CESDMA).
 *
 * `details` queda vacío hasta que CESDMA confirme modalidades concretas
 * (p. ej., qué tipos de Doppler o qué pruebas de laboratorio realiza).
 */

export type CategoryId = 'consultas' | 'sonografias' | 'laboratorio' | 'cardiovascular';

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  icon: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Nombre corto para chips y menús. */
  short: string;
  category: CategoryId;
  icon: string;
  /** Destacado en la cuadrícula. */
  featured?: boolean;
  /** Una línea para la tarjeta. */
  summary: string;
  /** Párrafo de introducción para la página del servicio. */
  intro: string;
  /** Datos generales útiles para el paciente. */
  facts: string[];
  /** Modalidades confirmadas por CESDMA. Vacío = se invita a consultar. */
  details: string[];
  /** Qué preguntar al escribir. */
  askAbout: string[];
  waMessage: string;
  seoTitle: string;
  seoDescription: string;
}

export const categories: Category[] = [
  {
    id: 'consultas',
    name: 'Consultas médicas',
    short: 'Consultas',
    description: 'Medicina general y más de 14 especialidades para darle seguimiento a tu salud.',
    icon: 'stethoscope',
  },
  {
    id: 'sonografias',
    name: 'Sonografías',
    short: 'Sonografías',
    description: 'Estudios por ultrasonido, incluidas las sonografías 4D durante el embarazo.',
    icon: 'scan-heart',
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio clínico',
    short: 'Laboratorio',
    description: 'Análisis clínicos indicados por tu médico, en el mismo centro.',
    icon: 'test-tubes',
  },
  {
    id: 'cardiovascular',
    name: 'Estudios cardiovasculares y de monitoreo',
    short: 'Cardiovascular',
    description: 'EKG, ecocardiograma, Doppler, Holter y MAPA.',
    icon: 'heart-pulse',
  },
];

const PREP =
  'La preparación puede variar según el estudio y la indicación médica. Confirma por WhatsApp si necesitas alguna indicación previa.';

export const services: Service[] = [
  {
    slug: 'consulta-medica-general',
    name: 'Consulta médica general',
    short: 'Consulta general',
    category: 'consultas',
    icon: 'stethoscope',
    featured: true,
    summary: 'Una evaluación médica para orientarte, atender molestias comunes y darle seguimiento a tu salud.',
    intro:
      'La consulta médica general es el primer paso para cuidar tu salud: un espacio para conversar con el médico, revisar cómo te sientes y recibir orientación sobre los estudios o especialistas que puedas necesitar.',
    facts: [
      'Sirve tanto para chequeos como para consultar síntomas o molestias.',
      'El médico puede indicarte estudios o referirte a una especialidad.',
      'Lleva tus estudios anteriores y la lista de medicamentos que tomas, si aplica.',
    ],
    details: [],
    askAbout: ['Disponibilidad de fecha y horario', 'Precio de la consulta', 'Cobertura de tu seguro médico'],
    waMessage:
      'Hola, CESDMA. Me gustaría recibir información sobre la consulta médica general y conocer la disponibilidad para una cita.',
    seoTitle: 'Consulta médica general',
    seoDescription:
      'Consulta médica general en CESDMA, La Caleta. Coordina tu cita por WhatsApp de forma sencilla.',
  },
  {
    slug: 'consultas-especializadas',
    name: 'Consultas especializadas',
    short: 'Especialidades',
    category: 'consultas',
    icon: 'users-round',
    summary: 'Más de 14 especialidades médicas para darle seguimiento a cada necesidad.',
    intro:
      'CESDMA ofrece más de 14 consultas especializadas. Si ya sabes qué especialista necesitas, o si tu médico te refirió, escríbenos y te confirmamos disponibilidad.',
    facts: [
      'Puedes acudir por iniciativa propia o con una referencia médica.',
      'Lleva tus estudios recientes relacionados con el motivo de consulta.',
    ],
    details: [],
    askAbout: ['Especialidades disponibles', 'Días de consulta del especialista', 'Precio y cobertura de tu seguro'],
    waMessage:
      'Hola, CESDMA. Me gustaría conocer las especialidades médicas disponibles y coordinar una consulta.',
    seoTitle: 'Consultas especializadas',
    seoDescription:
      'Más de 14 consultas especializadas en CESDMA, La Caleta. Pregunta por la especialidad que necesitas por WhatsApp.',
  },
  {
    slug: 'sonografia-4d',
    name: 'Sonografía 4D',
    short: 'Sonografía 4D',
    category: 'sonografias',
    icon: 'baby',
    featured: true,
    summary: 'Imágenes en tres dimensiones y en movimiento para conocer a tu bebé durante el embarazo.',
    intro:
      'La sonografía 4D muestra imágenes tridimensionales del bebé en movimiento. Es una forma especial de vivir el embarazo y compartir ese momento con tu familia.',
    facts: [
      'Es un estudio por ultrasonido, sin radiación.',
      'La nitidez de las imágenes depende de factores como la semana de gestación y la posición del bebé.',
      'Complementa, no sustituye, los controles prenatales que indica tu médico.',
    ],
    details: [],
    askAbout: ['Semana de embarazo recomendada', 'Cómo prepararte', 'Disponibilidad y precio'],
    waMessage:
      'Hola, CESDMA. Quisiera información sobre las sonografías 4D y cómo puedo coordinar una cita.',
    seoTitle: 'Sonografía 4D en La Caleta',
    seoDescription:
      'Sonografías 4D en CESDMA, La Caleta, Santo Domingo. Pregunta por disponibilidad y preparación por WhatsApp.',
  },
  {
    slug: 'sonografia-musculoesqueletica',
    name: 'Sonografía musculoesquelética',
    short: 'Musculoesquelética',
    category: 'sonografias',
    icon: 'bone',
    summary: 'Ultrasonido para observar músculos, tendones, ligamentos y articulaciones.',
    intro:
      'La sonografía musculoesquelética utiliza ultrasonido para observar estructuras como músculos, tendones, ligamentos y articulaciones. Suele indicarla un médico para evaluar molestias o lesiones.',
    facts: [
      'Es un estudio por ultrasonido, sin radiación.',
      'Permite observar las estructuras mientras se mueven.',
      'Lleva la indicación médica y estudios previos de la zona, si los tienes.',
    ],
    details: [],
    askAbout: ['Zona a evaluar', 'Disponibilidad', 'Precio y cobertura'],
    waMessage:
      'Hola, CESDMA. Quisiera información sobre la sonografía musculoesquelética y la disponibilidad para realizarla.',
    seoTitle: 'Sonografía musculoesquelética',
    seoDescription:
      'Sonografía musculoesquelética en CESDMA, La Caleta. Coordina tu estudio por WhatsApp.',
  },
  {
    slug: 'laboratorio-clinico',
    name: 'Laboratorio clínico',
    short: 'Laboratorio',
    category: 'laboratorio',
    icon: 'test-tubes',
    summary: 'Análisis clínicos indicados por tu médico, sin tener que ir a otro lugar.',
    intro:
      'El laboratorio clínico analiza muestras como sangre u orina para apoyar el diagnóstico y el seguimiento que hace tu médico. En CESDMA puedes realizarte tus análisis en el mismo centro donde te consultas.',
    facts: [
      'Algunas pruebas requieren ayuno u otras indicaciones previas.',
      'Lleva la indicación médica con las pruebas solicitadas.',
    ],
    details: [],
    askAbout: ['Si realizan la prueba que necesitas', 'Si requiere ayuno', 'Entrega de resultados y precio'],
    waMessage:
      'Hola, CESDMA. Me gustaría conocer los servicios de laboratorio disponibles y sus requisitos.',
    seoTitle: 'Laboratorio clínico',
    seoDescription:
      'Laboratorio clínico en CESDMA, La Caleta. Consulta pruebas disponibles y preparación por WhatsApp.',
  },
  {
    slug: 'electrocardiograma',
    name: 'Electrocardiograma (EKG)',
    short: 'EKG',
    category: 'cardiovascular',
    icon: 'activity',
    summary: 'Registro de la actividad eléctrica del corazón mediante electrodos en la piel.',
    intro:
      'El electrocardiograma (EKG) registra la actividad eléctrica del corazón con pequeños electrodos que se colocan sobre la piel. Es un estudio no invasivo que tu médico puede indicar como parte de una evaluación o un chequeo.',
    facts: [
      'Es un estudio no invasivo.',
      'Se realiza en reposo, acostado.',
      'Lleva la indicación médica, si la tienes.',
    ],
    details: [],
    askAbout: ['Disponibilidad', 'Precio y cobertura', 'Entrega del resultado'],
    waMessage: 'Hola, CESDMA. Quisiera información sobre el estudio de EKG y la disponibilidad para realizarlo.',
    seoTitle: 'Electrocardiograma (EKG)',
    seoDescription:
      'Electrocardiograma (EKG) en CESDMA, La Caleta. Coordina tu estudio por WhatsApp.',
  },
  {
    slug: 'ecocardiograma',
    name: 'Ecocardiograma',
    short: 'Ecocardiograma',
    category: 'cardiovascular',
    icon: 'heart',
    summary: 'Sonografía del corazón para observar su estructura y su funcionamiento.',
    intro:
      'El ecocardiograma es una sonografía del corazón. Usa ultrasonido para observar sus cavidades, sus válvulas y cómo bombea la sangre. Normalmente lo indica un médico.',
    facts: [
      'Es un estudio por ultrasonido, sin radiación.',
      'Es no invasivo: el transductor se desliza sobre el pecho.',
      'Lleva la indicación médica y estudios cardiovasculares previos, si los tienes.',
    ],
    details: [],
    askAbout: ['Disponibilidad', 'Preparación', 'Precio y cobertura'],
    waMessage: 'Hola, CESDMA. Quisiera información sobre el ecocardiograma y la disponibilidad para realizarlo.',
    seoTitle: 'Ecocardiograma',
    seoDescription:
      'Ecocardiograma en CESDMA, La Caleta. Pregunta por disponibilidad y preparación por WhatsApp.',
  },
  {
    slug: 'estudios-doppler',
    name: 'Estudios Doppler',
    short: 'Doppler',
    category: 'cardiovascular',
    icon: 'waves-horizontal',
    summary: 'Ultrasonido que permite evaluar cómo circula la sangre por arterias y venas.',
    intro:
      'El estudio Doppler es una técnica de ultrasonido que permite evaluar el flujo de la sangre en arterias y venas. Tu médico indicará qué zona o qué vasos sanguíneos deben estudiarse.',
    facts: [
      'Es un estudio por ultrasonido, sin radiación.',
      'Es no invasivo.',
      'La preparación depende de la zona a estudiar.',
    ],
    details: [],
    askAbout: ['Tipo de Doppler indicado', 'Preparación', 'Disponibilidad y precio'],
    waMessage: 'Hola, CESDMA. Quisiera información sobre los estudios Doppler y la disponibilidad para realizarlos.',
    seoTitle: 'Estudios Doppler',
    seoDescription:
      'Estudios Doppler en CESDMA, La Caleta. Consulta modalidades y disponibilidad por WhatsApp.',
  },
  {
    slug: 'holter',
    name: 'Holter',
    short: 'Holter',
    category: 'cardiovascular',
    icon: 'monitor-dot',
    summary: 'Monitor portátil que registra el ritmo del corazón mientras sigues tu rutina.',
    intro:
      'El Holter es un pequeño monitor portátil que registra el ritmo del corazón de forma continua, normalmente durante 24 horas o más, mientras haces tus actividades habituales.',
    facts: [
      'Se lleva puesto y luego se devuelve para analizar el registro.',
      'Suele pedirse anotar actividades o síntomas durante el monitoreo.',
      'Pregunta por la duración del monitoreo que te indicaron.',
    ],
    details: [],
    askAbout: ['Disponibilidad del equipo', 'Duración del monitoreo', 'Precio y cobertura'],
    waMessage: 'Hola, CESDMA. Quisiera información sobre el estudio Holter y la disponibilidad para realizarlo.',
    seoTitle: 'Holter',
    seoDescription: 'Estudio Holter en CESDMA, La Caleta. Coordina tu monitoreo por WhatsApp.',
  },
  {
    slug: 'mapa',
    name: 'MAPA (monitoreo ambulatorio de la presión arterial)',
    short: 'MAPA',
    category: 'cardiovascular',
    icon: 'gauge',
    summary: 'Mide la presión arterial a intervalos durante el día y la noche, con un monitor portátil.',
    intro:
      'El MAPA, o monitoreo ambulatorio de la presión arterial, utiliza un brazalete conectado a un monitor portátil que mide la presión de forma automática durante el día y la noche, normalmente por unas 24 horas.',
    facts: [
      'El brazalete se infla solo a intervalos programados.',
      'Permite ver cómo varía la presión durante tu rutina diaria.',
      'Suele pedirse anotar actividades y horas de sueño.',
    ],
    details: [],
    askAbout: ['Disponibilidad del equipo', 'Cómo prepararte', 'Precio y cobertura'],
    waMessage:
      'Hola, CESDMA. Quisiera información sobre el MAPA (monitoreo de la presión arterial) y la disponibilidad para realizarlo.',
    seoTitle: 'MAPA: monitoreo ambulatorio de la presión arterial',
    seoDescription:
      'MAPA (monitoreo ambulatorio de la presión arterial) en CESDMA, La Caleta. Coordina por WhatsApp.',
  },
];

export const prepNote = PREP;

export const servicesByCategory = (id: CategoryId) => services.filter((s) => s.category === id);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceUrl = (s: Service) => `/servicios/${s.slug}/`;
