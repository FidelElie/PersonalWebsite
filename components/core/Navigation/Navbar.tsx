import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { useTheme } from "@/library/providers";
import { useLogoutUser } from "@/library/api";

import { Icon } from "@/components/core";

export const Navbar = () => {
	const { theme, setTheme } = useTheme();

	const queryClient = useQueryClient();
	const logoutUser = useLogoutUser({ onSuccess: () => queryClient.invalidateQueries(["user"]) });

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
		<nav className="border-b w-full bg-white dark:bg-gray-700 dark:border-white dark:border-0">
			<div
				className="mx-auto container max-w-4xl px-5 py-2.5 flex items-center justify-between md:px-0"
			>
				<Link href="/" className="flex items-center text-tertiary w-min dark:text-gray-50">
					<span className="w-3 h-3 mr-2 rounded-full bg-primary shadow-lg" />
					<h1 className="tracking-tighter font-light whitespace-nowrap">
						Fidel Elie
					</h1>
				</Link>
				<div className="flex items-center justify-end space-x-3">
					<button
						className=""
						onClick={() => setTheme(theme === null ? "light" : theme === "light" ? "dark" : null)}
					>
						<Icon
							name={determineThemeIndicatorIcon()}
							className="text-gray-800 text-xl dark:text-gray-50"
						/>
					</button>
					<button
						className=""
						onClick={() => logoutUser.mutate()}
					>
						<Icon name="menu-5-line" className="text-gray-800 text-xl dark:text-gray-50" />
					</button>
				</div>
			</div>
		</nav>
	)
}
