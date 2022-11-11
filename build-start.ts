import { deleteSync } from "del";
deleteSync(['chrome/*', '!chrome/manifest.json'])
