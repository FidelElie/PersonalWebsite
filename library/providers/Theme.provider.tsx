import { createContext, ReactNode, useContext, useEffect } from "react";

import { useLocalStorage } from "../hooks";

export const THEME_STORAGE_KEY = "FI_DEV_THEME";

export const DARK_CLASS = "dark";

const SUPPORTED_THEMES = ["light", "dark", null] as const;

const initialContext: ThemeContextType = { theme: null, setTheme: () => {} }

const ThemeContext = createContext(initialContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<Themes>(THEME_STORAGE_KEY, initialContext.theme);

  useEffect(() => {
    const darkThemeSelected = theme === "dark";
    const useDarkFromSystem = !theme && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkThemeSelected || useDarkFromSystem) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);

type Themes = typeof SUPPORTED_THEMES[number];

type ThemeContextType = { theme: Themes, setTheme: (value: Themes) => void }

export interface ThemeProviderProps { children: ReactNode }
