// Remark plugin: rewrite relative image paths inside entry markdown to the
// absolute /<collection>/<slug>/ URLs that Astro serves statically after
// scripts/link-assets.mjs symlinks assets/ into public/.
//
// e.g. ![](photos/01.jpg) in assets/news/bang-2-5/post.md
//   →  ![](/news/bang-2-5/photos/01.jpg)

import { visit } from 'unist-util-visit';

const REWRITE_ROOTS = [
  { srcPrefix: '/assets/news/',       publicRoot: 'news' },
  { srcPrefix: '/assets/guides/',     publicRoot: 'guides' },
  { srcPrefix: '/assets/characters/', publicRoot: 'characters' },
  { srcPrefix: '/assets/videos/',     publicRoot: 'videos' },
  { srcPrefix: '/assets/tierlists/',  publicRoot: 'tierlists' },
];

export default function remarkRewriteImages() {
  return (tree, file) => {
    const filePath = (file?.path ?? '').replace(/\\/g, '/');

    let collectionPrefix = null;
    let slug = null;

    for (const root of REWRITE_ROOTS) {
      const idx = filePath.indexOf(root.srcPrefix);
      if (idx === -1) continue;
      const rest = filePath.slice(idx + root.srcPrefix.length);
      slug = rest.split('/')[0];
      collectionPrefix = root.publicRoot;
      break;
    }

    if (!slug || !collectionPrefix) return;

    visit(tree, 'image', (node) => {
      const url = node.url ?? '';
      if (/^(https?:)?\/\//.test(url)) return; // external
      if (url.startsWith('/')) return;         // already absolute
      node.url = `/${collectionPrefix}/${slug}/${url}`;
    });
  };
}
