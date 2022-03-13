import { ReactNode } from "react";
import classNames from "classnames";

const colorConfig = {
	blue: "text-primary",
	red: "text-secondary",
	gray: "text-tertiary",
	error: "text-red-500",
	link: "text-cyan-600"
}

const Config = {
	// base: "font-semibold",
	textColors: { default: "text-light", ...colorConfig },
	decorationColors: colorConfig,
	decorations: {
		underline: "underline",
		overline: "overline",
		"line-through": "line-through"
	},
	decorationsStyle: {
		solid: "decoration-solid",
		dotted: "decoration-dotted"
	},
	weights: {
		light: "font-light",
		bold: "font-semibold"
	},
	types: {
		h1: "text-8xl tracking-tighter",
		h2: "text-6xl tracking-tighter",
		h3: "text-4xl",
		subtitle: "text-base",
		caption: "text-xs"
	}
}

const Typography = (props: TypographyProps) => {
	const {
		className,
		type,
		as: Element = "p",
		decorate,
		color = "default",
		decorationColor,
		weight,
		onClick,
		noSelect,
		children
	} = props;

	return (
		<Element
			onClick={onClick}
		className={classNames(
			// Config.base,
			type && Config.types[type],
			color && Config.textColors[color],
			decorationColor && Config.decorationColors[color],
			decorate && Config.decorations[decorate],
			weight && Config.weights[weight],
			noSelect && "select-none",
			className
		)}>
			{ children }
		</Element>
	)
}

interface TypographyProps {
	className?: string,
	type?: keyof typeof Config.types,
	as?: "h1" | "h2" | "h3" | "h4" | "span" | "p" | "i" | "b",
	decorate?: keyof typeof Config.decorations,
	color?: keyof typeof Config.textColors,
	decorationColor?: keyof typeof Config.decorationColors,
	weight?: keyof typeof Config.weights,
	onClick?: any,
	noSelect?: boolean,
	children: ReactNode
}

export default Typography;
