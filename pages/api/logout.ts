import { destroyCookie } from "nookies";

import type { NextApiResponse } from "next";

export default function logOut(_: null, res: NextApiResponse) {
    destroyCookie({ res }, "session", { path: "/" });
    res.status(200).json({ status: "success" });
}
