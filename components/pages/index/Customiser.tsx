// ! Library
import { joinClasses } from "../../../lib/utilities";
import { customiserTabs } from "../../../lib/types";

// ! Components
import Selector, { ExperienceSelector, ProjectSelector, SettingsSelector, SkillSelector } from "./Selector";

type infoTabs = {
  icon: string,
  key: customiserTabs
}[]

const tabInfo: infoTabs = [
  { icon: "fas fa-meteor", key: "skills" },
  { icon: "fas fa-project-diagram", key: "projects" },
  { icon: "fas fa-briefcase", key: "experiences" },
  { icon: "fas fa-tools", key: "settings" }
]

const settingsKeys = [
  {
    id: "showReactTag",
    title: "Show React Tag",
    description: "Show 'Made Made With React' tag in the bottom of the sidebar."
  },
  {
    id: "showWebsiteTag",
    title: "Show Website Tag",
    description: "Show Website URL at the bottom of CV for an easy access to dynamic CV"
  }
]

const Customiser = (props: any) => {
  const {
    cvData,
    skills,
    projects,
    experiences,
    setCvData,
    customiserTab,
    setCustomiserTab,
  } = props;

  const selectors: { [key: string] : any} = {
    skills: {
      SelectorComponent: SkillSelector,
      data: skills,
      selection: cvData.skills,
    },
    projects: {
      SelectorComponent: ProjectSelector,
      data: projects,
      selection: cvData.projects
    },
    experiences: {
      SelectorComponent: ExperienceSelector,
      data: experiences,
      selection: cvData.experiences
    },
    settings: {
      SelectorComponent: SettingsSelector,
      data: settingsKeys,
      selection: cvData.settings
    }
  }

  const currentSelector = selectors[customiserTab];

  const modifySelection = (key: string, value: any) =>
    setCvData({...cvData, ...{ [key]: value } });

  return (
    <div className={joinClasses("z-20 w-4/5 flex flex-col fixed h-screen top-0 bg-white shadow-lg p-5 transition-all md:w-1/2 lg:w-1/3", {
      "opacity-0 invisible": !customiserTab,
      "opacity-100 visible": customiserTab
    })}>
      <span
        className="text-3xl text-tertiary hover:text-primary cursor-pointer mb-5"
        onClick={() => setCustomiserTab(null)}
      >
        <i className="fas fa-times"></i>
      </span>
      <div className="flex flex-col w-full md:flex-row md:flex-wrap">
        {
          tabInfo.map(info => (
            <div className="p-0.5 w-full md:p-1 md:w-1/2" key={`customiser-tab-${info.key}`}>
              <button className={joinClasses("flex items-center justify-center button capitalize text-white w-full", {
                "bg-primary": info.key == customiserTab,
                "bg-tertiary": info.key != customiserTab
              })} onClick={() => setCustomiserTab(info.key)}>
                <span className="mr-2">
                  <i className={info.icon}/>
                </span>
                { info.key }
              </button>
            </div>
          ))
        }
      </div>
      <span className="capitalize text-4xl text-primary tracking-tighter mt-3">
        {customiserTab}
      </span>
      <span className="capitalize mb-3 text-sm text-tertiary">
        Choose {customiserTab} For CV
      </span>
      <div className="flex-grow overflow-y-auto pb-2 scrollbar scrollbar-thumb-primary scrollbar-track-gray-50 scrollbar-thin">
        <div className="w-full pr-3">
          {
            customiserTab && (
              <Selector
                {...currentSelector}
                setSelection={(value: any) => modifySelection(customiserTab, value)}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Customiser;
