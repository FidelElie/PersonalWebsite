import type { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "next-api-decorators";
import { CONTROLLER_TOKEN } from "./decorators";

import IndexController from "./controllers/index.controller";
import UserController from "./controllers/user.controller";

import { morganMiddleware } from "./middlewares/morgan.middleware";
import { supabaseMiddleware } from "./middlewares/supabase.middleware";

const controllers = [
	IndexController,
	UserController
]

export const createServerApi = () => {
	const handlersMap = controllers.map(controller => {
		const handler = createHandler(controller);

		const controllerPath = Reflect.getMetadata(CONTROLLER_TOKEN, controller);

		const normalisedPath = !controllerPath.startsWith("/")  ? `/${controllerPath}` : controllerPath;

		return { basePath: normalisedPath, handler }
	});

	return (req: NextApiRequest, res: NextApiResponse) => {
		const { url } = req;
		morganMiddleware(req, res, () => {});
		supabaseMiddleware(req, res, () => {});

		if (!url) { return res.status(404).json({ statusCode: 404, url, message: "Not Found" }); }

		const strippedUrl = url.replace("/api", "");

		const normalisedUrl = strippedUrl === "" ? "/" : strippedUrl;

		const splitUrl = normalisedUrl.split("/");

		let matchedController = null;
		let index = 0;

		while (index < splitUrl.length) {
			const pathSegment = splitUrl.slice(0, splitUrl.length - index).join("/");
			matchedController = handlersMap.find(map => map.basePath === pathSegment)

			if (matchedController) { break;}

			index++;
		}

		if (!matchedController) {
			return res.status(404).json({ statusCode: 404, url, message: "Not Found" });
		}

		return matchedController.handler(req, res);
	}
}
