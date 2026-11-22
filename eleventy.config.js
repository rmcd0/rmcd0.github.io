/*
 * Eleventy configuration of your site.
 *
 * The Joran theme does all the work (theme/eleventy.js); your settings live in
 * content/site.config.js. Add your own Eleventy plugins, filters or shortcodes
 * below the line: they survive theme updates. Docs: https://www.11ty.dev/docs/config/
 */
import joran, { config as joranConfig } from "./theme/eleventy.js";

export default async function (eleventyConfig) {
  await eleventyConfig.addPlugin(joran);

  // ---- your additions ----
  // eleventyConfig.addFilter("shout", (s) => String(s).toUpperCase());
}

export const config = joranConfig;
