export const checkEnvironmentVariable = (
	identifier: string,
	variable: string | undefined,
	fallback?: () => string | undefined
) => {
	const hasFallback = fallback ? fallback() : undefined;

	if (!variable && !hasFallback) {
		throw new Error(`Missing required environment variable: ${identifier}`);
	}

	if (hasFallback) { variable = hasFallback; }

	return variable!;
}
