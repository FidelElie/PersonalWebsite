import { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect = (props: RedirectProps) => {
	const { href } = props;
	const router = useRouter();

	useEffect(() => {
		router.replace(href);
	}, []);

	return null;
}

export interface RedirectProps {
	href: string
}

export default Redirect;
