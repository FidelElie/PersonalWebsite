import { useEffect, useState } from "react";

export const useKeyboardEvent = <T extends readonly string[]>(keyStrokes: T) => {
	const [keys, setKeys] = useState<KeyStrokeMap<T>>(
		keyStrokes.map(key => ({ key, pressed: false }))
	);

	useEffect(() => {
		const editKeyPressed = (key: T[number], pressed: boolean) => {
			setKeys(
				currentKeyStates => currentKeyStates.map(
					keyState => keyState.key === key ? {...keyState, pressed } : keyState
				)
			);
		}

		keys.forEach(keyState => {
			window.addEventListener("keydown", () => { editKeyPressed(keyState.key, true); });
			window.addEventListener("keyup", () => { editKeyPressed(keyState.key, false); });
		});

		return () => {
			keys.forEach(keyState => {
				window.removeEventListener("keydown", () => { editKeyPressed(keyState.key, true); });
				window.removeEventListener("keyup", () => { editKeyPressed(keyState.key, false); });
			});
		}
	}, [keys]);

	return Object.fromEntries(
		keys.map(keyState => [keyState.key, keyState.pressed])
	) as { [key in T[number]]: boolean }
}

type KeyStrokeMap<T extends readonly string[]> = { key: T[number]; pressed: boolean }[];
