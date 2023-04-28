import { createContext, useContext, useState, type ReactNode } from "react";

import { useQueryStatuses } from "@/library/hooks";
import {
	useFetchDetails,
	useFetchProjects,
	useFetchExperiences,
	useFetchTags,
	useFetchSkills
} from "@/library/api";

const ResumeBuilderContext = createContext<ResumeBuilderContextType | null>(null);

export const ResumeBuilderProvider = (props: ResumeBuilderProps) => {
	const { children } = props;

	const detailsQuery = useFetchDetails();
	const projectsQuery = useFetchProjects();
	const experiencesQuery = useFetchExperiences();
	const tagsQuery = useFetchTags();
	const skillsQuery = useFetchSkills();
	const { isLoading, isSuccess, isError } = useQueryStatuses([
		detailsQuery,
		projectsQuery,
		experiencesQuery,
		tagsQuery,
		skillsQuery
	]);
	const [settings, setSettings] = useState({ reactTag: false, showWebsiteTag: false });

	const changeSetting = (key: keyof Settings, bool: boolean) => setSettings(
		currentSettings => ({ ...currentSettings, [key]: bool })
	);

	return (
		<ResumeBuilderContext.Provider value={{
			details: detailsQuery,
			projects: projectsQuery,
			tags: tagsQuery,
			isLoading,
			isSuccess,
			isError,
			settings,
			changeSetting
		}}>
			{ children }
		</ResumeBuilderContext.Provider>
	);
}

export const useResumeBuilder = () => {
	const context = useContext(ResumeBuilderContext);

	if (!context) {
		throw new Error("useResumeBuilder must be used withing a ResumeBuilderProvider");
	}

	return context;
}

type Settings = { reactTag: boolean; showWebsiteTag: boolean }

export type ResumeBuilderContextType = {
	details: ReturnType<typeof useFetchDetails>;
	projects: ReturnType<typeof useFetchProjects>;
	tags: ReturnType<typeof useFetchTags>;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	settings: Settings;
	changeSetting: (key: keyof Settings, bool: boolean) => void;
}

export interface ResumeBuilderProps {
	children: ReactNode
}
