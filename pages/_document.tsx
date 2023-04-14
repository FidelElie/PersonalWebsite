import Script from "next/script";
import { Html, Head, Main, NextScript } from "next/document";

import { THEME_STORAGE_KEY } from "@/library/providers";

const Document = () => (
	<Html>
		<Head>
			<Script
				id="theme-handler"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: [
						`const storageValue = JSON.parse(localStorage['${THEME_STORAGE_KEY}']);`,
						"const darkThemeSelected = storageValue === \"dark\";",
						"const systemIsDark = !storageValue && window.matchMedia('(prefers-color-scheme: dark)').matches;",
						`if (darkThemeSelected || systemIsDark) {`,
						`document.documentElement.classList.add("dark");`,
						`} else {`,
						`document.documentElement.classList.remove("dark");`,
						`}`
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
