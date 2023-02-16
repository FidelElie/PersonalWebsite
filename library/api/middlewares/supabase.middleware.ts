import type { NextApiResponse } from "next";
import { type NextFunction } from "next-api-decorators";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { ExtendedNextApiRequest } from "@/library/types/next.types";

export const supabaseMiddleware = async (
	req: ExtendedNextApiRequest, res: NextApiResponse, next: NextFunction
) => {
	const supabase = createServerSupabaseClient({ req, res });

	const { data: { session } } = await supabase.auth.getSession();

	req.user = session?.user;

	next();
}
