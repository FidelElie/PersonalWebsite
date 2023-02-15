import { Get, Req, Res } from "next-api-decorators";
import type { ExtendedNextApiRequest } from "@/library/types/next.types";

import { Controller, ExposeSupabase } from "../decorators";

import prisma from "@/environment/prisma.client";

@Controller("/user")
@ExposeSupabase()
class UserController {
	@Get("/user")
	async getCurrentUser(@Req() req: ExtendedNextApiRequest) {
		if (!req.user) { return null; }

		return await prisma.users.findUnique({ where: { user_id: req.user.id }});
	}
}

export default UserController;
