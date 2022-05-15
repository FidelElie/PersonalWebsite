import { useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

import { config as FontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./_app.css";

FontAwesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef((() => new QueryClient())());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp;
