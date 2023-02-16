import picocolors from "picocolors";
import morgan from "morgan";

const skip = () => {
	const NODE_ENV = process.env.NODE_ENV || "development";

	return NODE_ENV !== "development";
}

morgan.token("next-identifier", () => `${picocolors.blue("api")} -`);

morgan.token("next-status", (_, res) => {
	if (res.statusCode >= 500) {
		return picocolors.red(res.statusCode);
	} else if (res.statusCode >= 400) {
		return picocolors.yellow(res.statusCode);
	} else if (res.statusCode >= 300) {
		return picocolors.cyan(res.statusCode)
	} else {
		return picocolors.green(res.statusCode);
	}
})

export const morganMiddleware = morgan(
	":next-identifier :method :url :next-status :res[content-length] - :response-time ms",
	{ skip }
);
