import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Resume.module.css";

import { clc } from "@/library/utilities";
import { useEventHandler, useTouch } from "@/library/hooks";

import Sidebar from "./_Resume/Sidebar";
import Contacts from "./_Resume/Contacts";

type Position = { left: number | null, top: number | null, scale: number | null }

export const Resume = () => {
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
		const percentageOfTrack = 0.9;

		const scale = determineInitialScale(
			pageBounding.height,
			trackBounding.height * percentageOfTrack
		);

		initialScale.current = scale;

		editPosition({ left: xMidpoint, top: yMidpoint, scale });

		initialComplete.current = true;
	}, [editPosition]);

	return (
		<div
			ref={track}
			className={clc(
				styles.CurriculumVitaeContainer,
				(mouseMoving) ? "cursor-grab select-none" : [],
				(position.left && position.top && position.scale) ? "opacity-100" : "opacity-0"
			)}
			onMouseDown={(event) => {
				if (event.target !== track.current) { return; }
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

				movePosition(-event.deltaX, -event.deltaY);
			}}
			onMouseUp={() => { setDragStarted(false); setMouseMoving(false); }}
			{...touchConfig.register()}
		>
			<div
				className={styles.CurriculumVitaeContainerTrack}
				style={{
					position: "absolute",
					left: position.left!,
					top: position.top!,
					transform: `translate(-50%, -50%) scale(${position.scale})`
				}}
			>
				<div
					ref={page}
					className={styles.CurriculumVitaePage}
				>
					<Sidebar/>
					<div className="flex flex-col w-2/3 relative" id="main">
						<div className="w-full mb-4">
							<h1 className="text-4xl tracking-tighter text-secondary font-bold dark:text-white">Fidel Pierre Elie</h1>
							<span className="text-lg text-primary">Developer</span>
							<div className="w-full flex flex-wrap mt-1.5">
								<Contacts />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
