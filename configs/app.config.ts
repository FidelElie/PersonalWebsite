type AppConfigType = {
	firebaseClient: {
		apiKey: string,
		authDomain: string,
		projectId: string,
		storageBucket: string,
		messageSenderId: string,
		appId: string,
		measurementId: string,
	},
	// firebaseServer: {
	// 	certification: {
	// 		project_id: string,
	// 		private_key: string,
	// 		client_email: string
	// 	},
	// 	databaseUrl: string
	// },
	mongodb: string
}

const fetchEnvironmentVariables = (map: ({[key: string]: string } | string[] )) => {
	if (map instanceof Array) {
		return Object.fromEntries(map.map(key => [key, process.env[key]]));
	} else {
		return Object.fromEntries(Object.entries(map).map(entry => [entry[0], process.env[entry[1]]]));
	}
}

const checkAllEnvironmentVariablesSet = (map: { [key: string]: any }) => {
	if (Object.values(map).some(keyValue => !keyValue)) {
		throw new Error("Invalid Configuration for firebase client, missing environment variables.");
	}
}

const AppConfig: AppConfigType = {
	firebaseClient: (() => {
		const firebaseClientKeys = {
			apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
			authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
			projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
			storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
			messageSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
			appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
			measurementId: "NEXT_PUBLIC_FIREBASE_MEASUREMENT"
		}

		const mappedEnvironmentKeys = fetchEnvironmentVariables(firebaseClientKeys);

		checkAllEnvironmentVariablesSet(mappedEnvironmentKeys);

		return mappedEnvironmentKeys as AppConfigType["firebaseClient"];
	})(),
	// firebaseServer: (() => {
	// 	const firebaseServerKeys = {
	// 		project_id: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
	// 		private_key: "FIREBASE_PRIVATE_KEY",
	// 		client_email: "FIREBASE_CLIENT_EMAIL"
	// 	}

	// 	const mappedEnvironmentKeys = fetchEnvironmentVariables(firebaseServerKeys);

	// 	checkAllEnvironmentVariablesSet(mappedEnvironmentKeys);

	// 	return {
	// 		certification: mappedEnvironmentKeys,
	// 		databaseUrl: `https://${mappedEnvironmentKeys.project_id}`
	// 	} as AppConfigType["firebaseServer"];
	// })(),
	mongodb: (() => {
		const mongodbKeys = ["MONGO_URI", "MONGO_USERNAME", "MONGO_PASSWORD", "MONGO_DATABASE"];

		const mappedEnvironmentKeys = fetchEnvironmentVariables(mongodbKeys);

		checkAllEnvironmentVariablesSet(mappedEnvironmentKeys);

		return (mappedEnvironmentKeys.MONGO_URI as string)
			.replace("<MONGO_USERNAME>", mappedEnvironmentKeys.MONGO_USERNAME as string)
			.replace("<MONGO_PASSWORD>", mappedEnvironmentKeys.MONGO_PASSWORD as string)
			.replace("<MONGO_DATABASE>", mappedEnvironmentKeys.MONGO_DATABASE as string)
	})()
}

export default AppConfig;
export type { AppConfigType };
