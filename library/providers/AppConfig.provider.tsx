import Head from "next/head";
import { ReactNode, createContext, useContext, useState } from "react";

// import Layout from "../../components/theme/Layout";
// import Navbar from "../../components/theme/Navbar";
// import Footer from "../../components/theme/Footer";

const AppConfigContext = createContext(null);

const AppConfigProvider = (props: LayoutProviderProps) => {
	const { baseTitle, children } = props;

	const [config, setConfig] = useState({
		baseTitle: "",
		title: "",
		subTitle: "",
		navbar: true,
		footer: true
	});

	return (
		// <Layout>
		// 	<Head>
		// 		<title>The Book of Elie</title>
		// 	</Head>
		// 	<Navbar />
		// 	{children}
		// 	<Footer />
		// </Layout>
		<AppConfigContext.Provider value={null}>
			<AppContainer/>
		</AppConfigContext.Provider>
	)
}

const AppContainer = () => {
	// const {
	// 	// Document Title Configs
	// 	baseTitle, title, subTitle
	// 	// Navbar
	// 	navbar,
	// 	// Footer
	// 	footer
	// } = useContext(AppConfigContext);

	return (
		<div>
			<Head>
				<title>
					{/* { title && title }
					{ (!title && baseTitle) && baseTitle }
					{ (!title && baseTitle && subTitle) && `${baseTitle} | ${subTitle}`} */}
				</title>
			</Head>
		</div>
	)
}

const useAppConfig = () => useContext(AppConfigContext);

interface LayoutProviderProps {
	baseTitle?: string,
	children: ReactNode
}

export default AppConfigProvider;
export { useAppConfig }
