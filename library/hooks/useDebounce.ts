import { useEffect, useState, useRef } from "react";

const useDebounce = <T>(value: T, delay = 1000): readonly [T, boolean] => {
	const initialised = useRef(false);
	const	timeout = useRef<NodeJS.Timeout | null>(null);
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	const [debouncing, setDebouncing] = useState(false);

	useEffect(() => {
		setDebouncing(initialised.current);

		timeout.current = setTimeout(() => {
			setDebouncedValue(value);
			setDebouncing(false);
			if (!initialised.current) { initialised.current = true; }
		}, delay);

		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
				timeout.current = null;
			}
			setDebouncing(false);
		}
	}, [value, delay]);

	return [debouncedValue, debouncing] as const;
}

export default useDebounce;
