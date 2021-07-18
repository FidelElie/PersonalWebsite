import { admin } from "../../config/firebase.server";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";

type verifyAuthType = {
    redirectUrl?: string,
    redirectOnSuccess?: boolean,
    redirectOnError?: boolean,
    successUrl?: string
}

const verifyAuthDefaults = {
    redirectUrl: "/admin/login",
    redirectOnSuccess: false,
    redirectOnError: true,
    successUrl: "/"
}

const verifyAuth = (options: verifyAuthType = verifyAuthDefaults) => {
    const { redirectUrl, redirectOnSuccess, redirectOnError, successUrl } = options;

    return async (context: NextPageContext) => {
        const sessionCookie = parseCookies(context).session || "";

        return admin
            .auth()
            .verifySessionCookie(sessionCookie, true)
            .then(() => {
                return redirectOnSuccess ? redirect(context, successUrl!) : { props: {} }
            })
            .catch(error => {
                return redirectOnError ? redirect(context, redirectUrl!) : { props: {}}
            })
    }
}

const redirect = (context: NextPageContext, redirectUrl: string) => {
    context.res!.statusCode = 302;
    context.res!.setHeader("Location", redirectUrl);
    return { props: {} }
}

export default verifyAuth;
