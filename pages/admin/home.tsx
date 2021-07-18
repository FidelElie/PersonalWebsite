// ! Next and React
import Link from "next/link";
import { useState } from "react";

// ! Library
import verifyAuth from "../../lib/auth/server";
import { joinClasses } from "../../lib/utilities";

// ! Components
import AppLayout from "../../components/layout/app";
import ProjectsDisplay from "../../components/pages/admin/home/Projects.display";
import ExperiencesDisplay from "../../components/pages/admin/home/Experiences.display";

const displays = [
  {
    key: "projects",
    text: "Projects",
    addURL: "/admin/projects/add",
    editURL: "/admin/projects/edit",
    Component: ProjectsDisplay
  },
  {
    key: "experiences",
    text: "Work Experiences",
    addURL: "/admin/experiences/add",
    editURL: "/admin/experiences/edit",
    Component: ExperiencesDisplay
  }
]

export default function AdminHome() {
  const [display, setDisplay] = useState<string>(displays[0].key);
  const currentDisplay = displays.find(data => data.key == display);
  const DisplayComponent = currentDisplay!.Component;

  return (
    <AppLayout signOutButton>
      <div className="flex-grow mx-auto container px-5 py-10 box-border flex flex-col items-center lg:p-10">
        <div className="flex w-full flex-col shadow-lg rounded-md  overflow-hidden lg:w-2/3">
          <div className="flex flex-col w-full bg-primary p-5 md:justify-between md:flex-row md:items-center">
            <div className="flex flex-col mb-3 md:flex-row md:items-center md:space-x-2 md:mb-0">
              {
                displays.map(display => (
                  <button
                    className={joinClasses("text-xl tracking-tighter whitespace-nowrap w-min", {
                      "text-secondary": currentDisplay!.key != display.key,
                      "text-white": currentDisplay!.key == display.key
                    })}
                    onClick={() => setDisplay(display.key)}
                    key={display.key}
                  >
                    { display.text }
                  </button>
                ))
              }
            </div>
            <Link href={currentDisplay!.addURL}>
              <a className="button bg-white text-primary w-min whitespace-nowrap">
                Add { currentDisplay!.text }
              </a>
            </Link>
          </div>
          <div className="flex flex-col p-5">
            <DisplayComponent/>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

const getServerSideProps = verifyAuth();
export { getServerSideProps };
