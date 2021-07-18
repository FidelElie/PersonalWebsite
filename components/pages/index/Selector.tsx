// ! Library
import { joinClasses } from "../../../lib/utilities";
import { EditedExperiencesData } from "../../../lib/types";

type entryType = {
  id: string,
  [key: string]: any
}

type SelectorProps = {
  data: entryType[],
  selection: entryType[],
  setSelection: Function,
  fields: string[],
}

const Selector = (props: SelectorProps) => {
  const { data, selection, setSelection, fields } = props;

  if (fields.length != 3) throw new Error("3 Fields Must Be Provided To Selector")

  const selectedEntryIds = selection.map(
    (experiences: any) => experiences.id);

  const toggleEntry = (entryToAdd: entryType) => {
    const selectedEntries = [...selection];

    const modifiedEntries =
      selectedEntryIds.includes(entryToAdd.id) ?
      selectedEntries.filter((entry: any) => entry.id != entryToAdd.id ) :
      selectedEntries.concat([entryToAdd]);

    setSelection(modifiedEntries);
  }

  return (
  <>
    {
      data.length != 0 ? (
        data.map((entry: any) => (
          <div className="group cursor-pointer mb-1" key={`select-${entry.id}`}>
            <div className="flex items-center p-2 rounded-md border border-transparent group-hover:border-primary" onClick={() => toggleEntry(entry)}>
              <div className="flex flex-col flex-grow mr-5">
                {
                  fields.map((field, index) =>
                    <SpanGenerator
                      entry={entry}
                      field={field}
                      index={index}
                      key={`${entry.id}-${field}`}
                    />)
                }
              </div>
              <i className={joinClasses("fas text-xl group-hover:text-primary", {
                "fa-toggle-on text-secondary": selectedEntryIds.includes(entry.id),
                "fa-toggle-off text-tertiary": !selectedEntryIds.includes(entry.id)
              })} />
            </div>
          </div>
        ))
      ) : (
        <span className="text-tertiary">No Entries Were Found</span>
      )
    }
  </>
  )
}

const SpanGenerator = (props: any) => {
  const { entry, field, index } = props;
  const fontSizes = ["text-base", "text-sm", "text-xs"];

  const correspondingValue = entry[field];

  if (correspondingValue instanceof Array) {
    return <span className={fontSizes[index]}>{ correspondingValue.join(", ") }</span>
  } else {
    return <span className={fontSizes[index]}>{ correspondingValue }</span>
  }
}

export default Selector;
