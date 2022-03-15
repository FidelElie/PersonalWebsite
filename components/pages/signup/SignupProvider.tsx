import { useState, createContext, ReactNode, useContext } from "react";

const SignupContext = createContext(null);

const SignupProvider = ({ children }: { children: ReactNode }) => {
	return (
		<SignupContext.Provider value={null}>
			{ children }
		</SignupContext.Provider>
	)
}

const useSignupProvider = () => useContext(SignupContext);

export default SignupProvider;
export { useSignupProvider }
