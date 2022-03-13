import * as argon2 from "argon2";
import cookie from "cookie"

import User from "../../../../library/models/user.model";
import executeController, { type NextApiHandler } from "../../../../library/api/controller";

const route: NextApiHandler = async (req, res) => {
	await executeController(req, res, { POST: loginUserUsingCredentials });
}

// ! Lambdas
const loginUserUsingCredentials: NextApiHandler = async (req, res) => {
	const { payload } = req.body
	const { email, password } = payload;

	const user = await User.findOne({ email }).populate("role");

	if (!user) {
		return res.status(404).json({ success: false, message: "User does not exist" });
	}

	const credentialsMatch = await argon2.verify(user.strategies.password, password);

	if (!credentialsMatch) {
		return res.status(401).json({ success: false, message: "Incorrect password" })
	}

	res.setHeader("Set-Cookie", cookie.serialize("access", user.createAccessToken(), {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		maxAge: 60 * 60,
		sameSite: "strict",
		path: "/"
	}));

	return res.status(201).json({ success: true, payload: user });
}

export default route;
