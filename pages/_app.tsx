import "./_app.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getFirebaseClient } from "@/configs/firebase/client";

import type { ExtendedAppProps } from "@/library/types";
import { FirebaseProvider, AuthProvider, ThemeProvider } from "@/library/providers";

import { ComponentRouter } from "@/components/pages/ComponentRouter";

const App = (props: ExtendedAppProps) => {
  const queryClient = useRef(new QueryClient()).current;
  const firebaseClient = useRef(getFirebaseClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider client={firebaseClient}>
        <AuthProvider>
          <ThemeProvider>
            <ComponentRouter {...props}/>
          </ThemeProvider>
        </AuthProvider>
      </FirebaseProvider>
      <ReactQueryDevtools position="bottom-right"/>
    </QueryClientProvider>
  )
}



export default App;
