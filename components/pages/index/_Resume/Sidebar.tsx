import { Fragment } from "react";
import { Transition } from "@headlessui/react";

import { Button, Copy, Divider, Flex, Grid, Icon, IconProps } from "@/components/core";

import { useResumeBuilder } from "../Resume.provider";

export const Sidebar = () => {
	const { view, setView } = useResumeBuilder();

	return (
		<Transition
			show={!!view}
			as={Fragment}
			enter="transition-opacity duration-75"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<Flex.Column className="h-full w-96 border-r bg-white absolute top-0 left-0 z-20 p-5">
				<Grid className="grid-cols-1 gap-2 md:grid-cols-2">
					<SidebarOption icon="tools-line" text="Projects" onClick={() => setView("projects")}/>
					<SidebarOption
						icon="file-list-line"
						text="Experience"
						onClick={() => setView("experiences")}
					/>
					<SidebarOption icon="collage-line" text="Skills" onClick={() => setView("skills")}/>
					<SidebarOption
						icon="information-line"
						text="Details"
						onClick={() => setView("details")}
					/>
				</Grid>
				<Divider className="my-2" />
				<Flex.Row className="flex-grow overflow-y-auto">

				</Flex.Row>
				<Divider className="my-2"/>
				<Flex.Row className="justify-end">
					<Button onClick={() => setView(null)}>
						Close
					</Button>
				</Flex.Row>
			</Flex.Column>
		</Transition>
	)
}

const SidebarOption = ({ icon, text, onClick }: SidebarOptionProps) => (
	<Button onClick={onClick} className="items-center">
		<Icon name={icon} className="mr-1.5 text-lg" />
		<Copy className="text-white">{text}</Copy>
	</Button>
);

interface SidebarOptionProps {
	icon: IconProps["name"];
	text: string;
	onClick: () => void;
}
