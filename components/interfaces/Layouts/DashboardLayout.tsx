import { useQueryClient } from "@tanstack/react-query";

import { useLogoutUser } from "@/library/api";
import { useTheme } from "@/library/providers";

import { Icon, Link, Page, type PageConfiguredProps } from "@/components/core";

export const DashboardLayout = (props: DashboardLayoutProps) => {
	const { children, ...pageProps } = props;

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
		<Page
			className="h-screen"
			header={(
				<div
					className="h-14 bg-white border-b dark:bg-gray-700 flex items-center justify-between px-5 dark:border-transparent"
				>
					<div className="flex items-center">

					</div>
					<div className="space-x-5 flex items-center">
						<button
							className=""
							onClick={() => setTheme(theme === null ? "light" : theme === "light" ? "dark" : null)}
						>
							<Icon
								name={determineThemeIndicatorIcon()}
								className="text-gray-800 text-xl dark:text-gray-50"
							/>
						</button>
						<button>
							<Icon name="user-3-line" className="text-xl text-gray-700 dark:text-white" />
						</button>
					</div>
				</div>
			)}
			asideClassName="fixed w-14 h-screen bg-white border-r dark:bg-gray-700 dark:border-transparent md:static"
			aside={(
				<div className="flex flex-col justify-center items-center h-full">
					<div className="h-14 flex items-center justify-center">
						<span className="w-4 h-4 rounded-full bg-primary shadow-lg" />
					</div>
					<div className="flex flex-col items-center flex-grow w-full">
						<SidebarLink href="/dashboard/info" icon="information-line" />
					</div>
				</div>
			)}
			{ ...pageProps }
		>
			{ children }
		</Page>
	)
}

export const SidebarLink = ({ href, icon }: { icon: string, href: string }) => (
	<Link href={href} className="h-14 flex items-center w-full justify-center">
		<Icon name={icon} className="text-2xl text-gray-800 dark:text-gray-50" />
	</Link>
)

export interface DashboardLayoutProps extends PageConfiguredProps {
	pageTitle?: string
}
