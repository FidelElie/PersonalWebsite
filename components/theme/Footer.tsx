import { Text, Flex } from "../core";

const Footer = () => {
	return (
		<Flex.Row
			as="footer"
			justify="center"
			align="center"
			className="absolute px-3 py-3 bottom-0"
		>
			<Text>
				Copyright &copy; Fidel Pierre Elie {new Date().getFullYear()}
			</Text>
		</Flex.Row>
	)
}
export default Footer;
