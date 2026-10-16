/**
 * ILUSTRACIONES DE MARCA
 * ------------------------------------------------------------------
 * Escenas vectoriales propias, en los colores de CESDMA, para el carrusel
 * y las tarjetas de servicio. Son ilustraciones genéricas del tipo de
 * estudio: no representan el centro, sus equipos ni a su personal.
 *
 * Cuando CESDMA entregue fotos reales y autorizadas, basta con indicar
 * `image` en el servicio (src/data/services.ts) y la foto reemplaza a la
 * ilustración.
 */

const C = {
  teal: '#0a7378',
  teal6: '#087f83',
  turq: '#0fb5a0',
  soft: '#d6f2ee',
  tint: '#e9f5f4',
  blue: '#0b6ca3',
  blueSoft: '#dcebf6',
  ink: '#183442',
  ink2: '#2b4f5f',
  line: '#c3d6db',
  white: '#ffffff',
  coral: '#ef7d66',
  coralSoft: '#fde3dc',
  amber: '#f2b33d',
  skin: '#f1c3a1',
  skinShade: '#dba27f',
  bone: '#f6f1e7',
  boneLine: '#ddd2bd',
};

type Scene = (u: string) => string;

/** Fondo común: degradado suave y dos círculos decorativos. */
const bg = (u: string, from: string, to: string) => `
  <defs>
    <linearGradient id="${u}bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="480" height="320" fill="url(#${u}bg)"/>
  <circle cx="420" cy="40" r="90" fill="#fff" opacity=".35"/>
  <circle cx="40" cy="300" r="70" fill="#fff" opacity=".3"/>`;

const sparkle = (x: number, y: number, s = 1, fill = C.turq) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10 C1-3 3-1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3-1 -1-3 0-10Z" fill="${fill}"/>`;

const heart = (x: number, y: number, s = 1, fill = C.coral) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 9C-1 9-14 1-14-8a7 7 0 0 1 14-4 7 7 0 0 1 14 4C14 1 1 9 0 9Z" fill="${fill}"/>`;

/** Persona con bata, dibujada desde la base del busto (0,0). */
const doctor = (x: number, y: number, s: number, o: { hair: string; long?: boolean; accent: string; skin?: string }) => {
  const skin = o.skin ?? C.skin;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${o.long ? `<rect x="-33" y="-156" width="66" height="78" rx="30" fill="${o.hair}"/>` : ''}
    <path d="M-62 0C-62-58-44-84 0-84S62-58 62 0Z" fill="#fff" stroke="${C.line}" stroke-width="2"/>
    <path d="M-16-83 0-50 16-83Z" fill="${o.accent}"/>
    <path d="M-16-83-5-36M16-83 5-36" stroke="${C.line}" stroke-width="2" fill="none"/>
    <rect x="-10" y="-100" width="20" height="20" fill="${C.skinShade}"/>
    <circle cy="-122" r="28" fill="${skin}"/>
    <path d="M-29-122C-31-150-14-160 2-158 22-156 32-142 29-120 23-133 11-139-3-137-15-135-24-130-29-122Z" fill="${o.hair}"/>
    <path d="M-20-80C-30-52-24-30-8-26" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="-6" cy="-25" r="6" fill="${C.ink}"/>
    <rect x="22" y="-58" width="24" height="9" rx="3" fill="${o.accent}" opacity=".8"/>
  </g>`;
};

/** Monitor de ultrasonido con pantalla oscura; `screen` se dibuja dentro. */
const monitor = (screen: string) => `
  <rect x="226" y="214" width="28" height="44" fill="${C.ink2}"/>
  <rect x="176" y="252" width="128" height="14" rx="7" fill="${C.ink}"/>
  <rect x="112" y="34" width="256" height="184" rx="18" fill="${C.ink}"/>
  <rect x="126" y="48" width="228" height="156" rx="10" fill="#0e2733"/>
  ${screen}
  <circle cx="240" cy="211" r="3" fill="${C.turq}"/>`;

export const scenes: Record<string, Scene> = {
  'consulta-medica-general': (u) => `
    ${bg(u, C.tint, C.soft)}
    <ellipse cx="320" cy="282" rx="96" ry="12" fill="${C.teal}" opacity=".12"/>
    <rect x="248" y="58" width="150" height="214" rx="16" fill="#fff" stroke="${C.line}" stroke-width="2"/>
    <rect x="292" y="44" width="62" height="28" rx="9" fill="${C.teal}"/>
    <circle cx="323" cy="52" r="5" fill="${C.soft}"/>
    ${[108, 146, 184, 222]
      .map(
        (y, i) => `<circle cx="274" cy="${y}" r="9" fill="${i < 3 ? C.turq : C.soft}"/>
      ${i < 3 ? `<path d="M269 ${y}l4 4 7-8" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      <rect x="292" y="${y - 6}" width="${[86, 70, 80, 58][i]}" height="5" rx="2.5" fill="${C.line}"/>
      <rect x="292" y="${y + 3}" width="${[54, 62, 40, 50][i]}" height="4" rx="2" fill="${C.tint}"/>`,
      )
      .join('')}
    <path d="M108 52C100 112 112 150 134 172M160 52C168 112 156 150 134 172" stroke="${C.teal}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M134 172C132 238 168 272 212 262" stroke="${C.teal}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <rect x="98" y="38" width="20" height="12" rx="6" fill="${C.ink}"/>
    <rect x="150" y="38" width="20" height="12" rx="6" fill="${C.ink}"/>
    <circle cx="224" cy="252" r="30" fill="${C.ink2}"/>
    <circle cx="224" cy="252" r="21" fill="#cddbe0"/>
    <circle cx="224" cy="252" r="9" fill="#fff"/>
    <rect x="40" y="96" width="46" height="46" rx="14" fill="#fff"/>
    <path d="M63 106v26M50 119h26" stroke="${C.turq}" stroke-width="7" stroke-linecap="round"/>
    ${sparkle(92, 216, 1.2)}`,

  'consultas-especializadas': (u) => `
    ${bg(u, C.blueSoft, C.tint)}
    <ellipse cx="240" cy="304" rx="190" ry="14" fill="${C.ink}" opacity=".08"/>
    ${doctor(132, 304, 1.05, { hair: '#3b2a24', long: true, accent: C.turq })}
    ${doctor(350, 304, 1.05, { hair: '#1f2b33', accent: C.blue, skin: '#c98e68' })}
    ${doctor(240, 320, 1.3, { hair: '#5a3b2c', long: true, accent: C.teal })}
    <rect x="34" y="40" width="88" height="36" rx="18" fill="#fff"/>
    ${heart(58, 58, 0.8)}
    <rect x="74" y="54" width="34" height="6" rx="3" fill="${C.line}"/>
    <rect x="364" y="58" width="84" height="36" rx="18" fill="#fff"/>
    <path d="M382 76h8l4-8 6 16 4-8h8" stroke="${C.turq}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="418" y="72" width="20" height="6" rx="3" fill="${C.line}"/>`,

  'sonografia-4d': (u) => `
    ${bg(u, '#fbf4ec', C.coralSoft)}
    <defs>
      <radialGradient id="${u}fan" cx="240" cy="64" r="150" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#f6c48f" stop-opacity=".55"/>
        <stop offset="1" stop-color="#c46a3c" stop-opacity=".15"/>
      </radialGradient>
      <radialGradient id="${u}baby" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stop-color="#ffe3c6"/>
        <stop offset="1" stop-color="#e9a774"/>
      </radialGradient>
    </defs>
    ${monitor(`
      <path d="M240 58 162 190A150 150 0 0 0 318 190Z" fill="url(#${u}fan)"/>
      <ellipse cx="266" cy="158" rx="42" ry="26" transform="rotate(-24 266 158)" fill="url(#${u}baby)"/>
      <circle cx="222" cy="128" r="31" fill="url(#${u}baby)"/>
      <circle cx="193" cy="132" r="7" fill="url(#${u}baby)"/>
      <path d="M208 120q6 5 12 0" stroke="#b9744a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M201 146q6 4 10 0" stroke="#b9744a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="238" cy="158" r="10" fill="url(#${u}baby)"/>
      <path d="M234 154q4-2 8 2" stroke="#c98157" stroke-width="1.5" fill="none"/>
      <rect x="138" y="60" width="38" height="5" rx="2.5" fill="${C.turq}" opacity=".7"/>
      <rect x="306" y="60" width="34" height="5" rx="2.5" fill="#fff" opacity=".35"/>
      <rect x="306" y="70" width="22" height="5" rx="2.5" fill="#fff" opacity=".25"/>`)}
    ${heart(78, 96, 1.4)}
    ${heart(412, 182, 1)}
    ${heart(54, 214, 0.8, C.amber)}
    ${sparkle(410, 92, 1.3, C.amber)}
    ${sparkle(86, 160, 0.9)}`,

  'sonografia-musculoesqueletica': (u) => `
    ${bg(u, C.tint, C.blueSoft)}
    <rect x="150" y="-20" width="150" height="360" rx="70" fill="${C.skin}" opacity=".45"/>
    <g fill="${C.bone}" stroke="${C.boneLine}" stroke-width="3">
      <rect x="198" y="-10" width="54" height="138" rx="20"/>
      <circle cx="204" cy="140" r="27"/>
      <circle cx="246" cy="140" r="27"/>
      <rect x="182" y="176" width="88" height="28" rx="13"/>
      <rect x="203" y="184" width="46" height="150" rx="18"/>
    </g>
    <rect x="200" y="122" width="50" height="20" fill="${C.bone}"/>
    <rect x="200" y="186" width="50" height="16" fill="${C.bone}"/>
    <path d="M186 166q38 8 80 0" stroke="${C.turq}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="282" cy="146" rx="13" ry="20" fill="${C.bone}" stroke="${C.boneLine}" stroke-width="3"/>
    ${[0, 1, 2]
      .map(
        (i) =>
          `<path d="M${318 - i * 14} ${116 - i * 8}q-${16 + i * 6} ${34 + i * 8} 0 ${68 + i * 16}" stroke="${C.turq}" stroke-width="3" fill="none" stroke-linecap="round" opacity="${0.9 - i * 0.25}"/>`,
      )
      .join('')}
    <path d="M370 150C420 150 430 80 470 60" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="318" y="112" width="58" height="76" rx="16" fill="#fff" stroke="${C.line}" stroke-width="2"/>
    <rect x="306" y="124" width="20" height="52" rx="7" fill="${C.teal}"/>
    <rect x="336" y="130" width="26" height="5" rx="2.5" fill="${C.line}"/>
    <rect x="336" y="141" width="18" height="5" rx="2.5" fill="${C.line}"/>
    ${sparkle(96, 76, 1.2)}
    ${sparkle(400, 250, 0.9, C.blue)}`,

  'laboratorio-clinico': (u) => `
    ${bg(u, C.tint, '#e6f0fa')}
    <ellipse cx="240" cy="276" rx="170" ry="12" fill="${C.ink}" opacity=".08"/>
    ${[
      { x: 126, lvl: 120, c: C.coral, cap: '#c2412c' },
      { x: 172, lvl: 90, c: C.amber, cap: '#7a4fb3' },
      { x: 218, lvl: 104, c: C.turq, cap: C.blue },
      { x: 264, lvl: 76, c: '#8fb8de', cap: '#2f8f4e' },
      { x: 310, lvl: 112, c: C.coral, cap: '#c2412c' },
    ]
      .map(
        (t) => `<rect x="${t.x}" y="${244 - t.lvl}" width="28" height="${t.lvl}" rx="14" fill="${t.c}" opacity=".85"/>
        <rect x="${t.x}" y="64" width="28" height="180" rx="14" fill="#fff" fill-opacity=".35" stroke="${C.line}" stroke-width="3"/>
        <rect x="${t.x - 3}" y="52" width="34" height="18" rx="5" fill="${t.cap}"/>
        <rect x="${t.x + 7}" y="${252 - t.lvl}" width="5" height="${t.lvl - 30}" rx="2.5" fill="#fff" opacity=".45"/>`,
      )
      .join('')}
    <rect x="104" y="150" width="256" height="14" rx="6" fill="${C.teal6}" opacity=".9"/>
    <rect x="104" y="238" width="256" height="22" rx="8" fill="${C.teal}"/>
    <rect x="112" y="256" width="12" height="20" rx="4" fill="${C.teal}"/>
    <rect x="340" y="256" width="12" height="20" rx="4" fill="${C.teal}"/>
    <path d="M394 168v26l-22 48q-4 12 9 12h50q13 0 9-12l-22-48v-26Z" fill="#fff" stroke="${C.line}" stroke-width="3"/>
    <path d="M380 228h62l9 18q3 8-6 8h-68q-9 0-6-8Z" fill="${C.turq}" opacity=".8"/>
    <rect x="388" y="160" width="34" height="10" rx="4" fill="${C.line}"/>
    <path d="M60 60q-12 18 0 26 12-8 0-26Z" fill="${C.blue}" opacity=".8"/>
    ${sparkle(82, 200, 1.1)}
    ${sparkle(438, 104, 0.9, C.amber)}`,

  electrocardiograma: (u) => `
    ${bg(u, '#fdf3f0', C.coralSoft)}
    <defs>
      <pattern id="${u}grid" width="14" height="14" patternUnits="userSpaceOnUse">
        <path d="M14 0H0V14" fill="none" stroke="#f5c9bd" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="44" y="70" width="392" height="180" rx="16" fill="#fff"/>
    <rect x="44" y="70" width="392" height="180" rx="16" fill="url(#${u}grid)"/>
    <rect x="44" y="70" width="392" height="180" rx="16" fill="none" stroke="#f2b9ab" stroke-width="2"/>
    <path d="M44 170h50l10-12 10 12h14l8 14 12-84 12 98 10-28h26l12-16 16 16h42l10-12 10 12h14l8 14 12-84 12 98 10-28h26l12-16 16 16h40" fill="none" stroke="#c2412c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="404" cy="70" r="34" fill="#fff" stroke="#f2b9ab" stroke-width="2"/>
    ${heart(404, 72, 1.5)}
    ${sparkle(78, 44, 1.1, C.coral)}
    ${sparkle(120, 284, 0.9)}`,

  ecocardiograma: (u) => `
    ${bg(u, C.blueSoft, C.tint)}
    <defs>
      <radialGradient id="${u}fan" cx="240" cy="64" r="150" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#7fa3ad" stop-opacity=".55"/>
        <stop offset="1" stop-color="#1e3d48" stop-opacity=".3"/>
      </radialGradient>
    </defs>
    ${monitor(`
      <path d="M240 58 162 190A150 150 0 0 0 318 190Z" fill="url(#${u}fan)"/>
      <path d="M240 186c-6 0-58-30-58-70a30 30 0 0 1 58-14 30 30 0 0 1 58 14c0 40-52 70-58 70Z" fill="#c9d8dd" opacity=".85"/>
      <ellipse cx="220" cy="118" rx="15" ry="18" fill="#17323d"/>
      <ellipse cx="260" cy="118" rx="15" ry="18" fill="#17323d"/>
      <ellipse cx="224" cy="152" rx="13" ry="16" fill="#17323d"/>
      <ellipse cx="256" cy="152" rx="13" ry="16" fill="#17323d"/>
      <path d="M140 186h30l6-8 6 8h8l5 8 8-34 8 40 6-14h12" stroke="${C.turq}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="306" y="60" width="34" height="5" rx="2.5" fill="#fff" opacity=".35"/>`)}
    ${heart(78, 100, 1.5)}
    ${sparkle(410, 96, 1.2)}
    ${sparkle(402, 214, 0.9, C.coral)}`,

  'estudios-doppler': (u) => `
    ${bg(u, '#fdf3f0', C.blueSoft)}
    <path d="M-10 92C130 20 290 160 490 70" stroke="#f6c6bb" stroke-width="48" fill="none" stroke-linecap="round"/>
    <path d="M-10 92C130 20 290 160 490 70" stroke="${C.coral}" stroke-width="5" fill="none" stroke-dasharray="20 18" stroke-linecap="round"/>
    <path d="M-10 160C140 100 300 230 490 150" stroke="#c9def0" stroke-width="38" fill="none" stroke-linecap="round"/>
    <path d="M-10 160C140 100 300 230 490 150" stroke="${C.blue}" stroke-width="5" fill="none" stroke-dasharray="20 18" stroke-linecap="round"/>
    <rect x="60" y="208" width="360" height="92" rx="14" fill="${C.ink}"/>
    <path d="M76 284h20c6 0 8-52 14-52s8 30 14 40 10 12 18 12h14c6 0 8-52 14-52s8 30 14 40 10 12 18 12h14c6 0 8-52 14-52s8 30 14 40 10 12 18 12h14c6 0 8-52 14-52s8 30 14 40 10 12 18 12h20" fill="${C.turq}" fill-opacity=".35" stroke="${C.turq}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M76 284h328" stroke="#fff" stroke-opacity=".25" stroke-width="1.5"/>
    ${sparkle(428, 38, 1.1, C.blue)}`,

  holter: (u) => `
    ${bg(u, C.tint, C.soft)}
    <path d="M172 158C104 150 78 72 136 22M308 158C376 150 402 72 344 22" stroke="${C.teal}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M206 124C196 90 150 96 122 70M240 124V54M274 124C284 90 330 96 358 70" stroke-width="4" fill="none" stroke-linecap="round" stroke="${C.ink2}"/>
    ${[
      [122, 70, C.coral],
      [240, 50, C.amber],
      [358, 70, C.blue],
    ]
      .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="15" fill="#fff" stroke="${C.line}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`)
      .join('')}
    <ellipse cx="240" cy="262" rx="90" ry="10" fill="${C.ink}" opacity=".1"/>
    <rect x="168" y="120" width="144" height="124" rx="22" fill="#fff" stroke="${C.line}" stroke-width="3"/>
    <rect x="186" y="138" width="108" height="56" rx="10" fill="${C.ink}"/>
    <path d="M194 170h18l6-8 6 8h6l5 8 8-30 8 36 6-14h40" stroke="${C.turq}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="214" cy="218" r="9" fill="${C.teal}"/>
    <circle cx="240" cy="218" r="9" fill="${C.soft}"/>
    <circle cx="266" cy="218" r="9" fill="${C.soft}"/>
    <circle cx="396" cy="236" r="44" fill="#fff" stroke="${C.teal}" stroke-width="4"/>
    <path d="M396 236v-26M396 236l18 10" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="396" cy="236" r="4" fill="${C.ink}"/>
    <path d="M396 192v6M396 274v6M352 236h6M434 236h6" stroke="${C.line}" stroke-width="3" stroke-linecap="round"/>
    ${sparkle(70, 230, 1.1)}`,

  mapa: (u) => `
    ${bg(u, C.blueSoft, C.tint)}
    <rect x="-40" y="146" width="360" height="86" rx="43" fill="${C.skin}"/>
    <path d="M-40 214h340" stroke="${C.skinShade}" stroke-width="3" opacity=".4"/>
    <rect x="118" y="128" width="128" height="122" rx="20" fill="${C.blue}"/>
    <rect x="132" y="146" width="100" height="22" rx="8" fill="#fff" opacity=".25"/>
    <rect x="132" y="210" width="100" height="22" rx="8" fill="#fff" opacity=".18"/>
    <path d="M246 188C300 188 296 104 338 104" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cx="380" cy="208" rx="70" ry="9" fill="${C.ink}" opacity=".1"/>
    <rect x="322" y="48" width="122" height="154" rx="20" fill="#fff" stroke="${C.line}" stroke-width="3"/>
    <rect x="338" y="64" width="90" height="66" rx="10" fill="${C.ink}"/>
    <rect x="350" y="78" width="46" height="9" rx="4.5" fill="${C.turq}"/>
    <rect x="350" y="94" width="34" height="9" rx="4.5" fill="${C.turq}" opacity=".6"/>
    ${heart(410, 112, 0.6)}
    <circle cx="383" cy="164" r="18" fill="${C.teal}"/>
    <circle cx="383" cy="164" r="7" fill="#fff"/>
    <circle cx="70" cy="70" r="36" fill="#fff"/>
    <path d="M70 70 52 56" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M44 84a30 30 0 0 1 52 0" stroke="${C.turq}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="70" cy="70" r="4" fill="${C.ink}"/>
    ${sparkle(440, 262, 1)}`,
};

let n = 0;

/** Devuelve el SVG completo de una escena (decorativo, aria-hidden). */
export function artSvg(name: string, className = ''): string {
  const scene = scenes[name];
  if (!scene) return '';
  const u = `a${(n++).toString(36)}`;
  return `<svg class="${className}" viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${scene(u)}</svg>`;
}
