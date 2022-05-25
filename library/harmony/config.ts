import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const { theme } = resolveConfig(tailwindConfig);

type PropsConfig = {
	[key: string]: {
		props: string[],
		codes?: string[]
	}
}

const generateHarmonyConfig = (config: PropsConfig) => {
	const configEntries = Object.entries(config).map(entry => {
		const [identifier, config] = entry;

		const correspondingTailwindValues = (theme as any)[identifier];
		const tailwindMap = Object.keys(correspondingTailwindValues);
		console.log(tailwindMap);

		const mappedProps = config.props.map(prop => {

		});
	})
}

const config = {
	margin: {
		props: ["m", "mr", "ml", "mt", "mb", "mx", "my"]
	},
	padding: {
		props: ["p", "pr", "pl", "pt", "pb", "px", "py"]
	},
	width: {
		props: ["width"],
		codes: ["w-"]
	},
	minWidth: {
		props: ["minWidth"],
		codes: ["min-w"]
	},
	maxWidth: {
		props: ["maxWidth"],
		codes: ["max-w"]
	},
	height: {
		props: ["height"],
		codes: ["h"]
	},
	minHeight: {
		props: ["minHeight"],
		codes: ["min-h"]
	},
	maxHeight: {
		props: ["maxHeight"],
		codes: ["max-h"]
	},
	colors: {
		props: ["color"],
		codes: ["text", "bg", "border", "text-decoration"]
	}
}

export default generateHarmonyConfig(config);

