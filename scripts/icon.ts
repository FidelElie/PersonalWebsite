import fs from "fs";
import path from "path";

import { indentLine } from "../library/utilities";

const workingDir = process.cwd();

const iconManifestPath = path.join(workingDir, "public", "remixicon.symbol.svg");

const contents = fs.readFileSync(iconManifestPath, { encoding: "utf8", flag: "r" });

const idRegexp = /id=\".+\"/gi;

const ids = Array.from(
	contents.matchAll(idRegexp),
	(match) => {
		const matchedString = match[0];

		return matchedString.replace("id=\"ri-", "").replace("\"", "");
	}
);

const iconFilePath = path.join(workingDir, "components/core/Data", "Icon.data.ts");

const iconContentsPath = [
	"export const IconNames = [",
	...ids.map(id => indentLine(`\"${id}\",`, 1)),
	"] as const"
].join("\n");

fs.writeFileSync(iconFilePath, iconContentsPath);

console.log(`Icon enumeration created successfully to path ${iconFilePath}`);





