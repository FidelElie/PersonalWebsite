import type { AppProps } from "next/app";
import { Inter } from '@next/font/google'

import "./_app.css";

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
			<Component {...pageProps}/>
		</>
	)
}

export default App;
