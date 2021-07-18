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

export type {
    ProjectsData,
    ExperiencesData,
    EditedProjectsData,
    EditedExperiencesData
}
