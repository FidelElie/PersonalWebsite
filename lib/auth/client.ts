import { auth } from "../../config/firebase.client";

type signInParams = {
    email: string,
    password: string
}

const signIn = async ({ email, password }: signInParams) => {
    return auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
        return user!.getIdToken().then(async (idToken) => {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userToken: idToken })
            });
            return await response.json();
        })
    })
        .catch((error) => {
            return {
                status: "auth-error",
                error: error.code
            }
        })
}

const signOut = async () => {
    const response = await fetch("/api/logout", {
        method: "POST"
    })

    return await response.json();
}

export { signIn, signOut };

