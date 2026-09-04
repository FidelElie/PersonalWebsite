import { RefObject, useEffect } from "react"

export function useEventHandler <EventType extends keyof WindowEventMap>(
	target: "window",
	type: EventType,
	callback: (event: WindowEventMap[EventType]) => void
) : void;
export function useEventHandler <EventType extends keyof DocumentEventMap>(
	target: "document",
	type: EventType,
	callback: (event: DocumentEventMap[EventType]) => void
) : void;
export function useEventHandler <EventType extends keyof HTMLElementEventMap, T extends HTMLElement>(
	target: RefObject<T>,
	type: EventType,
	callback: (event: HTMLElementEventMap[EventType]) => void
) : void
export function useEventHandler<EventType extends keyof WindowEventMap, T extends HTMLElement>(
	target: "window" | "document" | RefObject<T>,
	type: EventType,
	callback: (event: WindowEventMap[EventType]) => void
) {
	useEffect(() => {
		const determineTarget = () => {
			if (target === "window") {
				return window;
			} else if (target === "document") {
				return document;
			} else {
				return target.current!;
			}
		}

		// FIXME cheating
		determineTarget().addEventListener(type, callback as any);

		return () => {
			determineTarget().removeEventListener(type, callback as any);
		}
	}, [callback, target, type]);
}
