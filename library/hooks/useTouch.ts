import { TouchEventHandler, useState, TouchEvent } from "react"

export const useTouch = <T = Element>(config: UseTouch<T>): UseTouchReturn<T> => {
	const { onTouchStart, onTouchMove, onTouchEnd } = config;
	const { dragValue, setDragValue, movingValue, setMovingValue  } = config.state || {};

	const [movingInternal, setMovingInternal] = useState(false);
	const [draggingInternal, setDraggingInternal] = useState(false);
	const [touchPositions, setTouchPositions] = useState<{ x: number, y: number }[]>([]);

	const dragging = dragValue ? dragValue : draggingInternal;
	const moving = movingValue ? movingValue: movingInternal;
	const setDragging = setDragValue ? setDragValue : setDraggingInternal;
	const setMoving = setMovingValue ? setMovingValue : setMovingInternal;

	const updateTouchPoints = (event: TouchEvent<T>) => {
		requestAnimationFrame(() => setTouchPositions(Array.from(
			event.targetTouches,
			(touch) => ({ x: touch.clientX, y: touch.clientY }))
		));
	}

	const mergeEventDeltas = (event: TouchEvent<T>) => {
		const finger = touchPositions.length ? touchPositions[0] : null;
		const movedFinger = event.changedTouches.length ? event.changedTouches[0] : null;

		if (!finger || !movedFinger) { return null; }

		const deltas = {
			deltaX: movedFinger.clientX - finger.x,
			deltaY: movedFinger.clientY - finger.y
		}

		return { ...event, ...deltas }
	}

	return {
		dragging,
		moving,
		setDragging,
		setMoving,
		register: () => ({
			onTouchStart: (event) => {
				setDragging(true);
				updateTouchPoints(event);

				const eventMergedWithDeltas = mergeEventDeltas(event);

				if (!eventMergedWithDeltas) { return; }

				if (onTouchStart) { onTouchStart(eventMergedWithDeltas); }
			},
			onTouchMove: (event) => {
				if (dragging) {
					setMoving(true);

					const eventMergedWithDeltas = mergeEventDeltas(event);

					if (!eventMergedWithDeltas) { return; }

					updateTouchPoints(event);

					if (onTouchMove) { onTouchMove(eventMergedWithDeltas); }
				}
			},
			onTouchEnd: (event) => {
				setDragging(true);
				setMoving(false);

				const eventMergedWithDeltas = mergeEventDeltas(event);

				if (!eventMergedWithDeltas) { return; }

				setTouchPositions([]);

				if (onTouchEnd) { onTouchEnd(eventMergedWithDeltas); }
			}
		})
	}

}

type TouchDelta = { deltaX: number; deltaY: number }
type TouchDeltaEvent<T> = TouchEvent<T> & TouchDelta;

type UseTouch<T> = {
	onTouchStart?: (event: TouchDeltaEvent<T>) => void;
	onTouchMove?: (event: TouchDeltaEvent<T>) => void;
	onTouchEnd?: (event: TouchDeltaEvent<T>) => void;
	state?: {
		dragValue: boolean;
		setDragValue: (bool: boolean) => void;
		movingValue: boolean;
		setMovingValue: (bool: boolean) => void
	}
}

type UseTouchReturn<T> = {
	dragging: boolean,
	moving: boolean,
	setDragging: (bool: boolean) => void,
	setMoving: (bool: boolean) => void,
	register: () => {
		onTouchStart: TouchEventHandler<T>,
		onTouchMove: TouchEventHandler<T>,
		onTouchEnd: TouchEventHandler<T>
	}
}
