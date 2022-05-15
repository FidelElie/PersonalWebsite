import { createContext, useContext, ReactNode } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	return (
		<AuthContext.Provider value={null}>
			{ children }
		</AuthContext.Provider>
	)
}

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth }
