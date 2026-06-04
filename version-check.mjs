import { readFile } from "node:fs/promises";

const names = ["app.js", "index.html", "service-worker.js", "README.md", "VERSIONING.md"];
const files = Object.fromEntries(
  await Promise.all(names.map(async (name) => [name, await readFile(name, "utf8")]))
);

const appVersion = files["app.js"].match(/const APP_VERSION = "(v\d+\.\d+)"/)?.[1];
if (!appVersion) throw new Error("APP_VERSION was not found in app.js.");

const assetVersion = appVersion.slice(1);
const checks = [
  ["index.html app version", files["index.html"].includes(`app.js?v=${assetVersion}`)],
  ["index.html style version", files["index.html"].includes(`styles.css?v=${assetVersion}`)],
  ["service-worker app version", files["service-worker.js"].includes(`app.js?v=${assetVersion}`)],
  ["service-worker style version", files["service-worker.js"].includes(`styles.css?v=${assetVersion}`)],
  ["service-worker cache version", files["service-worker.js"].includes(appVersion)],
  ["README current release", files["README.md"].includes(`Current release: \`${appVersion}\``)],
  ["VERSIONING current release", files["VERSIONING.md"].includes(`Current release: \`${appVersion}\``)]
];

const failed = checks.filter(([, passed]) => !passed).map(([label]) => label);
if (failed.length) throw new Error(`Version mismatch for ${appVersion}: ${failed.join(", ")}`);

console.log(`VERSION_CHECK_OK: ${appVersion}`);
