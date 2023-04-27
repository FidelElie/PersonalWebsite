import { Fragment, MouseEventHandler, ReactNode } from "react";
import { Transition } from "@headlessui/react";

import { useAuth, useDashboard } from "@/library/providers";
import { clc } from "@/library/utilities";

import { Copy, Flex, Icon, IconNames, Link, Page, type PageConfiguredProps } from "@/components/core";

import { ThemeToggle } from "../Theme";

export const DashboardLayout = (props: DashboardLayoutProps) => {
	const { headerTitle, headerOptions, children, ...pageProps } = props;

	const { user } = useAuth();
	const { showSidebar, setShowSidebar } = useDashboard();

	const handleBackgroundClick: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.currentTarget === event.target) { setShowSidebar(false); }
	}

	return (
		<Page
			className="h-screen"
			header={(
				<Flex
					className="h-12 bg-white border-b px-3 dark:bg-gray-700 items-center justify-between dark:border-gray-500"
				>
					<Flex.Row className="items-center space-x-2">
						<button onClick={() => setShowSidebar(!showSidebar)}>
							<Icon
								name="menu-5-line"
								className="text-gray-800 text-xl dark:text-gray-50 md:hidden"
							/>
							<Icon
								name={showSidebar ? "arrow-left-s-line" : "arrow-right-s-line"}
								className="hidden text-gray-800 text-xl dark:text-gray-50 md:block"
							/>
						</button>
						{ headerTitle && <h1 className="uppercase dark:text-white">{ headerTitle }</h1> }
					</Flex.Row>
					{ headerOptions }
				</Flex>
			)}
			mainClassName="p-5 overflow-y-auto"
			asideClassName="fixed z-40 md:static"
			aside={(
				<Transition
        show={showSidebar}
				as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
				<div
					className="fixed h-screen w-full bg-black bg-opacity-25 md:static"
					onClick={handleBackgroundClick}
				>
					<Flex
						className={
							clc(
								"flex-col justify-center items-center w-48 h-screen bg-white border-r",
								"dark:bg-gray-700 dark:border-gray-500",
							)
						}
					>
						<Flex className="h-12 w-full flex justify-between items-center border-b px-3 dark:border-gray-500">
							<button onClick={() => setShowSidebar(false)}>
								<span className="w-4 h-4 rounded-full bg-primary shadow-lg block" />
							</button>
							<Flex className="items-center space-x-2">
								<Link href="/">
									<Icon name="home-4-line" className="text-black dark:text-white text-xl"/>
								</Link>
								<ThemeToggle initialPlacement="bottom-end"/>
							</Flex>
						</Flex>
						<Flex.Column className="items-center flex-grow w-full overflow-y-auto py-1" as="nav">
							<SidebarLink href="/dashboard/projects" icon="tools-line" text="Projects"/>
							<SidebarLink href="/dashboard/experiences" icon="file-list-line" text="Experiences"/>
							<SidebarLink href="/dashboard/tags" icon="bookmark-line" text="Tags"/>
							<SidebarLink href="/dashboard/skills" icon="collage-line" text="Skills"/>
							<SidebarLink href="/dashboard/details" icon="information-line" text="Details" />
						</Flex.Column>
						<Flex.Column className="items-center border-t w-full dark:border-gray-500">
							<button className="flex items-center py-2.5 px-2 w-full">
								<Flex.Row
									className="flex-shrink-0 w-10 h-10 justify-center items-center rounded-full bg-blue-500 mr-2"
								>
									<Icon
										name="user-3-line"
										className="text-2xl text-white dark:text-gray-100"
									/>
								</Flex.Row>
								<Flex className="flex-col justify-start">
									<Copy className="text-sm text-left uppercase tracking-tight">
										{user?.forename} {user?.surname}
									</Copy>
									<Copy className="text-blue-500 tracking-tight font-light no-underline text-xs">
										{user?.email}
									</Copy>
								</Flex>
							</button>
						</Flex.Column>
					</Flex>
				</div>
      </Transition>
			)}
			{ ...pageProps }
		>
			{ children }
		</Page>
	)
}

export const SidebarLink = ({ href, icon, text }: SidebarLinkProps) => (
	<div className="w-full py-1 px-2">
		<Link href={href} className="flex items-center w-full py-2 px-1 border rounded dark:border-gray-500">
			<Icon name={icon} className="text-lg mr-1.5 text-black dark:text-white" />
			<span
				className="font-light uppercase underline text-sm text-black underline-offset-4 decoration-primary decoration-1 dark:text-white mt-[-1.5px]"
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

interface SidebarLinkProps {
	icon: typeof IconNames[number],
	href: string,
	text: string
}
