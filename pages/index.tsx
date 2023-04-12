// ! Next and React
import { useEffect, useRef, useState } from "react";

// ! Library
// import { useCollection } from "../lib/hooks/useFirestore";

// ! Components
import AppLayout from "../components/layout/app";
import Sidebar from "../components/pages/index/Sidebar";
import Contacts from "../components/pages/index/Contacts";
import Navbar from "../components/layout/app/Navbar";
import Footer from "../components/layout/app/Footer";
// import Display from "../components/pages/index/Display";
// import Customiser from "../components/pages/index/Customiser";

type chosenDataType = {
  skills: any[]
  settings: { id: string, title: string, description: string}[]
}

const initialCVData = {
  skills: [],
  projects: [],
  experiences: [],
  settings: []
}

export default function FrontPage() {
  const page = useRef<HTMLDivElement>(null!);
  const track = useRef<HTMLDivElement>(null!);

  const [position, setPosition] = useState({ left: 0, top: 0, scale: 1 });

  // ! Inital Data Loads States
  // const [skillInitialLoad, setSkillInitialLoad] = useState(true);
  // const [projectInitialLoad, setProjectInitialLoad] = useState(true);
  // const [experienceInitialLoad, setExperienceInitialLoad] = useState(true);

  // ! Customiser States
  // const [customiserTab, setCustomiserTab] = useState(null);
  const [cvData, setCvData] = useState<chosenDataType>(initialCVData);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => { setCurrentUrl(window.location.href); }, []);

  const checkSetting = (key: string) => cvData.settings.find(setting => setting.id == key);

  useEffect(() => {
    // window.addEventListener()
  }, []);



  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <div className="flex-grow overflow-auto relative bg-gray-50">
        <div
          className="absolute p-5"
          ref={track}
          onDragStart={(event) => {
            event.preventDefault();

            const bounding = track.current.getBoundingClientRect();

            var x = event.clientX - bounding.left; //x position within the element.
            var y = event.clientY - bounding.top;  //y position within the element.
            console.log("Left? : " + x + " ; Top? : " + y + ".");
          // console.log(event.clientX)
          }}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${position.scale})`
          }}
          draggable
        >
          <div id="page" className="shadow-lg" ref={page}>
            {/* <span
                className="z-10 flex items-center fixed justify-center bg-secondary text-2xl h-12 w-12 right-5 top-36 text-white rounded-full shadow-lg cursor-pointer no-print hover:bg-primary lg:absolute lg:right-5 lg:top-5 lg:p-5 lg:h-16 lg:w-16"
                // onClick={() => setCustomiserTab("settings")}
              >
                <i className="fas fa-pen"></i>
              </span> */}
            <Sidebar showReactTag={checkSetting("showReactTag")} />
            <div className="flex flex-col w-2/3 relative" id="main">
              <div className="w-full mb-4">
                <h1 className="text-4xl tracking-tighter text-secondary font-bold">Fidel Pierre Elie</h1>
                <span className="text-lg text-primary">Developer</span>
                <div className="w-full flex flex-wrap">
                  <Contacts />
                </div>
              </div>
              {/* <Display
                  title="Skills & Expertise"
                  className="flex flex-wrap"
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
                /> */}
              {
                (checkSetting("showWebsiteTag") && currentUrl) &&
                <span className="text-xs text-tertiary absolute bottom-5 left-5">
                  Full CV can be found at
                  <a href={currentUrl}> {currentUrl}</a>
                </span>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
