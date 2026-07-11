// @ts-check
import { defineConfig } from 'astro/config';
import remarkRewriteImages from './scripts/remark-rewrite-images.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://game.imcenix.com',
  trailingSlash: 'ignore',
  build: {
    // Each page renders as /<path>/index.html so links work on SFTP-hosted
    // sites without server-side URL rewriting (same as yum.imcenix.com).
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    remarkPlugins: [remarkRewriteImages],
  },
});
