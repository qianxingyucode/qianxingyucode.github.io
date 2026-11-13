import chinese from '../config/content-zh.json';
import english from '../config/content-en.json';
export const language = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en';
const content = language === 'en' ? english : chinese;
const {site: siteData, hero: heroData, about: aboutData, news: newsItems, publications: publicationItems, experience: experienceItems, education: educationData, awards: awardsData, projects: projectItems} = content;
export const t = (en, zh) => language === 'en' ? en : zh;
if (typeof document !== 'undefined') {
document.documentElement.lang = content.site.language;
document.title = content.site.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.site.description);
}
import themeSource from "../config/theme.jsonc?raw";
import previewItems from "../config/publication-previews.json";
import { parseConfig } from "./utils/parseConfig";

const theme = parseConfig(themeSource, "config/theme.jsonc", true);

const assets = import.meta.glob("./assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolveAsset(path) {
  if (!path) return path;
  const key = path.startsWith("assets/") ? `./${path}` : path;
  const asset = assets[key];
  if (!asset) throw new Error(`Config references an unknown asset: ${path}`);
  return asset;
}

export { newsItems };
export const site = siteData;

export const scholarProfileUrl = heroData.socialLinks.find(link => link.icon === "scholar")?.url;
export const publicationPreviews = Object.fromEntries(
  Object.entries(previewItems).map(([id, preview]) => [id, {
    ...preview,
    figure: resolveAsset(preview.figure),
  }]),
);

export const hero = {
  ...heroData,
  profileImage: resolveAsset(heroData.profileImage),
  brandLogo: resolveAsset(heroData.brandLogo),
  primaryLinks: heroData.primaryLinks.map((link) => ({
    ...link,
    url: link.asset ? resolveAsset(link.asset) : link.url,
  })),
};

export const about = aboutData;

export const education = educationData;
export const awards = awardsData;
export function isSectionVisible(section) {
  return section.enabled === true && Array.isArray(section.items) && section.items.length > 0;
}

export const publications = publicationItems.map((publication) => ({
  ...publication,
  image: resolveAsset(publication.image),
}));

export const experiences = experienceItems.map((experience) => ({
  ...experience,
  logo: resolveAsset(experience.logo),
}));

export const projects = projectItems.map((project) => ({
  ...project,
  image: resolveAsset(project.image),
  video: resolveAsset(project.video),
}));

export function applyTheme() {
  Object.entries(theme).forEach(([name, value]) => {
    if (value) document.documentElement.style.setProperty(name, value);
  });
}
