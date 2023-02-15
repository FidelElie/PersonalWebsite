import { Box } from "@/components/core";
import { joinClasses } from "@/library/utilities";

export const Footer = (props: FooterProps) => {
	const { className } = props;

	return (
		<Box className={joinClasses(className)}>

		</Box>
	)
}

export interface FooterProps {
	className?: string,
}