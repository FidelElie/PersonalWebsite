import fs from "fs/promises";
import { existsSync } from "fs";

/**
 *
 * @param path
 */
export const ensureDirExists = async (path: string) => {
	if (!existsSync(path)) {
		await fs.mkdir(path, { recursive: true });
	}
}


