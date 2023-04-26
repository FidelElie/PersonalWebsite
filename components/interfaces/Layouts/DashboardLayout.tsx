import { ReactNode } from "react";

import { useAuth } from "@/library/providers";

import { Flex, Icon, Link, Page, type PageConfiguredProps } from "@/components/core";

import { ThemeToggle } from "../Theme";

export const DashboardLayout = (props: DashboardLayoutProps) => {
	const { headerTitle, headerOptions, children, ...pageProps } = props;

	const { user } = useAuth();

	return (
		<Page
			className="h-screen"
			header={(
				<Flex
					className="h-12 bg-white border-b px-3 dark:bg-gray-700 items-center justify-between dark:border-gray-500"
				>
					<Flex.Row className="items-center space-x-2">
						<button className="md:hidden">
							<Icon name="menu-5-line" className="text-gray-800 text-xl dark:text-gray-50" />
						</button>
						{ headerTitle && <h1 className="uppercase dark:text-white">{ headerTitle }</h1> }
					</Flex.Row>
					{ headerOptions }
				</Flex>
			)}
			mainClassName="p-5 overflow-y-auto"
			asideClassName="fixed w-48 h-screen bg-white border-r dark:bg-gray-700 dark:border-gray-500 md:static"
			aside={(
				<Flex className="flex-col justify-center items-center h-full">
					<Flex className="h-12 w-full flex justify-between items-center border-b px-3 dark:border-gray-500">
						<span className="w-4 h-4 rounded-full bg-primary shadow-lg" />
						<Flex className="items-center space-x-2">
							<Link href="/">
								<Icon name="home-4-line" className="text-black dark:text-white text-xl"/>
							</Link>
							<ThemeToggle/>
						</Flex>
					</Flex>
					<div className="flex flex-col items-center flex-grow w-full overflow-y-auto">
						<div className="w-full py-1">
							<SidebarLink href="/dashboard/details" icon="information-line" text="Details" />
							<SidebarLink href="/dashboard/projects" icon="tools-line" text="Projects"/>
							<SidebarLink href="/dashboard/experiences" icon="file-list-line" text="Experiences"/>
							<SidebarLink href="/dashboard/tags" icon="bookmark-line" text="Tags"/>
						</div>
					</div>
					<Flex className="flex-col items-center border-t w-full dark:border-gray-500">
						<button className="flex items-center py-2.5 px-3">
							<div
								className="flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-blue-500 mr-2"
							>
								<Icon
									name="user-3-line"
									className="text-2xl text-white dark:text-gray-100"
								/>
							</div>
							<Flex className="flex-col justify-start">
								<span className="text-sm text-left uppercase tracking-tight dark:text-white">
									{user?.forename} {user?.surname}
								</span>
								<span className="text-blue-500 tracking-tight font-light no-underline text-xs dark:text-gray-400">
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
	<div className="w-full py-1 px-2">
		<Link href={href} className="flex items-center w-full py-2 px-1 border rounded dark:border-gray-500">
			<Icon name={icon} className="text-lg mr-1.5 text-black dark:text-white" />
			<span
				className="font-light uppercase no-underline text-sm"
			>
					{text}
			</span>
		</Link>
	</div>
)

export interface DashboardLayoutProps extends PageConfiguredProps {
	headerTitle?: string;
	headerOptions?: ReactNode;
}
