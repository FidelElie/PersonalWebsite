export class EnvError extends Error {
	constructor(env: string, ...args: any) {
		const message = `Missing environment variable ${env}`;
		super(message, ...args);
		this.name = "EnvError";
	}
}
