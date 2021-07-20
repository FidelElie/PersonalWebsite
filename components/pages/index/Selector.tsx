// ! Library
import { joinClasses } from "../../../lib/utilities";

// ! Components
import Loading from "../../misc/Loading";

type entryType = { id: string, [key: string]: any }

type SelectorProps = {
  SelectorComponent: Function,
  data: entryType[],
  selection: entryType[],
  setSelection: Function,
}

type skillsSelectorTypes = { title: string, icon: string, tags: string[] }

type projectSelectorTypes = { title: string, language: string, tags: string[] }

type experienceSelectorTypes = { title: string, position: string, tags: string[] }

type settingsSelectorTypes = { id: string, title: string, description: string }

const Selector = (props: SelectorProps) => {
  const {
    SelectorComponent,
    data,
    selection,
    setSelection
  } = props;

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
    <div className="flex-grow overflow-y-auto">
      <div className="">
        {
          !data && ( <Loading message="Loading Data Please Wait"></Loading> )
        }
        {
          data &&
            data.length != 0 ? (
              data.map((entry: entryType) => (
                <div className="group cursor-pointer mb-1" key={`select-${entry.id}`}>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-md border border-transparent transition-colors group-hover:border-primary" onClick={() => toggleEntry(entry)}>
                    <div className="flex flex-col flex-grow">
                      <SelectorComponent {...entry} key={entry.id}/>
                    </div>
                    <i className={joinClasses("fas text-2xl transition-colors group-hover:text-primary", {
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
      </div>
    </div>
  )
}

const SkillSelector = ({ title, icon, tags}: skillsSelectorTypes) => (
  <>
    <div className="flex space-x-2">
      <span className="text-xl text-secondary">
        <i className={icon}/>
      </span>
      <span className="uppercase tacking-tighter font-medium">{title}</span>
    </div>
    <span className="text-xs text-tertiary">{tags.join(", ")}</span>
  </>
)

const ProjectSelector = ({ title, language, tags }: projectSelectorTypes) => (
  <>
    <span className="uppercase tracking-tighter font-medium">{title}</span>
    <span className="text-sm text-primary">{language}</span>
    <span className="text-xs text-tertiary">{tags.join(", ")}</span>
  </>
)

const ExperienceSelector = ({ title, position, tags }: experienceSelectorTypes) => (
  <>
    <span className="uppercase tracking-tighter font-medium">{title}</span>
    <span className="text-sm text-primary">{position}</span>
    <span className="text-xs text-tertiary">{tags.join(", ")}</span>
  </>
)

const SettingsSelector = ({ title, description }: settingsSelectorTypes) => {
  return (
    <>
      <span className="uppercase tracking-tighter font-medium">{title}</span>
      <span className="text-sm text-tertiary">{description}</span>
    </>
  )
}

export default Selector;
export { SkillSelector, ProjectSelector, ExperienceSelector, SettingsSelector }
