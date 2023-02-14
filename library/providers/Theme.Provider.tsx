import { createContext, useContext, useEffect, type ReactNode } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const THEME_STORAGE_KEY = "FI_THEME";
const DARK_CLASS = "dark";
const OS_PREFERENCE_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = createContext<ThemeContextType>({ theme: null, setTheme: () => {} });

export const ThemeProvider = (props: ThemeProviderProps) => {
	const { children } = props;

	const [theme, setTheme] = useLocalStorage<ThemeStateType>(THEME_STORAGE_KEY, null);

	useEffect(() => {
		if (theme !== null) {
			document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
		} else {
			document.documentElement.classList.toggle(
				DARK_CLASS, window.matchMedia(OS_PREFERENCE_QUERY).matches
			);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{ children }
		</ThemeContext.Provider>
	)
}

export const useThemeContext = () => {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error("useThemContext must be used within a ThemeProvider");
	}

	return themeContext;
}

type ThemeStateType = "light" | "dark" | null;

type ThemeContextType = {
	theme: ThemeStateType,
	setTheme: (theme: ThemeStateType) => void
}


export interface ThemeProviderProps {
	children: ReactNode
}
