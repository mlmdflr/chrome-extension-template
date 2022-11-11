import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from "path";
import config from "./src/manifest.config/content_scripts";
import config_permissions from "./src/manifest.config/permissions";

let chromeDirPath = resolve(`./chrome`)
let distManifestPath = resolve(`./chrome/manifest.json`)
let manifestPath = resolve(`./src/manifest.json`)



let manifest = JSON.parse(readFileSync(manifestPath, { encoding: 'utf-8' }))


!existsSync(chromeDirPath) && mkdirSync(chromeDirPath)
!existsSync(distManifestPath) && writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));

let distManifest = JSON.parse(readFileSync(distManifestPath, { encoding: 'utf-8' }))
distManifest['content_scripts'] = config
distManifest['permissions'] = config_permissions

writeFileSync(distManifestPath, JSON.stringify(distManifest, null, 2));