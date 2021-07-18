// ! Next and React
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { useLoader } from "../../../lib/provider/loader";
import { addEntry, editEntry } from "../../../lib/mutation";
import { EditedProjectsData, ProjectsData } from "../../../lib/types";

// ! Components
import TagsInput from "./TagsInput";

type formDataType = ProjectsData | EditedProjectsData;

const ProjectsForm = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const { openLoader, closeLoader } = useLoader();
  const [formData, setFormData] = useState<formDataType>({
    language: "",
    title: "",
    tags: [],
    description: "",
    link: ""
  });

  useEffect(() => {
    if (data) setFormData({ ...formData, ...data });
  }, [data]);

  const modifyFormData = (key: string, value: string) => {
    setFormData({...formData, ...{ [key]: value}});
  }

  const handleSubmit = async () => {
    openLoader();

    const commitFunction = !data ? addEntry : editEntry;
    const commitResponse = await commitFunction("projects", formData);

    if (commitResponse.status == 200) {
      router.push("/admin/home");
    }
    closeLoader();
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
      className="mb-5"
    >
      <div className="flex flex-col">
        <div className="field">
          <label htmlFor="title" className="label">Title</label>
          <input
            required
            className="input"
            id="title"
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(event: ChangeEvent) =>
              modifyFormData("title", (event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="field">
          <label htmlFor="language" className="label">Primary Language</label>
          <input
            required
            className="input"
            id="language"
            type="text"
            placeholder="Primary Language"
            value={formData.language}
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("language", (event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="field">
          <label htmlFor="description" className="label">Description</label>
          <textarea
            required
            rows={4}
            className="input"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("description", (event.target as HTMLInputElement).value)
            }
          />
          <div className="w-full text-right">
            <span className="text-tertiary">{formData.description.length}</span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="link" className="label">Project Link</label>
          <input
            type="text"
            className="input"
            id="link"
            placeholder="Project Link"
            value={formData.link}
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("link", (event.target as HTMLInputElement).value)
            }
          />
        </div>
        <TagsInput
          label="Project"
          collection="projects"
          formData={formData}
          modifyFormData={modifyFormData}
        />
        <button className="button bg-primary text-white w-full whitespace-nowrap md:w-min" type="submit">
          { data ? "Edit Project" : "Add Project" }
        </button>
      </div>
    </form>
  )
}

export default ProjectsForm;
