// Lista los datos institucionales pendientes de confirmar.
// `npm run check:data:strict` termina con error si queda alguno (úsalo antes de publicar
// con PUBLIC_SHOW_PENDING=false).
const strict = process.argv.includes('--strict');
const { site } = await import('../src/config/site.ts');
const { faqs } = await import('../src/data/faq.ts');

const pending = [];
for (const [key, val] of Object.entries(site)) {
  if (val && typeof val === 'object' && 'verified' in val && val.verified === false) {
    pending.push(`${key}: ${val.note ?? ''}  (fuente: ${val.source})`);
  }
}
if (site.logo.isPlaceholder) pending.push('logo: se está usando un logo provisional');
pending.push('privacidad: el aviso de privacidad es un texto base; debe revisarlo un asesor legal');
faqs.filter((f) => !f.verified).forEach((f) => pending.push(`FAQ "${f.q}": revisar la respuesta`));

if (!pending.length) {
  console.log('✓ Todos los datos están confirmados.');
} else {
  console.log(`Datos pendientes de confirmar (${pending.length}):`);
  pending.forEach((p) => console.log('  • ' + p));
  if (strict) {
    console.error('\n✗ Hay datos sin confirmar.');
    process.exit(1);
  }
}
