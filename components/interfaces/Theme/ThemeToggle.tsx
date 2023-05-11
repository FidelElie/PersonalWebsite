import { useTheme } from "@/library/providers";

import { Divider, Icon, IconProps, Menu, MenuProps } from "@/components/core";
import { MouseEventHandler } from "react";

export const ThemeToggle = (props: ThemeToggleProps) => {
	const { initialPlacement = "bottom-start" } = props;
	const { theme, setTheme } = useTheme();

	const determineThemeIndicatorIcon = () => {
		switch (theme) {
			case "dark":
				return "moon-line";
			case "light":
				return "sun-line";
			default:
				return "computer-line";
		}
	}

	return (
		<Menu
			placement={initialPlacement}
			button={(
				<Icon
					name={determineThemeIndicatorIcon()}
					className="text-gray-800 text-xl dark:text-gray-50"
				/>
			)}
			buttonClassName="flex w-full items-center justify-center rounded text-sm font-medium hover:bg-opacity-30"
			menuClassName="bg-white z-50 rounded flex flex-col border shadow dark:border-gray-500 dark:bg-gray-700"
			offset={7.5}
		>
			<ThemeToggleOption text="Light Theme" icon="sun-line" onClick={() => setTheme("light")}/>
			<Divider className="dark:border-gray-500"/>
			<ThemeToggleOption text="Dark Theme" icon="moon-line" onClick={() => setTheme("dark")}/>
			<Divider className="dark:border-gray-500" />
			<ThemeToggleOption
				text="System Preference"
				icon="computer-line"
				onClick={() => setTheme(null)}
			/>
		</Menu>
	)
}

const ThemeToggleOption = (props: ThemeToggleOptionProps) => {
	const { text, icon, onClick } = props;

	const dispatchOnClick: MouseEventHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();

		onClick();
	}

	return (
		<Menu.Item>
			<button className="flex items-center py-2 px-2" onClick={dispatchOnClick}>
				<Icon name={icon} className="text-xl mr-1 dark:text-white"/>
				<span className="font-light text-sm dark:text-white">{text}</span>
			</button>
		</Menu.Item>
	)
}

export interface ThemeToggleOptionProps {
	text: string,
	icon: IconProps["name"],
	onClick: () => void
}

export interface ThemeToggleProps {
	initialPlacement?: MenuProps["placement"]
}
