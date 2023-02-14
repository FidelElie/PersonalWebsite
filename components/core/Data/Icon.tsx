import { forwardRef } from "react";

import { iconsMap, iconIdentifiers } from "./Icon.data";

import { joinClasses } from "@/library/utilities";

const colors = {
	primary: "text-primary",
	"primary-light": "text-primary-light",
	"primary-dark": "text-primary-dark",
	secondary: "text-secondary",
	"secondary-light": "text-secondary-light",
	"secondary-dark": "text-secondary-dark",
	tertiary: "text-tertiary",
	"tertiary-light": "text-tertiary-light",
	"tertiary-dark": "text-tertiary-dark",
	gray: "text-gray",
	"gray-lighter": "text-gray-lighter",
	"gray-light": "text-gray-light",
	"gray-dark": "text-gray-dark",
	"gray-darker": "text-gray-darker",
	white: "text-white",
	transparent: "text-transparent",
	currentColor: "text-currentColor",
	inherit: "text-inherit"
}

export const Icon = forwardRef<IconRef, IconProps>((props, ref) => {
	const {
		className,
		name,
		type = "fill",
		color,
		identifier
	} = props;

	if (name && !(name in iconsMap)) {
		console.error(`Couldn't find Icon ${name}`);
		return null;
	} else if (identifier && !iconIdentifiers.includes(identifier)) {
		console.error(`Unknown identifier provided to Icon got ${identifier}`);
		return null;
	} else if (!name && !identifier) {
		console.error("No identifier was found for Icon");
		return null;
	}

	const parseIconName = () => {
		if (name) {
			const supportedTypes = iconsMap[name];

			if (!supportedTypes.length) { return `ri-${name}`; }

			return `ri-${name}-${type}`;
		} else {
			return identifier;
		}
	}

	return (
		<svg className={joinClasses(color && colors[color], className)} width="1em" height="1em" fill="currentColor">
			<use xlinkHref={`./remixicon.symbol.svg#${parseIconName()}`}></use>
		</svg>
	)
});

type IconRef = HTMLElement;

export type IconNames = keyof typeof iconsMap;

interface IconInterfaceProps {
	className?: string,
	type?: "fill" | "line",
	color?: keyof typeof colors
}

interface IconWithName extends IconInterfaceProps {
	name: IconNames,
	identifier?: never
}

interface IconWithIdentifier extends IconInterfaceProps {
	name?: never,
	identifier: typeof iconIdentifiers[number]
}

export type IconProps = IconWithName | IconWithIdentifier;
