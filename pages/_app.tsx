import "./_app.css";

import { useRef } from "react";
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";

import { getFirebaseClient } from "@/configs/firebase/client";

import type { ExtendedAppProps } from "@/library/types";
import {
  FirebaseProvider,
  AuthProvider,
  ThemeProvider
} from "@/library/providers";

import { ComponentRouter } from "@/components/pages/ComponentRouter";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false
    }
  }
}

const App = (props: ExtendedAppProps) => {
  const queryClient = useRef(new QueryClient(queryClientConfig)).current;
  const firebaseClient = useRef(getFirebaseClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <FirebaseProvider client={firebaseClient}>
          <AuthProvider>
            <ThemeProvider>
              <ComponentRouter {...props}/>
              <Analytics/>
            </ThemeProvider>
          </AuthProvider>
        </FirebaseProvider>
        <ReactQueryDevtools
          position="bottom-right"
          panelProps={{ className: "no-print" }}
          toggleButtonProps={{ className: "no-print" }}
        />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App;
