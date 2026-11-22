/*
 * Front matter checks for posts (content/posts/). Runs once per file at build time.
 * Mistakes that would produce a broken page stop the build; others print a warning.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { JoranError, warn } from "./config.js";

export function validatePost(data, site, root) {
  const file = path.relative(root, path.resolve(root, data.page.inputPath));
  const errors = [];
  const types = site.types.map((t) => t.key);

  if (!data.title || typeof data.title !== "string") errors.push(`"title" is missing. Add  title: "My title"  to the front matter.`);
  if (data.type && !types.includes(data.type)) errors.push(`"type: ${data.type}" is not one of the types in site.config.js: ${types.join(", ")}. Fix the post or add the type to "types".`);
  if (data.tags && !Array.isArray(data.tags) && typeof data.tags !== "string") errors.push(`"tags" must be a list, e.g.  tags: ["travel", "bike"]`);
  if (data.lang && !/^[a-z]{2,3}(-[A-Za-z0-9]+)?$/.test(data.lang)) errors.push(`"lang: ${data.lang}" is not a language code. Use a code such as en or fr.`);
  if (data.image && !/^https?:/.test(data.image) && !data.image.startsWith("/")) errors.push(`"image" must start with "/" (e.g. /assets/img/photo.jpg) or be a full URL.`);
  if (data.image?.startsWith("/") && !existsSync(path.join(root, "content", data.image))) errors.push(`"image: ${data.image}" not found. Expected the file at content${data.image}.`);
  if (errors.length) throw new JoranError(file, errors.join("\n  "));

  if (!data.description) warn(file, `no "description": lists and link previews will be empty.`);
  if (!data.lang) warn(file, `no "lang": using "${site.defaultLanguage}".`);
  if (data.image && !data.imageAlt) warn(file, `"image" has no "imageAlt": describe the image for people who cannot see it (or use imageAlt: "" if it is purely decorative).`);
}
