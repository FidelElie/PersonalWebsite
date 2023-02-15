import type { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "next-api-decorators";
import { CONTROLLER_TOKEN } from "./decorators";

import IndexController from "./controllers/index.controller";
import UserController from "./controllers/user.controller";

const controllers = [
	IndexController,
	UserController
]

export const createServerApi = () => {
	const handlersMap = controllers.map(controller => {
		const handler = createHandler(controller);

		const controllerPath = Reflect.getMetadata(CONTROLLER_TOKEN, controller);

		return { path: controllerPath, handler }
	});

	return (req: NextApiRequest, res: NextApiResponse) => {
		const { url } = req;

		const strippedUrl = url ? url.replace("/api", "") : undefined;

		const normalisedUrl = strippedUrl === "" ? "/" : strippedUrl

		const matchedController = handlersMap.find(map => map.path === normalisedUrl)!;

		if (!matchedController) {
			return res.status(404).json({ statusCode: 404, message: "Not Found" });
		}

		return matchedController.handler(req, res);
	}
}
