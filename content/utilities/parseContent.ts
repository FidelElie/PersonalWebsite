/**
 *
 * @param content
 * @returns
 */
export const parseContent = (content?: string | string[] | null) => {
	return typeof content === "string" ? content : content?.join("\n") || "";
}
