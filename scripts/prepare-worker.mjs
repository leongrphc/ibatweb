import { readFileSync, writeFileSync } from "node:fs";

// OpenNext 1.8's AWS adapter emits an empty __dirname. Modern workerd's
// Node filesystem requires a real working directory; its module root is /bundle.
const file = new URL("../.open-next/server-functions/default/handler.mjs", import.meta.url);
const source = readFileSync(file, "utf8");
const original = 'function setNextjsServerWorkingDirectory(){process.chdir("")}';
const replacement = 'function setNextjsServerWorkingDirectory(){process.chdir("/bundle")}';
if (source.includes(original)) {
  writeFileSync(file, source.replace(original, replacement));
  console.log("Prepared Worker working directory for the Cloudflare runtime.");
} else if (!source.includes(replacement)) {
  throw new Error("OpenNext output changed: review the Worker working directory before deploying.");
}
