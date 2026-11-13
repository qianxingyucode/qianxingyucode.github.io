import fs from "node:fs";
import { loadConfigs, validateConfigs } from "./config-validation.js";

try {
  const errors = validateConfigs(loadConfigs());
  if (errors.length) throw new Error(errors.join("\n"));
  for (const lang of ['zh', 'en']) {
    const content = JSON.parse(fs.readFileSync(new URL(`../config/content-${lang}.json`, import.meta.url), 'utf8'));
    const configs = loadConfigs();
    for (const [key, value] of Object.entries(content)) configs[`${key}.json`] = value;
    const localeErrors = validateConfigs(configs);
    if (localeErrors.length) throw new Error(`${lang}: ${localeErrors.join('\n')}`);
  }
  console.log("Configuration valid: schema, publication IDs, preview data, and assets checked.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
