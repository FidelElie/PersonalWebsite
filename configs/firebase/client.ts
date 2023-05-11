import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { checkEnvironmentVariable } from "@/library/utilities";

const FIREBASE_API_KEY = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_API_KEY", process.env.NEXT_PUBLIC_FIREBASE_API_KEY
);

const FIREBASE_AUTH_DOMAIN = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
);

const FIREBASE_PROJECT_ID = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_PROJECT_ID", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

const FIREBASE_STORAGE_BUCKET = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
);

const FIREBASE_MESSAGING_SENDER_ID = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
);

const FIREBASE_APP_ID = checkEnvironmentVariable(
	"NEXT_PUBLIC_FIREBASE_APP_ID", process.env.NEXT_PUBLIC_FIREBASE_APP_ID
);

const FIREBASE_MEASUREMENT_ID = checkEnvironmentVariable(
	"NEXT_PUBLIC_MEASUREMENT_ID", process.env.NEXT_PUBLIC_MEASUREMENT_ID
);

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
	measurementId: FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp;

export const getFirebaseClient = () => {
	if (app) return app;

	if (getApps().length <= 0) {
		app = initializeApp(firebaseConfig);
	}

	if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
		getAnalytics(app);
	}

	return app;
}
