import { ReactNode } from "react";
// import { useQueryClient } from "@tanstack/react-query";

// import { useLogoutUser } from "@/library/api";
import { useAuth, useTheme } from "@/library/providers";

import { Flex, Icon, Link, Page, type PageConfiguredProps } from "@/components/core";

export const DashboardLayout = (props: DashboardLayoutProps) => {
	const { headerTitle, headerOptions, children, ...pageProps } = props;

	const { user } = useAuth();
	// const queryClient = useQueryClient();
	// const logoutUser = useLogoutUser({ onSuccess: () => queryClient.invalidateQueries(["user"]) });
	// const { theme, setTheme } = useTheme();
	// const [openSidebar, setOpenSidebar] = useState(false);

	// const determineThemeIndicatorIcon = () => {
	// 	switch (theme) {
	// 		case "dark":
	// 			return "moon-line";
	// 		case "light":
	// 			return "sun-line";
	// 		default:
	// 			return "computer-line";
	// 	}
	// }

	return (
		<Page
			className="h-screen"
			header={(
				<Flex
					className="h-12 bg-white border-b px-3 dark:bg-gray-700 items-center justify-between dark:border-transparent"
				>
					<Flex className="items-center space-x-2">
						<button className="md:hidden">
							<Icon name="menu-5-line" className="text-gray-800 text-xl dark:text-gray-50" />
						</button>
						{ headerTitle && <h1 className="uppercase dark:text-white">{ headerTitle }</h1> }
					</Flex>
					{ headerOptions }
				</Flex>
			)}
			mainClassName="p-5 overflow-y-auto"
			asideClassName="fixed w-48 h-screen bg-white border-r dark:bg-gray-700 dark:border-transparent md:static"
			aside={(
				<Flex className="flex-col justify-center items-center h-full">
					<div className="h-12 w-full flex items-center border-b px-3">
						<span className="w-4 h-4 rounded-full bg-primary shadow-lg" />
					</div>
					<div className="flex flex-col items-center flex-grow w-full p-2 space-y-2">
						<SidebarLink href="/dashboard/details" icon="information-line" text="Details" />
						<SidebarLink href="/dashboard/projects" icon="pages-line" text="Projects"/>
						<SidebarLink href="/dashboard/work" icon="file-list-line" text="Work"/>
					</div>
					<Flex className="flex-col items-center border-t w-full">
						<button className="flex items-center h-14 px-2">
							<div className="flex-shrink-0 w-12 h-12 flex justify-center items-center rounded-full bg-blue-500 mr-2">
								<Icon
									name="user-3-line"
									className="text-2xl text-white dark:text-gray-100"
								/>
							</div>
							<Flex className="flex-col justify-start">
								<span className="text-sm text-left">
									{user?.forename} {user?.surname}
								</span>
								<span className="text-blue-500 no-underline text-xs dark:text-gray-100">
									{user?.email}
								</span>
							</Flex>
						</button>
					</Flex>
				</Flex>
			)}
			{ ...pageProps }
		>
			{ children }
		</Page>
	)
}

export const SidebarLink = ({ href, icon, text }: { icon: string, href: string, text: string }) => (
	<div className="w-full">
		<Link href={href} className="flex items-center w-full py-1.5 px-1 rounded border">
			<Icon name={icon} className="text-2xl mr-1 text-gray-400 dark:text-gray-100" />
			<span className="text-gray-700 no-underline dark:text-gray-100">{text}</span>
		</Link>
	</div>
)

export interface DashboardLayoutProps extends PageConfiguredProps {
	title?: string;
	pageTitle?: string;
	headerTitle?: string;
	headerOptions?: ReactNode;
}
