import { createContext, useContext, type ReactNode } from "react";

import { useLocalStorage } from "../hooks";

const initialContext: DashboardContextType = { showSidebar: false, setShowSidebar: () => {} }
const DashboardContext = createContext(initialContext);

const SIDEBAR_STORAGE_KEY = "FI_DEV_DASHBOARD_STATE";

export const DashboardProvider = (props: DashboardProviderProps) => {
	const { children } = props;

	const [showSidebar, setShowSidebar] = useLocalStorage<boolean>(SIDEBAR_STORAGE_KEY, false);

	return (
		<DashboardContext.Provider value={{ showSidebar, setShowSidebar }}>
			{ children }
		</DashboardContext.Provider>
	)
}

export const useDashboard = () => useContext(DashboardContext);

export type DashboardContextType = {
	showSidebar: boolean,
	setShowSidebar: (value: boolean) => void
}

export interface DashboardProviderProps {
	children: ReactNode
}
