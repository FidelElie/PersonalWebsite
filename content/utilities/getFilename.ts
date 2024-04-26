import path from "path";

/**
 *
 * @param filePath
 * @param includeExtension
 * @returns
 */
export const getFileName = (filePath: string, includeExtension = false) => {
	return path.basename(filePath, !includeExtension ? path.extname(filePath) : undefined);
}
