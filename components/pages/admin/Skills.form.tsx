// ! Next and React
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { useLoader } from "../../../lib/provider/loader";
import { addEntry, editEntry } from "../../../lib/mutation";
import { EditedProjectsData, ProjectsData } from "../../../lib/types";

// ! Components
import TagsInput from "./TagsInput";

const SkillsForm = (props: any) => {
  const { data } = props;
  const router = useRouter();

  const { openLoader, closeLoader } = useLoader();
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    tags: []
  });

  const [iconCodePreview, setIconCodePreview] = useState("");

  useEffect(() => {
    if (data) setFormData({ ...formData, ...data });
  }, [data]);

  useEffect(() => {
    setIconCodePreview(formData.icon);
  }, [formData.icon])

  const modifyFormData = (key: string, value: string) => {
    setFormData({ ...formData, ...{ [key]: value } });
  }

  const handleSubmit = async () => {
    openLoader();

    const commitFunction = !data ? addEntry : editEntry;
    const commitResponse = await commitFunction("skills", formData);

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
          <label htmlFor="title" className="label">Skill Title</label>
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
          <label htmlFor="icon" className="label">Skill Icon</label>
          <div className="flex justify-between">
            <input
              type="text"
              className="input mr-2"
              id="icon"
              placeholder="Icon Code"
              value={formData.icon}
              onChange={
                (event: ChangeEvent) =>
                  modifyFormData("icon", (event.target as HTMLInputElement).value)
              }
            />
            <span className="w-12 h-12 p-5 border rounded-full text-secondary flex items-center justify-center text-4xl">
              <i className={iconCodePreview}/>
            </span>
          </div>
        </div>
        <TagsInput
          label="Skill Points"
          collection="skills"
          formData={formData}
          modifyFormData={modifyFormData}
        />
        <button className="button bg-primary text-white w-full whitespace-nowrap md:w-min" type="submit">
          {data ? "Edit Project" : "Add Project"}
        </button>
      </div>
    </form>
  )
}

export default SkillsForm;
