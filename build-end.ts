import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from "path";
import config from "./src/manifest.config/content_scripts";
import config_permissions from "./src/manifest.config/permissions";

let distManifestPath = resolve(`./chrome/manifest.json`)
let manifestPath = resolve(`./src/manifest.json`)

let manifest = JSON.parse(readFileSync(manifestPath, { encoding: 'utf-8' }))

manifest['content_scripts'] = config
manifest['permissions'] = config_permissions

writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));