import { Fragment } from "react";
import { Transition } from "@headlessui/react";

import { Button, Copy, Show, Flex, Grid, Icon, IconProps, Box, Divider } from "@/components/core";

import { useResumeBuilder } from "../ResumeProvider";

import { SidebarProjects } from "./_Sidebar/SidebarProjects";
import { SidebarExperiences } from "./_Sidebar/SidebarExperiences";
import { SidebarSkills } from "./_Sidebar/SidebarSkills";

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
			<Flex.Column
				as="aside"
				className="w-3/4 h-full p-3  border-r bg-white absolute top-0 left-0 z-20 md:p-5 md:w-96 dark:bg-gray-700 dark:border-gray-500"
			>
				<Grid className="gap-2 grid-cols-2">
					<SidebarOption icon="tools-line" text="Projects" onClick={() => setView("projects")}/>
					<SidebarOption
						icon="file-list-line"
						text="Work"
						onClick={() => setView("experiences")}
					/>
					<SidebarOption icon="collage-line" text="Skills" onClick={() => setView("skills")}/>
					{/* <SidebarOption
						icon="information-line"
						text="Details"
						onClick={() => setView("details")}
					/> */}
				</Grid>
				<Box className="flex-grow overflow-y-auto my-3">
					<Show if={view === "projects"}>
						<SidebarProjects/>
					</Show>
					<Show if={view === "experiences"}>
						<SidebarExperiences/>
					</Show>
					<Show if={view === "skills"}>
						<SidebarSkills/>
					</Show>
				</Box>
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
		<Icon name={icon} className="mr-1.5 text-lg flex-shrink-0" />
		<Copy className="text-white">{text}</Copy>
	</Button>
);

interface SidebarOptionProps {
	icon: IconProps["name"];
	text: string;
	onClick: () => void;
}
