import Script from "next/script";
import { Html, Head, Main, NextScript } from "next/document";

import { THEME_STORAGE_KEY } from "@/library/providers/Theme.Provider";

const Document = () => (
	<Html>
		<Head>
			<Script
				id="theme-handler"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: [
						`const useSetDarkTheme = localStorage[\"${THEME_STORAGE_KEY}\"] === 'dark';`,
						"const osIsDark = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;",
						"if (useSetDarkTheme || osIsDark) {",
						"document.documentElement.classList.add(\"dark\");",
						"} else {",
						"document.documentElement.classList.remove(\"dark\");",
						"}"
					].join("")
				}}
			/>
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
)

export default Document;
