// ! Next and React
import { ChangeEvent, useState } from "react";

// ! Library
import { useDocument } from "../../../lib/hooks/useFirestore";

const TagsInput = (props: any) => {
  const { collection, formData, modifyFormData, label } = props;

  const [tagInput, setTagInput] = useState("");

  const removeTag = (tagToDelete: string) => {
    const tagsToModify: string[] = [...formData.tags];

    const modifiedTags = tagsToModify.filter(tag => tag != tagToDelete);

    modifyFormData("tags", modifiedTags);
  }

  return (
    <div className="field">
      <label htmlFor="tags" className="label">
        { label ? label : collection } Tags
      </label>
      <div className="flex flex-col">
        <div className="p-3 shadow-lg flex flex-wrap border-t border-gray-100">
          {formData.tags.length != 0 ? (
            formData.tags.map((tag: string, index: number) => (
              <div className="p-1" key={`${tag}-${index}`}>
                <div className="px-3 py-2 text-align rounded-md text-white bg-secondary" >
                  <span className="mr-3">{tag}</span>
                  <span className="text-lg" onClick={() => removeTag(tag)}>
                    <i className="fas fa-times" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-tertiary">No Tags Added</span>
          )}
        </div>
        <TagInput
          formData={formData}
          tagInput={tagInput}
          setTagInput={setTagInput}
          collection={collection}
          modifyFormData={modifyFormData}
        />
      </div>
    </div>
  )
}

const TagInput = (props: any) => {
  const { formData, tagInput, setTagInput, collection, modifyFormData } = props;
  const { data } = useDocument({ collection: "metadata", id: collection });

  const addTags = () => {
    const tagsToModify: string[] = [...formData.tags];
    const tagsToAdd = tagInput.includes(",") ?
      tagInput.split(",").map((tag: string) => tag.trim()) : tagInput;
    const mergedTags = tagsToModify.concat(tagsToAdd);

    // Ensures No Duplicate Tags
    const uniqueTags = Array.from(new Set(mergedTags));

    modifyFormData("tags", uniqueTags);
    setTagInput("");
  }

  return (
    <div className="flex flex-col space-y-2 items-center mt-2 md:flex-row md:space-y-0">
      <input
        list={data ? "tags-list" : "no-list"}
        type="text"
        className="input flex-grow mr-3"
        id="tags"
        placeholder="Project Tags"
        value={tagInput}
        onChange={(event: ChangeEvent) => setTagInput((event.target as HTMLInputElement).value)}
      />
      {
        data && (
          <datalist id="tags-list">
            { data.tags.map((tag: string) => <option key={`dl-${tag}`}>{ tag }</option>)}
          </datalist>
        )
      }
      <button
        className="button bg-tertiary whitespace-nowrap text-white"
        disabled={tagInput == ""}
        onClick={addTags}
        type="button"
      >
        Add Tag
      </button>
    </div>
  )
}

export default TagsInput;
