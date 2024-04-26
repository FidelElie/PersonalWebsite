export function sanitizeToURLSlug(fileName: string) {
	return fileName.split(" ").map(
		segment => segment.replace(/[/\\?%*:|"<>\"'\`]/g, '').toLowerCase() || ""
	).join("-");
}
