import { ReactNode } from "react";

const Layout = (props: LayoutProps) => {
	const { children } = props;

	return (
		<div className = "flex flex-col justify-center w-screen min-h-screen">
			{ children }
		</div>
	)
}

interface LayoutProps {
	children: ReactNode
}

export default Layout;
