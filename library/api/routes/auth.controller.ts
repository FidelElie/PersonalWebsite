import { Get, Req } from "next-api-decorators";
import type { ExtendedNextApiRequest } from "@/library/types/next.types";

import { Controller } from "../decorators";

import prisma from "@/environment/prisma.client";

const baseUrl = "/auth";

@Controller(baseUrl)
export default class AuthController {

	@Get(`${baseUrl}`)
	async getCurrentUser(@Req() req: ExtendedNextApiRequest) {
		if (!req.user) { return null; }

		const user = await prisma.users.findUnique({
			where: { user_id: req.user.id },
			include: { roles: {
				include: {
					role: true
				}
			} }
		});

		return user;
	}
}
