import { ReactNode } from "react";
import classNames from "classnames";

const Config = {
	base: "py-2 px-4 rounded-lg shadow-sm focus:ring-4 text-light font-semibold",
	themes: {
		primary: "bg-primary hover:bg-blue-500  focus:ring-blue-300",
		secondary: "bg-secondary hover:bg-red-500 focus:ring-red-300",
		tertiary: "bg-tertiary hover:bg-gray-500 focus:ring-gray-300"
	},
	sizes: { small: "text-sm", large: "text-lg" }
}

const Button = (props: ButtonProps) => {
	const {
		className,
		theme = "primary",
		size = "base",
		type = "button",
		children
	} = props;

	return (
		<button
			type={type}
			className={classNames(
				Config.base,
				theme && Config.themes[theme],
				size && Config.sizes[size],
				className,
			)}
		>
			{ children }
		</button>
	)
}

interface ButtonProps {
	className?: string,
	theme?: keyof typeof Config.themes,
	size?: keyof typeof Config.sizes,
	type?: "button" | "submit",
	children?: ReactNode
}

export default Button;
export type { ButtonProps }
