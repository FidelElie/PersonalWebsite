import type { AppProps } from "next/app";

// import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./_app.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
export default MyApp;
