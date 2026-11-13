# Xingyu Qian · Academic Homepage

A bilingual academic homepage customized from [Anleeno Academic](https://github.com/Anleeno/anleeno-academic), using React and Vite. Original code is MIT licensed; see LICENSE.

From the parent directory, run `bash scripts/serve.sh` to preview or `bash scripts/build_site.sh` to generate `dist/`. Content is generated from `../profile.json` by `../scripts/sync_site.py`. See the parent README for the full workflow and backup location.

With Node.js 22+ and npm installed, this directory also supports:

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Chinese is the default; use `?lang=en` or the built `en.html` for English. Both CVs are served from `public/files/`. The upstream GitHub Pages workflow remains available when this directory is published as a repository. For a project subpath, update Vite base and asset URLs before deployment. No domain or remote publication is configured.

Generated content lives in `config/content-zh.json` and `content-en.json`; theme settings remain in `config/theme.jsonc`. The original author's personal media and profile content have been removed from this working copy. No paper abstract or external link is invented when the shared profile does not supply it.
