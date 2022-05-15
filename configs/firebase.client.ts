import { initializeApp, getApps } from "firebase/app";

import AppConfig from "./app.config";

let app;

if (!getApps().length) {
	try {
		app = initializeApp(AppConfig.firebaseClient);
	} catch (error) {
		console.error(error);
	}
}

export default app;
