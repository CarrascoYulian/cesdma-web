# Ficha de marca e investigación — CESDMA

Fecha: 15 de octubre de 2026.

## 1. Qué se pudo verificar y qué no

| Fuente | Resultado |
|---|---|
| Instagram `@cesdma` | **Bloqueado.** Instagram impide la lectura automatizada (robots.txt y proxy). No se revisaron publicaciones, fotos, horarios ni perfiles. |
| Facebook `facebook.com/CESDMA` | **Bloqueado** para lectura. Solo se confirmó, por el título del resultado de búsqueda, que existe una página llamada “Cesdma Centro de Sonografía y Diagnósticos Médico Dra. Cruzveris Martínez”. |
| Búsqueda web (nombre, dirección, teléfono, doctora) | Sin resultados adicionales: no hay ficha pública indexada con dirección, horario ni especialistas. |
| Captura del perfil de Instagram (enviada por el cliente) | Confirma: teléfono 809-549-8560, correo infocesdma@gmail.com, dirección “Calle Mella #58, Valiente, La Caleta, Santo Domingo”, coordenadas 18.459206, -69.697304, categoría “Clínica médica”. |
| Logotipo (enviado por el cliente) | Recibido como captura recortada: el texto del logo se corta a la derecha. Se extrajo el **emblema** (silueta de embarazada, bebé y transductor) y el nombre “CESDMA” se compone como texto con el degradado de la marca. Original guardado en `docs/marca/`. |

Datos que se usan, con su origen:

- Nombre comercial y descriptivo, Instagram oficial, listado de 10 servicios y “más de 14 consultas especializadas”: **brief del cliente**.
- Teléfono, correo, dirección y coordenadas: **perfil oficial de Instagram** (captura del cliente). Se usa la redacción de Instagram (“Santo Domingo”) en lugar de “Santo Domingo Este” del brief.
- Sigue sin confirmar: que el número tenga WhatsApp activo, el horario, el listado de especialidades y las ARS. Esos datos se marcan “Por confirmar” y no van a los datos estructurados.

## 2. Análisis de referentes

### CEMEDI (cemedi.com.do)
- Bien: botón “Pedir una cita” fijo en el encabezado; logos de ARS aceptadas como señal de confianza; dirección visible.
- Mal: titular genérico (“Bienvenidos a nuestra página web”); estudios presentados como íconos de órganos sin descripción ni enlace; enlace “Leer más” sin destino; imágenes de ARS sin texto alternativo; contenido con fecha 2021.

### Amadita (amadita.com)
- Bien: WhatsApp siempre visible con mensaje precargado; rutas por tipo de público (pacientes, médicos, empresas); catálogo de pruebas y FAQ dedicados; resultados en línea con varias vías.
- Mal: hero de banners rotativos que diluye el mensaje; enlaces de menú vacíos (`#`) y una URL con errata; testimonios renderizados como texto de relleno.

### CEDIEM (cediem.com)
- Bien: barra superior con teléfono, horario y redes; menú con las 16 consultas y 7 estudios listados por nombre, cada uno con página propia; proceso de cita explicado en 3 pasos; mapa y horarios por día en el pie.
- Mal: enlace `tel:` con un dígito de más (no marca bien); URLs con espacios y acentos sin codificar; errata en el pie; afirmaciones como “tecnología de vanguardia” sin respaldo.

### Referentes internacionales (Cleveland Clinic, Mayo Clinic)
Revisados a partir de conocimiento previo de sus patrones, no de una visita en esta sesión: buscador/directorio de servicios como eje, páginas por servicio con “qué es, cómo prepararse, qué esperar”, lenguaje claro para pacientes, avisos de que la información no sustituye la consulta médica.

## 3. Buenas prácticas aplicadas (12)

1. Un único mensaje claro en el hero (qué es, qué ofrece, cómo contactar) en lugar de banners rotativos.
2. Botón de cita visible en el encabezado sin ser invasivo.
3. WhatsApp con **mensaje distinto por servicio** y número centralizado.
4. Cada servicio con su propia página (SEO local y respuesta a “qué es / cómo prepararme”).
5. Acceso rápido por categorías justo después del hero.
6. Proceso de cita explicado en 3 pasos.
7. Ubicación con enlace “Cómo llegar” que abre la app de mapas en el móvil.
8. Mapa interactivo cargado solo a petición (privacidad y velocidad).
9. Preguntas frecuentes que responden precio, seguros y preparación **sin inventar datos**, derivando a WhatsApp.
10. Avisos de privacidad en el propio flujo (“no envíes datos de salud por WhatsApp”).
11. Todos los enlaces funcionan; ningún botón decorativo (comprobado por pruebas automáticas).
12. Accesibilidad WCAG 2.2 AA: contraste medido, foco visible, menú con teclado, movimiento reducido.

## 4. Decisiones que se evitan

- Testimonios, cifras de pacientes, años de experiencia, “tecnología de vanguardia” o “los mejores”: no hay datos que los respalden.
- Fotos de banco que aparenten ser las instalaciones o el equipo de CESDMA.
- Carruseles automáticos, ventanas emergentes, botones que parpadean.
- Logos de ARS sin confirmar.
- Enlaces `#` vacíos y números de teléfono mal formateados.

## 5. Concepto y tono

**Idea central:** atención médica cercana, estudios diagnósticos y confianza en un mismo lugar.

**Titular elegido:** “Atención cercana y estudios diagnósticos en un mismo lugar.” Dice qué es el centro y su ventaja práctica, sin promesas médicas.

**Tono:** tuteo, frases cortas, verbos concretos (“escríbenos”, “coordinamos”), sin tecnicismos ni alarmismo. Las descripciones de estudios son información general y neutral.

## 6. Identidad visual

Paleta tomada del logotipo (degradado verde turquesa `#0FB5A0` → azul `#0B6CA3`), ajustada por contraste:

| Token | Color | Uso | Contraste sobre blanco |
|---|---|---|---|
| Turquesa (logo) | `#0FB5A0` | Acentos y gráficos, nunca texto | 2.6:1 |
| Verde azulado 700 | `#0A7378` | Botones, enlaces | 5.6:1 |
| Verde azulado 800 | `#06666B` | Hover | 6.7:1 |
| Azul (logo) | `#0B6CA3` | Foco, detalles | 5.7:1 |
| Texto principal | `#183442` | Títulos y texto | 13:1 |
| Texto secundario | `#56677A` | Descripciones (se oscureció desde `#5F707D`) | 5.8:1 |
| Fondo suave | `#F4F9FA` | Secciones alternas | — |
| Fondo cálido | `#FAF7F3` | Solo la sección de sonografía 4D | — |

Tipografía: **Manrope** (títulos) + **DM Sans** (texto e interfaz), autoalojadas, variables, con escala fluida `clamp()`.

Motivo gráfico propio: el **abanico de ultrasonido** (sector con arcos), presente en el hero, la sección 4D y la imagen para redes; dialoga con el transductor del emblema oficial. Liga la marca a la sonografía sin usar imágenes clínicas.

## 7. Arquitectura del sitio

```
/                          Inicio (una sola página con todas las secciones)
  #servicios               Servicios con filtro por categoría
  #sonografia-4d           Sección especial 4D
  #especialidades          +14 consultas especializadas
  #nosotros                Sobre CESDMA
  #citas                   Cómo pedir una cita + asistente de mensaje
  #contacto                Ubicación y contacto
  #preguntas               Preguntas frecuentes
/servicios/                Índice de servicios por categoría
/servicios/<servicio>/     10 páginas, una por servicio
/privacidad/               Aviso de privacidad
```

Recorrido principal: llegada → entiende qué es CESDMA (hero) → encuentra su servicio (accesos rápidos / filtro) → lee lo esencial (tarjeta o página del servicio) → escribe por WhatsApp con el mensaje del servicio ya escrito.

## 8. Palabras clave de trabajo (hipótesis, sin volúmenes)

Centro de sonografía en La Caleta · Sonografía 4D en La Caleta / Santo Domingo · Centro de diagnósticos cerca de Boca Chica · Consultas médicas en La Caleta · Laboratorio clínico en La Caleta · Ecocardiograma / Doppler / Holter / MAPA en La Caleta.

No se crearon páginas por localidad: no aportarían información nueva.
