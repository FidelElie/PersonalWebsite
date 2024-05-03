import picocolors from "picocolors";

const logPrefix = "Content";

export const contentLogger = {
	info: (message: string) => console.info(`[${picocolors.blue(logPrefix)}] ${message}`),
	warn: (message: string) => console.warn(`[${picocolors.yellow(logPrefix)}] ${message}`),
	debug: (message: string) => console.debug(`[${picocolors.gray(logPrefix)}] ${message}`),
	error: (message: string) => console.error(`[${picocolors.red(logPrefix)}] ${message}`)
}
