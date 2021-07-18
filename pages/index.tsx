// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { joinClasses } from "../lib/utilities";
import { useCollection } from "../lib/hooks/useFirestore";
import { EditedExperiencesData, EditedProjectsData } from "../lib/types";

// ! Components
import AppLayout from "../components/layout/app";
import Sidebar from "../components/pages/index/Sidebar";
import Contacts from "../components/pages/index/Contacts";
import Skills from "../components/pages/index/Skills";
import Projects from "../components/pages/index/Projects";
import Experiences from "../components/pages/index/Experiences";
import Selector from "../components/pages/index/Selector";
import Loading from "../components/misc/Loading";


export default function FrontPage() {
  const [chosenProjects, setChosenProjects] = useState<EditedProjectsData[]>([]);
  const [chosenExperiences, setChosenExperiences] = useState<EditedExperiencesData[]>([]);

  const [projectInitialLoad, setProjectInitialLoad] = useState(true);
  const [experienceInitialLoad, setExperienceInitialLoad] = useState(true);

  const [showReactTag, setShowReactTag] = useState(false);
  const [showWebsiteTag, setShowWebsiteTag] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const [selectionMode, setSelectionMode] = useState<string | null>(null);

  const {
    data: projects,
    isLoading: projectsLoading
  } = useCollection({ collection: "projects"});

  const {
    data: experiences,
    isLoading: experiencesLoading
  } = useCollection({ collection: "experiences"});

  useEffect(() => {
    if (projects && projectInitialLoad) {
      setChosenProjects(projects.slice(0, 3));
      setProjectInitialLoad(false);
    }
  }, [projects]);

  useEffect(() => {
    if (experiences && experienceInitialLoad) {
      setChosenExperiences([experiences[0]]);
      setExperienceInitialLoad(false);
    }
  }, [experiences]);

  const toggleSelection = (mode: string) => {
    selectionMode == mode ? setSelectionMode(null) : setSelectionMode(mode);
  }

  useEffect(() => { setCurrentUrl(window.location.href); }, []);

  return (
    <AppLayout buttonOnClick={() => window.print()} buttonText="Print CV">
      {
        (selectionMode && projects && experiences) && (
          <div className="z-20 w-4/5 flex flex-col fixed h-screen top-0 bg-white shadow p-5 md:w-1/4">
            <span className="text-3xl text-tertiary hover:text-primary cursor-pointer" onClick={() => setSelectionMode(null)}>
              <i className="fas fa-times"></i>
            </span>
            <span className="capitalize text-3xl text-primary tracking-tighter mt-3">
              { selectionMode }
            </span>
            <span className="capitalize mb-3">
              Choose Suitable {selectionMode} To Go On The CV
            </span>
            <div className="flex-grow overflow-y-auto">
              <div className="">
                {
                  selectionMode == "projects" && (
                    <Selector
                      data={projects}
                      selection={chosenProjects}
                      setSelection={setChosenProjects}
                      fields={["title", "language", "tags"]}
                    />
                  )
                }
                {
                  selectionMode == "experiences" && (
                    <Selector
                      data={experiences}
                      selection={chosenExperiences}
                      setSelection={setChosenExperiences}
                      fields={["title", "position", "tags"]}
                    />
                  )
                }
              </div>
            </div>
          </div>
        )
      }
      <div className="w-full flex py-5 box-border wrapper px-5">
        <div className="flex flex-col-reverse w-full justify-center wrapper md:flex-row">
          <div className="no-print relative md:mr-5">
            <div className="mt-5 flex w-min justify-center rounded-md overflow-hidden shadow-lg md:sticky md:top-80 md:flex-col md:mt-0">
              <button className={joinClasses("flex p-3 items-center text-white whitespace-nowrap", {
                "bg-primary": showReactTag,
                "bg-tertiary": !showReactTag
              })}
                onClick={() => setShowReactTag(!showReactTag)}
              >
                Show React Tag
              </button>
              <button className={joinClasses("flex p-3 items-center text-white whitespace-nowrap", {
                "bg-primary": showWebsiteTag,
                "bg-tertiary": !showWebsiteTag
              })}
                onClick={() => setShowWebsiteTag(!showWebsiteTag)}
              >
                Show Website Tag
              </button>
            </div>
          </div>
          <div className="wrapper overflow-x-auto">
            <div id="page">
              <Sidebar showReactTag={showReactTag}/>
              <div className="flex flex-col w-2/3 relative" id="main">
                <div className="w-full mb-1">
                  <h1 className="text-4xl tracking-tighter text-secondary font-bold">Fidel Pierre Elie</h1>
                  <span className="text-lg text-primary">Developer</span>
                  <div className="w-full flex flex-wrap">
                    <Contacts/>
                  </div>
                </div>
                <Skills/>
                <Projects projects={chosenProjects} loading={projectsLoading}/>
                <Experiences experiences={chosenExperiences} loading={experiencesLoading}/>
                {
                  (showWebsiteTag && currentUrl) &&
                    <span className="text-xs text-tertiary absolute bottom-5 left-5">
                      Full CV can be found at
                      <a href={currentUrl}> { currentUrl }</a>
                    </span>
                }
              </div>
            </div>
          </div>
          <div className="text-tertiary space-x-2 my-3 no-print">
            <i className="fas fa-chevron-right" />
            <span className="text-sm">Scroll To See All</span>
          </div>
          <div className="no-print relative md:ml-5 md:mb-0">
            <div className="flex w-min rounded-md justify-center overflow-hidden shadow-lg md:flex-col md:sticky md:top-80">
              {
                (projectsLoading && experiencesLoading) ? (
                  <Loading/>
                ) : (
                  <>
                      <button className="flex p-3 items-center bg-primary text-white whitespace-nowrap"
                      onClick={() => { toggleSelection("projects")}}
                    >
                      <i className="fas fa-project-diagram mr-3"></i>
                      <span className="">Projects</span>
                    </button>
                      <button className="flex p-3 items-center bg-primary text-white whitespace-nowrap"
                      onClick={() => { toggleSelection("experiences") }}
                    >
                      <i className="fas fa-briefcase mr-3"></i>
                      <span className="">Experiences</span>
                    </button>
                  </>
                )
              }
            </div>
          </div>
          <div className="text-center no-print mb-5 md:hidden">
            <span className="text-tertiary ">Hi There, It Is Recommended That You Look At This Page On A Bigger Device.</span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
