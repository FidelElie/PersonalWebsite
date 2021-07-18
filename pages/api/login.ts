import { setCookie } from "nookies";
import { admin } from "../../config/firebase.server";

import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const userToken = req.body.userToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(userToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true, path: "/" };
                setCookie({ res }, "session", sessionCookie, options);
                res.status(200).json({
                    status: "success",
                    message: "Welcome To The App"
                });
            }
        ).catch(
            (error) => {
                console.log(error)
                res.status(401).json({
                    status: "error",
                    message: "Unauthorised Request"
            });
        }
        )
}
