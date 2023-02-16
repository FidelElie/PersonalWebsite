import {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
	type ComponentProps,
	type ReactNode
} from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, Hydrate, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryContext = createContext<QueryContextType>({ configureDevtools: () => {} });

export const QueryProvider = (props: QueryProviderProps) => {
	const { client, dehydratedState, initialPosition, initialPanelPosition, children } = props;

	const router = useRouter();

	const path = useRef(router.asPath);
	const position = useRef(initialPosition || "bottom-right").current;
	const panelPosition = useRef(initialPanelPosition || "bottom").current;

	const [state, setState] = useState<QueryProviderStateType>({ position, panelPosition });

	const configureDevtools = useCallback((config: Partial<typeof state> = {}) => {
		setState(currentState => ({ ...currentState, ...config }));
	}, []);

	useEffect(() => {
		if (router.asPath !== path.current) {
			configureDevtools({ position, panelPosition });
			path.current = router.asPath;
		}
	}, [router.asPath, configureDevtools]);

	return (
		<QueryClientProvider client={client}>
			<QueryContext.Provider value={{ configureDevtools }}>
				<Hydrate state={dehydratedState}>
					{ children }
					<ReactQueryDevtools initialIsOpen={false} {...state}/>
				</Hydrate>
			</QueryContext.Provider>
		</QueryClientProvider>
	)
}

export const useQueryContext = () => {
	const context = useContext(QueryContext);

	if (!context) { throw new Error("useQueryContext hook must be used within QueryProvider"); }

	return context;
}

type ReactQueryDevtoolsProps = ComponentProps<typeof ReactQueryDevtools>;

type DevtoolsPositions = ReactQueryDevtoolsProps["position"];
type DevtoolsPanelPositions = ReactQueryDevtoolsProps["panelPosition"];


type QueryProviderStateType = { position: DevtoolsPositions, panelPosition: DevtoolsPanelPositions }

type QueryContextType = { configureDevtools: (config: Partial<QueryProviderStateType>) => void }

export interface QueryProviderProps {
	client: QueryClient,
	dehydratedState?: unknown,
	initialPosition?: DevtoolsPositions,
	initialPanelPosition?: DevtoolsPanelPositions
	children: ReactNode
}
