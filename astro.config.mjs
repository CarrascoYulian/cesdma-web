// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo PENDIENTE de confirmar. Se define con la variable PUBLIC_SITE_URL.
const site = process.env.PUBLIC_SITE_URL || 'https://www.cesdma.com.do';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: undefined,
    }),
  ],
  devToolbar: { enabled: false },
  // Sin recursos en línea (data:) para cumplir la CSP estricta de public/_headers.
  vite: { build: { assetsInlineLimit: 0 } },
});
