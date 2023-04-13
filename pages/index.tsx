import { useCallback, useEffect, useRef, useState } from "react";

import { useTouch, useEventHandler, useKeyboardEvent } from "@/library/hooks";

import Navbar from "@/components/layout/app/Navbar";
import Sidebar from "@/components/pages/index/Sidebar";
import Contacts from "@/components/pages/index/Contacts";

type Position = { left: number | null, top: number | null, scale: number | null }

export default function FrontPage() {
  const track = useRef<HTMLDivElement>(null!);
  const page = useRef<HTMLDivElement>(null!);

  const initialComplete = useRef(false);
  const initialScale = useRef<number | null>(null);
  const [position, setPosition] = useState<Position>({ left: null, top: null, scale: 1 });

  const [dragStarted, setDragStarted] = useState(false);
  const [mouseMoving, setMouseMoving] = useState(false);

  const touchConfig = useTouch<HTMLDivElement>({
    onTouchMove: (event) => {
      requestAnimationFrame(() => setPosition(currentPosition => ({
        ...currentPosition,
        left: position["left"]! + event.deltaX,
        top: position["top"]! + event.deltaY
      })));
    },
    state: {
      dragValue: dragStarted,
      setDragValue: setDragStarted,
      movingValue: mouseMoving,
      setMovingValue: setMouseMoving
    }
  });

  useEventHandler("window", "resize", () => {
    const trackBounding = track.current.getBoundingClientRect();

    const xMidpoint = trackBounding.width / 2;
    const yMidpoint = trackBounding.height / 2;

    editPosition({ left: xMidpoint, top: yMidpoint });
    setPosition(currentPosition => ({ ...currentPosition, left: xMidpoint, top: yMidpoint }));
  });

  const keys = useKeyboardEvent(["Space"]);


  const editPosition = useCallback((data: Partial<Position>) => setPosition(
    currentPosition => ({ ...currentPosition, ...data })
  ), []);

  const parseDelta = (delta: number, direction: "left" | "top") => {
    return position[direction]! + delta;
  }

  const movePosition = (x: number, y: number) => {
    requestAnimationFrame(() => editPosition({
      left: parseDelta(x, "left"),
      top: parseDelta(y, "top")
    }));
  }

  const parseScale = (delta: number) => {
    if (delta < 0) {
      return position["scale"]! + 0.1;
    } else if (delta > 0) {
      return position["scale"]! - 0.1;
    } else {
      return position["scale"];
    }
  }

  useEffect(() => {
    if (initialComplete.current) { return; }

    const determineInitialScale = (pageHyp: number, trackHyp: number) => {
      if (pageHyp === trackHyp) { return 1; }

      return pageHyp > trackHyp ? trackHyp / pageHyp : pageHyp / trackHyp;
    }

    const pageBounding = page.current.getBoundingClientRect();
    const trackBounding = track.current.getBoundingClientRect();

    const xMidpoint = trackBounding.width / 2;
    const yMidpoint = trackBounding.height / 2;

    const trackHyp = Math.sqrt(
      Math.pow(trackBounding.width, 2) + Math.pow(trackBounding.height, 2)
    );
    const pageHyp = Math.sqrt(
      Math.pow(pageBounding.width, 2) + Math.pow(pageBounding.height, 2)
    );

    const scale = determineInitialScale(pageHyp, trackHyp);

    initialScale.current = scale;

    editPosition({ left: xMidpoint, top: yMidpoint, scale });

    initialComplete.current = true;
  }, [editPosition]);


  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <div className={[
        "flex-grow overflow-hidden relative bg-gray-50 transition-all",
        (mouseMoving || keys.Space) ? "cursor-grab select-none" : [],
        (position.left && position.top && position.scale) ? "opacity-100" : "opacity-0"
      ].flat().join(" ")}
        ref={track}
        onMouseDown={(event) => {
          if (event.target !== track.current && !keys.Space) { return; }
          setDragStarted(true);
        }}
        onMouseMove={(event) => {
          if (dragStarted) {
            setMouseMoving(true);
            movePosition(event.movementX, event.movementY);
          }
        }}
        onWheel={(event) => {
          if (event.ctrlKey) {
            return requestAnimationFrame(() => editPosition({ scale: parseScale(event.deltaY) }));
          }

          movePosition(event.deltaX, event.deltaY);
        }}
        onMouseUp={() => { setDragStarted(false); setMouseMoving(false); }}
       {...touchConfig.register()}
      >
        {
          (initialScale.current && position.scale) && (
            <div
              className="rounded-lg shadow bg-white px-3 py-2 absolute top-2.5 right-2.5 z-20 text-sm tracking-tighter font-light"
            >
              <span>{Math.ceil((initialScale.current / position.scale) * 100)}%</span>
            </div>
          )
        }
        <div
          style={{
            position: "absolute",
            left: position.left!,
            top: position.top!,
            transform: `translate(-50%, -50%) scale(${position.scale})`
          }}
        >
          <div
            id="page"
            className="shadow-lg"
            ref={page}
          >
            {/* <span
                    className="z-10 flex items-center fixed justify-center bg-secondary text-2xl h-12 w-12 right-5 top-36 text-white rounded-full shadow-lg cursor-pointer no-print hover:bg-primary lg:absolute lg:right-5 lg:top-5 lg:p-5 lg:h-16 lg:w-16"
                    // onClick={() => setCustomiserTab("settings")}
                  >
                    <i className="fas fa-pen"></i>
                  </span> */}
            <Sidebar
            // showReactTag={checkSetting("showReactTag")}
            />
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
              {/* {
                    (checkSetting("showWebsiteTag") && currentUrl) &&
                    <span className="text-xs text-tertiary absolute bottom-5 left-5">
                      Full CV can be found at
                      <a href={currentUrl}> {currentUrl}</a>
                    </span>
                  } */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  )
}
