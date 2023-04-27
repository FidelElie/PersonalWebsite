import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from "react";

const initialContext: DashboardContextType = { showSidebar: false, setShowSidebar: () => {} }
const DashboardContext = createContext(initialContext);

export const DashboardProvider = (props: DashboardProviderProps) => {
	const { children } = props;

	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<DashboardContext.Provider value={{ showSidebar, setShowSidebar }}>
			{ children }
		</DashboardContext.Provider>
	)
}

export const useDashboard = () => useContext(DashboardContext);

export type DashboardContextType = {
	showSidebar: boolean,
	setShowSidebar: Dispatch<SetStateAction<boolean>>
}

export interface DashboardProviderProps {
	children: ReactNode
}
