import { useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

import "./_app.css";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef((() => new QueryClient())());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp;
