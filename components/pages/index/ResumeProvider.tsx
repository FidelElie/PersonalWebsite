import {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
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
	toggleSelected: () => {},
	view: null,
	setView: () => {},
	isLoading: true,
	isSuccess: false,
	isError: false
}

const ResumeBuilderContext = createContext(initialContext);

export const ResumeBuilderProvider = (props: ResumeBuilderProps) => {
	const { children } = props;

	const initialLoadComplete = useRef(false);
	const [selected, setSelected] = useState(initialContext.selected);

	const detailsQuery = useFetchDetails();
	const projectsQuery = useFetchProjects({ where: [["active", "!=", false]]});
	const experiencesQuery = useFetchExperiences({ where: [["active", "!=", false]]});
	const skillsQuery = useFetchSkills({ where: [["active", "!=", false]]});
	const tagsQuery = useFetchTags();
	const queriesMap = {
		details: detailsQuery,
		projects: projectsQuery,
		skills: skillsQuery,
		experiences: experiencesQuery
	}
	const { isLoading, isSuccess, isError } = useQueryStatuses([
		detailsQuery,
		projectsQuery,
		experiencesQuery,
		tagsQuery,
		skillsQuery
	]);
	const [view, setView] = useState<SidebarViews>(null);

	const toggleSelected = (id: string, resource: keyof ResumeBuilderContextType["selected"]) => {
		setSelected(current => {
			const entries = current[resource];

			if (!entries.some(entry => entry.id === id)) {
				const queryValue = queriesMap[resource];

				const updatedEntries = (entries as any).concat(
					[(queryValue.data as any)?.find((entry: any) => entry.id === id)]
				);
				return { ...current, [resource]: updatedEntries }
			} else {
				return {...current, [resource]: (entries as any).filter((entry: any) => entry.id !== id) }
			}
		});
	}

	useEffect(() => {
		if (detailsQuery.data && !initialLoadComplete.current) {
			setSelected(current => ({ ...current, details: detailsQuery.data }))
		}
	}, [detailsQuery.data]);

	useEffect(() => {
		if (projectsQuery.data && !initialLoadComplete.current) {
			let projects = [...projectsQuery.data];
			setSelected(current => ({ ...current, projects: projects.slice(0, 2) }))
		}
	}, [projectsQuery.data]);

	useEffect(() => {
		if (experiencesQuery.data && !initialLoadComplete.current) {
			let experiences = [...experiencesQuery.data];

			experiences.sort(
				(a, b) => new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
			);

			setSelected(
				current => ({ ...current, experiences: experiences.slice(0, 1) }
				))
		}
	}, [experiencesQuery.data]);

	useEffect(() => {
		if (skillsQuery.data && !initialLoadComplete.current) {
			let skills = [...skillsQuery.data];

			setSelected(current => ({ ...current, skills: skills.slice(0, 6) }))
		}
	}, [skillsQuery.data]);

	useEffect(() => {
		if (!isLoading) { initialLoadComplete.current = true; }
	}, [isLoading]);

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
			toggleSelected,
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
	toggleSelected: (id: string, resource: "details" | "projects" | "skills" | "experiences") => void;
	view: SidebarViews;
	setView: Dispatch<SetStateAction<SidebarViews>>;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

export interface ResumeBuilderProps {
	children: ReactNode;
}
