import "./_app.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getFirebaseClient } from "@/configs/firebase/client";

import { FirebaseProvider, ThemeProvider } from "@/library/providers";

function App({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient()).current;
  const firebaseClient = useRef(getFirebaseClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider client={firebaseClient}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </FirebaseProvider>
      <ReactQueryDevtools position="bottom-right"/>
    </QueryClientProvider>
  )
}

export default App;
