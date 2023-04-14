import * as admin from "firebase-admin";

import { checkEnvironmentVariable } from "@/library/utilities";

const FIREBASE_PROJECT_ID = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_PROJECT_ID", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

const FIREBASE_PROJECT_CLIENT_EMAIL = checkEnvironmentVariable(
	"FIREBASE_CLIENT_EMAIL", process.env.FIREBASE_CLIENT_EMAIL
);

const FIREBASE_PRIVATE_KEY = checkEnvironmentVariable(
	"FIREBASE_PRIVATE_KEY", process.env.FIREBASE_PRIVATE_KEY
);

const FIREBASE_DATABASE_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_PROJECT_CLIENT_EMAIL,
			privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		}),
		databaseURL: FIREBASE_DATABASE_URL,
	})
}

export default admin;

