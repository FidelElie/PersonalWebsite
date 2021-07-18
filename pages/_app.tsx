import type { AppProps } from "next/app";

import "react-datepicker/dist/react-datepicker.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../styles/_app.css";

import LoaderProvider from "../lib/provider/loader";
import ToastProvider from "../lib/provider/toasts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoaderProvider>
      <ToastProvider/>
      <Component {...pageProps} />
    </LoaderProvider>
  )
}
export default MyApp;
