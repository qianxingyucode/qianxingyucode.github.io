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

English is the default; use `?lang=zh` for Chinese. The built `en.html` remains available for English. Both CVs are served from `public/files/`. The public site is configured at https://qianxingyucode.github.io/. The `main` branch contains source; GitHub Pages serves prebuilt files from the `gh-pages` branch. Custom Actions cannot currently run because GitHub reports an account billing lock, so the custom workflow is manual-only. Updates must be built locally and pushed to `gh-pages`; pushing source alone does not update the live site. The built-in Pages branch deployment remains available.

Generated content lives in `config/content-zh.json` and `content-en.json`; theme settings remain in `config/theme.jsonc`. The original author's personal media and profile content have been removed from this working copy. No paper abstract or external link is invented when the shared profile does not supply it.
