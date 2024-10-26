import type { AppProps } from "next/app";

import "@/assets/globals.css";

import { Footer, Navbar } from "@/components/interfaces";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
