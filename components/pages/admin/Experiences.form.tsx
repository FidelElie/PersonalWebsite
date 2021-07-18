// ! Next and React
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { addEntry, editEntry } from "../../../lib/mutation";
import { ExperiencesData, EditedExperiencesData } from "../../../lib/types";
import { useLoader } from "../../../lib/provider/loader";

// ! Components
import DatePicker from "react-datepicker";
import TagsInput from "./TagsInput";
import { convertTimestamp } from "../../../lib/utilities";

type formDataType = ExperiencesData | EditedExperiencesData;

const ExperiencesForm = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const { openLoader, closeLoader } = useLoader();
  const [formData, setFormData] = useState<formDataType>({
    title: "",
    position: "",
    tags: [],
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    link: ""
  });

  useEffect(() => {
    if (data) {
      const dataMerged = {
        ...data,
        ...{
          startDate: convertTimestamp(data.startDate),
          endDate: convertTimestamp(data.endDate)
        }
      }
      setFormData({ ...formData, ...dataMerged });
    }
  }, [data]);

  const modifyFormData = (key: string, value: string | Date | null) => {
    setFormData({ ...formData, ...{ [key]: value } });
  }

  const handleSubmit = async () => {
    openLoader();

    const commitFunction = !data ? addEntry : editEntry;
    const commitResponse = await commitFunction("experiences", formData);

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
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("title", (event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="field">
          <label htmlFor="position" className="label">Position</label>
          <input
            required
            className="input"
            id="position"
            type="text"
            placeholder="Position"
            value={formData.position}
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("position", (event.target as HTMLInputElement).value)
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
            <span className="text-tertiary">{ formData.description.length }</span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="link" className="label">Experience Link</label>
          <input
            type="text"
            className="input"
            id="link"
            placeholder="Experience Link"
            value={formData.link}
            onChange={
              (event: ChangeEvent) =>
                modifyFormData("link", (event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="flex mb-5 flex-col md:flex-row">
          <div className="flex flex-col mb-2 md:mr-5">
            <label className="label">Start Date</label>
            <DatePicker
              wrapperClassName="datePicker"
              selected={formData.startDate}
              onChange={(date: Date | null) => modifyFormData("startDate", date)}
              />
          </div>
          <div className="flex flex-col">
            <label className="label">End Date</label>
            <DatePicker
              wrapperClassName="datePicker"
              selected={formData.endDate}
              onChange={(date: Date | null) => modifyFormData("endDate", date)}
            />
          </div>
        </div>
        <TagsInput
          label="Work Experience"
          collection="experiences"
          formData={formData}
          modifyFormData={modifyFormData}
        />
        <button className="button bg-primary text-white whitespace-nowrap w-full md:w-min" type="submit">
          { data ? "Edit Experience" : "Add Experience" }
        </button>
      </div>
    </form>
  )
}

export default ExperiencesForm;
