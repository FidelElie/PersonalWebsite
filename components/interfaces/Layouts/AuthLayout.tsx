import { Page, PageConfiguredProps } from "@/components/core";
import { Navbar, Footer } from "../Navigation";

export const AuthLayout = (props: AuthLayoutProps) => {
	const { children, ...pageProps } = props;

	return (
		<Page
			className="min-h-screen"
			headerClassName="fixed top-0 w-full"
			mainClassName="h-screen flex items-center"
			header={<Navbar/>}
			footer={<Footer/>}
			{...pageProps}
		>
			{ children }
		</Page>
	)
}

export interface AuthLayoutProps extends PageConfiguredProps {}
