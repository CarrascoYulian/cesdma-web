import { site } from '../config/site';

/** Solo dígitos; descarta cualquier otro carácter. */
export const normalizeNumber = (n: string): string => n.replace(/\D/g, '');

/**
 * Crea un enlace oficial de WhatsApp (wa.me) con el mensaje codificado.
 * https://faq.whatsapp.com/5913398998672934
 */
export function waLink(message: string, number: string = site.whatsapp.value): string {
  const digits = normalizeNumber(number);
  const text = message.trim();
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const telLink = (): string => `tel:${site.phone.value.e164}`;

/** Número de WhatsApp en formato local legible: 809-549-8560. */
export function waDisplay(number: string = site.whatsapp.value): string {
  const d = normalizeNumber(number);
  const n = d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
  return n.length === 10 ? `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}` : d;
}
