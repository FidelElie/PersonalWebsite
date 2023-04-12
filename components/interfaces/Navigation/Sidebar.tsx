import { useState } from "react";

import { joinClasses } from "@/library/utilities";

import { Flex, Link, Icon, Button, Show } from "@/components/core";
import { Rocket } from "../Assets";

export const Sidebar = (props: SidebarProps) => {
	const { className, initialOpen } = props;
	const [isOpen, setIsOpen] = useState(initialOpen ?? true);

	return (
		<Flex as="nav" className={
			joinClasses(
				"transition-all bg-gray flex-col items-center justify-center py-5 space-y-5",
				isOpen ? "h-screen w-14" : "rounded-full w-14 h-14 mt-2 ml-2",
				className
			)
		}>
			<Button onClick={() => setIsOpen(!isOpen)}>
				<Rocket className="text-4xl"/>
			</Button>
			<Show when={isOpen}>
				<Flex className="flex-grow flex-col space-y-4">
					<Link href="/dashboard" className="text-3xl">
						<Icon name="home-3" type="line" color="white" />
					</Link>
					<Link href="/dashboard/music" className="text-3xl">
						<Icon name="album" color="white"/>
					</Link>
					{/* <Link href="/dashboard/profile" className="text-3xl">
						<Icon name="profile" color="white"/>
					</Link>
					<Link href="/dashboard/skills" className="text-3xl">
						<Icon name="medal" color="white"/>
					</Link> */}
				</Flex>
			</Show>
		</Flex>
	)
}

export interface SidebarProps {
	className?: string,
	initialOpen?: boolean,
}
