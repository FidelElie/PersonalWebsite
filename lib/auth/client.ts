import { auth } from "../../config/firebase.client";

const signIn = async ({ email, password }: { email: string, password: string}) => {
    return auth().signInWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
            try {
                const idToken = await user!.getIdToken();
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userToken: idToken })
                });
                return await response.json();
            } catch (error) {
                return { status: "error", error: error.code }
            }
        })
        .catch((error) =>  {
            console.clear();
            return { status: "error", error: error.code}
        });
}

const signOut = async () => {
    const response = await fetch("/api/logout", { method: "POST"});
    console.clear();
    return await response.json();
}

export { signIn, signOut };

