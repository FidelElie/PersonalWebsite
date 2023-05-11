import { createContext, useContext, type ReactNode, type ReactElement } from "react";

import { AppConfig } from "@/configs/app.config";

import { useLocalStorage } from "@/library/hooks";

const initialContext: DashboardContextType = { showSidebar: false, setShowSidebar: () => {} }
const DashboardContext = createContext(initialContext);

const SIDEBAR_STORAGE_KEY = `${AppConfig.localStoragePrefix}_DASHBOARD_STATE`;

export const DashboardProvider = (props: DashboardProviderProps) => {
	const { children } = props;

	const [showSidebar, setShowSidebar] = useLocalStorage<boolean>(SIDEBAR_STORAGE_KEY, false);

	console.log(showSidebar);

	return (
		<DashboardContext.Provider value={{ showSidebar, setShowSidebar }}>
			{ children }
		</DashboardContext.Provider>
	)
}

export const useDashboard = () => useContext(DashboardContext);

export const getDashboardProvider = (page: ReactElement) => (
	<DashboardProvider>{page}</DashboardProvider>
)

export type DashboardContextType = {
	showSidebar: boolean,
	setShowSidebar: (value: boolean) => void
}

export interface DashboardProviderProps {
	children: ReactNode
}
