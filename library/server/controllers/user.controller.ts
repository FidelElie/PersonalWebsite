import { Get, Req } from "next-api-decorators";
import type { ExtendedNextApiRequest } from "@/library/types/next.types";

import { Controller } from "../decorators";

import prisma from "@/environment/prisma.client";

const baseUrl = "/user";

@Controller(baseUrl)
export default class UserController {

	@Get(`${baseUrl}`)
	async getCurrentUser(@Req() req: ExtendedNextApiRequest) {
		if (!req.user) { return null; }

		const user = await prisma.users.findUnique({ where: { user_id: req.user.id } });

		return user;
	}

	@Get(`${baseUrl}/test`)
	async getUserTest() {
		return "hello World"
	}
}
/**
 * Registers a new controller for the server. Method routes still have to contain path
 * @param route
 * @returns Decorated class
 */
