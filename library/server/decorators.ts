import type { NextApiResponse } from "next";
import { createMiddlewareDecorator, type NextFunction } from "next-api-decorators";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { ExtendedNextApiRequest } from "../types/next.types";

export const CONTROLLER_TOKEN = Symbol('instant:next:controllers');

export function Controller(route: string = "/"): ClassDecorator {
	return (target: object): void => {
		Reflect.defineMetadata(CONTROLLER_TOKEN,  route, target);
	}
}

export const ExposeSupabase = createMiddlewareDecorator(
	async (req: ExtendedNextApiRequest, res: NextApiResponse, next: NextFunction) => {
		const supabase = createServerSupabaseClient({ req, res });

		const { data: { session } } = await supabase.auth.getSession();

		req.user = session?.user;

		next();
	}
)
