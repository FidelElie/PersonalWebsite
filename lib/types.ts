// ! Form Types

interface BaseFormData {
    title: string,
    description: string,
    tags: string[],
    link: string
}

interface ProjectsData extends BaseFormData {
    language: string
}

interface ExperiencesData extends BaseFormData {
    position: string,
    startDate: Date | null,
    endDate: Date | null,
}

interface EditedProjectsData extends ProjectsData {
    id: string
}

interface EditedExperiencesData extends ExperiencesData {
    id: string
}


// ! Customiser Types
type customiserTabs = "skills" | "projects" | "experiences" | "settings" | null;

export type {
    ProjectsData,
    ExperiencesData,
    EditedProjectsData,
    EditedExperiencesData
}

export type { customiserTabs }
