import {
	createContext,
	useContext,
	useState,
	type ReactNode,
	type Dispatch,
	type SetStateAction
} from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { useQueryStatuses } from "@/library/hooks";
import {
	useFetchDetails,
	useFetchProjects,
	useFetchExperiences,
	useFetchTags,
	useFetchSkills
} from "@/library/api";
import {
	DetailSchema,
	ExperienceSchema,
	ProjectSchema,
	SkillSchema,
	TagSchema
} from "@/library/models";

const initialContext: ResumeBuilderContextType = {
	queries: { details: [], projects: [], tags: [], skills: [], experiences: [] },
	selected: { details: [], projects: [], skills: [], experiences: [] },
	view: null,
	setView: () => {},
	isLoading: true,
	isSuccess: false,
	isError: false
}

const ResumeBuilderContext = createContext(initialContext);

export const ResumeBuilderProvider = (props: ResumeBuilderProps) => {
	const { children } = props;

	const [selected, setSelected] = useState(initialContext.selected);
	const detailsQuery = useFetchDetails({
		onSuccess: (details) => setSelected(current => ({ ...current, details })) }
	);
	const projectsQuery = useFetchProjects({
		onSuccess: (projects) => setSelected(
			current => ({ ...current, projects: projects.slice(0, 2) }
		))
	});
	const experiencesQuery = useFetchExperiences({
		onSuccess: (experiences) => {
			experiences.sort(
				(a, b) => new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
			);

			setSelected(
				current => ({ ...current, experiences: experiences.slice(0, 1) }
			))
		}
	});
	const skillsQuery = useFetchSkills({
		onSuccess: (skills) => setSelected(current => ({ ...current, skills: skills.slice(0, 6) }))
	});
	const tagsQuery = useFetchTags();
	const { isLoading, isSuccess, isError } = useQueryStatuses([
		detailsQuery,
		projectsQuery,
		experiencesQuery,
		tagsQuery,
		skillsQuery
	]);
	const [view, setView] = useState<SidebarViews>(null);

	return (
		<ResumeBuilderContext.Provider value={{
			queries: {
				details: detailsQuery.isSuccess ? detailsQuery.data : [],
				projects: projectsQuery.isSuccess ? projectsQuery.data : [],
				tags: tagsQuery.isSuccess ? tagsQuery.data : [],
				skills: skillsQuery.isSuccess ? skillsQuery.data : [],
				experiences: experiencesQuery.isSuccess ? experiencesQuery.data : []
			},
			selected,
			view,
			setView,
			isLoading,
			isSuccess,
			isError
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

export type SidebarViews = "projects" | "experiences" | "skills" | "details" | null;

type Queries = {
	details: MergedModelSchema<DetailSchema>[];
	projects: MergedModelSchema<ProjectSchema>[];
	tags: MergedModelSchema<TagSchema>[];
	skills: MergedModelSchema<SkillSchema>[];
	experiences: MergedModelSchema<ExperienceSchema>[];
}

type Selections = Omit<Queries, "tags">;

export type ResumeBuilderContextType = {
	queries: Queries;
	selected: Selections;
	view: SidebarViews;
	setView: Dispatch<SetStateAction<SidebarViews>>;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

export interface ResumeBuilderProps {
	children: ReactNode;
}
