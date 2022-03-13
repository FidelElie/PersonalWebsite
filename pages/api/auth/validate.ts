import jwt from "jsonwebtoken";
import cookie from "cookie";

import APP_CONFIG from "../../../configs/environment";

import User from "../../../library/models/user.model";
import executeController, { type NextApiHandler } from "../../../library/api/controller";

type jwtType = { user: { _id: string, email: string } }

const route: NextApiHandler = async (req, res) => {
	await executeController(req, res, { GET: validateAuthentication });
}

// ! Lambdas
const validateAuthentication: NextApiHandler = async (req, res) => {
	const { access } = req.cookies;

	if (access) { return res.status(403).json({ success: false, payload: null }) }

	try {
		const { user: { _id } } = jwt.verify(access, APP_CONFIG.secret) as jwtType;

		const user = await User.findById(_id);

		res.setHeader("Set-Cookie", cookie.serialize("access", user.createAccessToken(), {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: "strict",
			path: "/"
		}));
	} catch (error) {
		console.error(error);

		return res.status(403).json({ success: false, payload: null });
	}

}

export default route;
