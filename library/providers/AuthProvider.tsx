import Router from "next/router";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { User } from "../types";

interface AuthContextInterface {
	user: User,
	initialising: boolean
}

type actionTypes = { type: "login", payload: User } | { type: "logout" } | { type: "invalidate" }

const initialState: AuthContextInterface = { user: null, initialising: true }

const AuthContext = createContext<AuthContextInterface>(null);

const reducer = (state: typeof initialState, action: actionTypes) => {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, initialising: false }
		case "logout":
			return { ...state, initialising: true }
		case "invalidate":
			return { ...state, initialising: false }
		default:
			throw new Error("Unsupported reducer action provided");
	}
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { refetch } = useQuery("user", async () => {
		try {
			const { data: response } = await axios.get("/api/auth/validate");

			if (!response.success) { throw new Error(response) }

			dispatch({ type: "login", payload: response.payload })
		} catch (error) {
			if (!error.response) {
				console.error(error);
			}
			dispatch({ type: "invalidate" });
		}
	});

	useEffect(() => {
		if (state.initialising) { refetch(); }
	}, [state.initialising, refetch]);

	return (
		<AuthContext.Provider value={{ ...state } as AuthContextInterface}>
			{ children }
		</AuthContext.Provider>
	)
}

export default AuthProvider;
