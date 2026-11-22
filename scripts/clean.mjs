// Empties _site/ before a build, so files you deleted or renamed do not linger online.
import { rm } from "node:fs/promises";
await rm(new URL("../_site", import.meta.url), { recursive: true, force: true });
