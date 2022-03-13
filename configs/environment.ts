const {
	APP_SECRET,
	// Mongo DB Atlas
	MONGO_URI,
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_DATABASE,
	// Google Cloud Platform
	GOOGLE_PROJECT_ID,
	GOOGLE_CLIENT_EMAIL,
	GOOGLE_BUCKET_NAME,
	GOOGLE_PRIVATE_KEY,
} = process.env;

interface ConfigStruct {
	secret: string,
	mongodb: string,
	// google: {
	// 	serviceAccount: {
	// 		projectId: string,
	// 		credentials: {
	// 			client_email: string,
	// 			private_key: string
	// 		}
	// 	},
	// 	storageBucket: string
	// }
}

const APP_CONFIG: ConfigStruct = {
	// Server configs
	secret: (() => {
		if (!APP_SECRET) { throw new Error("APP_SECRET is a required environment variable.") }

		return APP_SECRET
	})(),
	mongodb: (() => {
		const requiredVariables = [MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE];

		if (requiredVariables.some(credential => !credential)) {
			throw new Error("Mongo credential missing: MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD and MONGO_DATABASE are required.");
		}

		return MONGO_URI
			.replace("<MONGO_USERNAME>", MONGO_USERNAME)
			.replace("<MONGO_PASSWORD>", encodeURIComponent(MONGO_PASSWORD))
			.replace("<MONGO_DATABASE>", MONGO_DATABASE);
	})(),
	// google: (() => {
	// 	const requiredVariables = [
	// 		GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_BUCKET_NAME, GOOGLE_PRIVATE_KEY
	// 	];

	// 	if (requiredVariables.some(credential => !credential)) {
	// 		throw new Error("Google credentials missing: GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_BUCKET_NAME and GOOGLE_PRIVATE_KEY are required.");
	// 	}

	// 	return {
	// 		serviceAccount: {
	// 			projectId: GOOGLE_PROJECT_ID,
	// 			credentials: {
	// 				client_email: GOOGLE_CLIENT_EMAIL,
	// 				private_key: GOOGLE_PRIVATE_KEY
	// 			}
	// 		},
	// 		storageBucket: GOOGLE_BUCKET_NAME
	// 	}
	// })()
}

export default APP_CONFIG
