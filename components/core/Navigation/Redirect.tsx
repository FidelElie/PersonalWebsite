import { useEffect } from "react";
import { useRouter } from "next/router";

export const Redirect = (props: RedirectProps) => {
	const { to } = props;

	const router = useRouter();

	useEffect(() => {
		router.push(to);
	}, [to, router]);

	return null;
}

export interface RedirectProps {
	to: string
}
