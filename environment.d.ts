declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "staging" | "production";
			// App
			MAINTENANCE_MODE?: string;
			// Firebase Client
			NEXT_PUBLIC_FIREBASE_API_KEY?: string;
			NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
			NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
			NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
			NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
			NEXT_PUBLIC_FIREBASE_APP_ID?: string;
			NEXT_PUBLIC_MEASUREMENT_ID?: string;
			// Firebase Server
			FIREBASE_CLIENT_EMAIL?: string;
			FIREBASE_PRIVATE_KEY?: string;
			NEXT_PUBLIC_FIREBASE_DATABASE_URL?: string;
		}
	}
}

export {};