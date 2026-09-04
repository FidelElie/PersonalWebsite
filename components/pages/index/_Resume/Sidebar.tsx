import { Fragment, MouseEventHandler } from "react";
import { Transition } from "@headlessui/react";

import { clc } from "@/library/utilities";

import { Button, Copy, Show, Flex, Grid, Icon, IconProps, Box } from "@/components/core";

import { useResumeBuilder } from "../ResumeBuilderProvider";

import { SidebarProjects } from "./_Sidebar/SidebarProjects";
import { SidebarExperiences } from "./_Sidebar/SidebarExperiences";
import { SidebarSettings } from "./_Sidebar/SidebarSettings";
import { SidebarSkills } from "./_Sidebar/SidebarSkills";

export const Sidebar = () => {
	const { view, setView } = useResumeBuilder();

	const handleBackgroundClick: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.currentTarget === event.target) { setView(null); }
	}

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
			<Box
				className="w-full absolute top-0 h-full left-0 z-20 bg-black bg-opacity-10"
				onClick={handleBackgroundClick}
			>
				<Flex.Column
					as="aside"
					className="w-3/4 h-full p-3  border-r bg-white md:p-5 md:w-96 dark:bg-gray-700 dark:border-gray-500"
				>
					<Grid className="gap-2 grid-cols-2">
						<SidebarOption
							icon="tools-line"
							text="Projects"
							toggled={view === "projects"}
							onClick={() => setView("projects")}
							/>
						<SidebarOption
							icon="file-list-line"
							text="Work"
							toggled={view === "experiences"}
							onClick={() => setView("experiences")}
							/>
						<SidebarOption
							icon="collage-line"
							text="Skills"
							toggled={view === "skills"}
							onClick={() => setView("skills")}
						/>
						<SidebarOption
							icon="settings-2-line"
							text="Settings"
							toggled={view === "settings"}
							onClick={() => setView("settings")}
						/>
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
						<Show if={view === "settings"}>
							<SidebarSettings/>
						</Show>
					</Box>
					<Flex.Row className="justify-end">
						<Button onClick={() => setView(null)}>
							Close
						</Button>
					</Flex.Row>
				</Flex.Column>
			</Box>
		</Transition>
	)
}

const SidebarOption = ({ icon, text, toggled, onClick }: SidebarOptionProps) => (
	<button
		className={clc("border flex items-center rounded px-2 py-1.5",
			toggled ? "text-primary border-primary" : "text-gray-500 dark:text-white dark:border-white"
		)}
		onClick={onClick}
	>
		<Icon name={icon} className="mr-1.5 text-lg flex-shrink-0" />
		<Copy className={clc("text-sm", toggled ? "text-primary" : "text-gray-500")}>{text}</Copy>
	</button>
);

interface SidebarOptionProps {
	icon: IconProps["name"];
	text: string;
	toggled: boolean;
	onClick: () => void;
}
