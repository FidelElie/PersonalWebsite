// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { useCollection } from "../lib/hooks/useFirestore";
import { EditedExperiencesData, EditedProjectsData, customiserTabs } from "../lib/types";
import { convertTimestamp, monthAndYear } from "../lib/utilities";

// ! Components
import AppLayout from "../components/layout/app";
import Sidebar from "../components/pages/index/Sidebar";
import Contacts from "../components/pages/index/Contacts";
import Display from "../components/pages/index/Display";
import Customiser from "../components/pages/index/Customiser";

type chosenDataType = {
  skills: any[]
  projects: EditedProjectsData[],
  experiences: EditedExperiencesData[],
  settings: { id: string, title: string, description: string}[]
}

const initialCVData = {
  skills: [],
  projects: [],
  experiences: [],
  settings: []
}

export default function FrontPage() {
  // ! Inital Data Loads States
  const [skillInitialLoad, setSkillInitialLoad] = useState(true);
  const [projectInitialLoad, setProjectInitialLoad] = useState(true);
  const [experienceInitialLoad, setExperienceInitialLoad] = useState(true);

  // ! Customiser States
  const [customiserTab, setCustomiserTab] = useState<customiserTabs>(null);
  const [cvData, setCvData] = useState<chosenDataType>(initialCVData);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const {
    data: skills,
    isLoading: skillsLoading
  } = useCollection({ collection: "skills" })

  const {
    data: projects,
    isLoading: projectsLoading
  } = useCollection({ collection: "projects"});

  const {
    data: experiences,
    isLoading: experiencesLoading
  } = useCollection({ collection: "experiences"});

  useEffect(() => {
    const skillsInitialLoad = skills && skillInitialLoad;
    const projectsInitialLoad = projects && projectInitialLoad;
    const experiencesInitialLoad = experiences && experienceInitialLoad;

    const allResourcesInitiallyLoaded =
      skillsInitialLoad && projectsInitialLoad && experiencesInitialLoad

    if (allResourcesInitiallyLoaded) {
      setCvData({
        ...cvData,
        ...{
          skills: skills!.slice(0, 9),
          projects: projects!.slice(0, 3),
          experiences: experiences!.slice(0, 1)
        }}
      )
      setSkillInitialLoad(false);
      setProjectInitialLoad(false);
      setExperienceInitialLoad(false);
    }
  }, [projects, experiences]);

  useEffect(() => { setCurrentUrl(window.location.href); }, []);

  const checkSetting = (key: string) =>
    cvData.settings.find(setting => setting.id == key);

  return (
    <AppLayout buttonOnClick={() => window.print()} buttonText="Print CV">
      <Customiser
        cvData={cvData}
        skills={skills}
        projects={projects}
        experiences={experiences}
        setCvData={setCvData}
        customiserTab={customiserTab}
        setCustomiserTab={setCustomiserTab}
      />
      <div className="w-full flex py-5 box-border wrapper px-5">
        <div className="flex flex-col-reverse w-full justify-center wrapper lg:flex-row">
          <div className="wrapper p-2 overflow-x-auto">
            <div id="page" className="shadow-lg relative">
              <span
                className="z-10 flex items-center fixed justify-center bg-secondary text-2xl h-12 w-12 right-5 top-36 text-white rounded-full shadow-lg cursor-pointer no-print hover:bg-primary lg:absolute lg:right-5 lg:top-5 lg:p-5 lg:h-16 lg:w-16"
                onClick={() => setCustomiserTab("settings")}
              >
                <i className="fas fa-pen"></i>
              </span>
              <Sidebar showReactTag={checkSetting("showReactTag")}/>
              <div className="flex flex-col w-2/3 relative" id="main">
                <div className="w-full mb-4">
                  <h1 className="text-4xl tracking-tighter text-secondary font-bold">Fidel Pierre Elie</h1>
                  <span className="text-lg text-primary">Developer</span>
                  <div className="w-full flex flex-wrap">
                    <Contacts/>
                  </div>
                </div>
                <Display
                  title="Skills & Expertise"
                  EntryComponent={SkillEntry}
                  loading={skillsLoading}
                  data={cvData.skills}
                  onClick={() => setCustomiserTab("skills")}
                />
                <Display
                  title="Notable Projects"
                  EntryComponent={ProjectEntry}
                  loading={projectsLoading}
                  data={cvData.projects}
                  onClick={() => setCustomiserTab("projects")}
                />
                <Display
                  title="Relevant Work Experience"
                  EntryComponent={ExperienceEntry}
                  loading={experiencesLoading}
                  data={cvData.experiences}
                  onClick={() => setCustomiserTab("experiences")}
                />
                {
                  (checkSetting("showWebsiteTag") && currentUrl) &&
                    <span className="text-xs text-tertiary absolute bottom-5 left-5">
                      Full CV can be found at
                      <a href={currentUrl}> { currentUrl }</a>
                    </span>
                }
              </div>
            </div>
          </div>
          <div className="text-tertiary space-x-2 my-3 no-print lg:hidden">
            <i className="fas fa-chevron-right" />
            <span className="text-sm">Scroll To See All</span>
          </div>
          <div className="text-center no-print mb-5 lg:hidden">
            <span className="text-tertiary">Hi There, For The Full Experience, View The CV On Bigger Screen</span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

const SkillEntry = (props: any) => {
  const { title, icon, tags, more } = props;

  return (
    <div className="flex w-1/3 py-1 px-1 box-border">
      <span className="text-2xl mr-2 text-secondary">
        <i className={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-sm uppercase">{title}</span>
        <span className="text-xs text-tertiary">
          {tags.join(", ")}
          {more && <span>&#8230;</span>}
        </span>
      </div>
    </div>
  )
}

const ProjectEntry = (props: any) => {
  const { title, link, description, tags } = props;

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between">
        <span className="text-sm uppercase">{title}</span>
        {link && <a href={link} className="text-sm">{link}</a>}
      </div>
      <span className="text-xs mb-2 text-tertiary">{tags.join(", ")}</span>
      <p className="text-sm leading-none">{description}</p>
    </div>
  )
}

const ExperienceEntry = (props: any) => {
  const { title, description, position, tags, startDate, endDate } = props;

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between">
        <span className="text-sm uppercase">{title}</span>
        <span className="text-xs">
          {monthAndYear(convertTimestamp(startDate), true)}
          -
          {monthAndYear(convertTimestamp(endDate), true)}
        </span>
      </div>
      <span className="mb-1 text-sm text-primary">{position}</span>
      <span className="text-xs mb-2 text-tertiary">{tags.join(", ")}</span>
      <p className="text-sm leading-none">{description}</p>
    </div>
  )
}
