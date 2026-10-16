/**
 * Datos estructurados (schema.org).
 * Solo se publican datos con `verified: true`: nunca horarios, teléfonos ni
 * direcciones sin confirmar, ni valoraciones, precios o profesionales.
 */
import { site, mapsUrl } from '../config/site';
import { services } from '../data/services';
import type { Faq } from '../data/faq';

export function clinicSchema(siteUrl: string) {
  const s = site;
  const sameAs = [s.instagram.verified && s.instagram.value.url, s.facebook.verified && s.facebook.value.url].filter(
    Boolean,
  );
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}#centro`,
    name: s.legalName,
    alternateName: s.shortName,
    url: siteUrl,
    logo: new URL(s.logo.emblemPng, siteUrl).href,
    image: new URL('/og-image.png', siteUrl).href,
    description:
      'Centro médico con consulta general, consultas especializadas, sonografías 4D, laboratorio clínico y estudios cardiovasculares.',
    sameAs,
    availableService: services.map((sv) => ({
      '@type': sv.category === 'consultas' ? 'MedicalProcedure' : 'MedicalTest',
      name: sv.name,
      url: new URL(`/servicios/${sv.slug}/`, siteUrl).href,
    })),
  };

  if (s.phone.verified) data.telephone = s.phone.value.e164;
  if (s.email.verified && s.email.value) data.email = s.email.value;
  if (s.address.verified) {
    const a = s.address.value;
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: `${a.sector}, ${a.city}`,
      addressRegion: a.region,
      addressCountry: a.country,
    };
    data.hasMap = mapsUrl();
  }
  if (s.geo.verified && s.geo.value) {
    data.geo = { '@type': 'GeoCoordinates', latitude: s.geo.value.lat, longitude: s.geo.value.lng };
  }
  if (s.hours.verified && s.hours.value.length) {
    data.openingHoursSpecification = s.hours.value.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schemaDays.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return data;
}

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((f) => f.verified)
      .map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
  };
}

export function breadcrumbSchema(siteUrl: string, trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, siteUrl).href,
    })),
  };
}
