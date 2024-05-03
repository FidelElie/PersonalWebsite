import { useRef } from "react";
import type { AppProps } from "next/app";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/assets/globals.css";

import { Footer, Navbar } from "@/components/interfaces";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Navbar/>
        <main className="flex flex-col flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer/>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right"/>
    </QueryClientProvider>
  );
}
