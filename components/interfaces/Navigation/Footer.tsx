import AppConfig from "@/environment/app.config";

import { joinClasses } from "@/library/utilities";

import { Box, Container, Flex, Text, Icon, Link, Show, type IconProps } from "@/components/core";
import { Rocket } from "../Assets/Rocket";
import { useSupabaseContext } from "@/library/providers";

export const Footer = (props: FooterProps) => {
	const { className, hideLogin } = props;

	const { user } = useSupabaseContext();

	return (
		<Flex
			as="footer"
			className={joinClasses(
				"flex-col bg-gray py-3",
				className
			)}
		>
			<Container as="nav" className="max-w-4xl mx-auto flex flex-col space-y-2.5 px-5 md:px-0">
				<Flex className="justify-between items-center">
					<Flex className="items-center">
						<Link href='/'>
							<Rocket className="text-4xl mr-1 -ml-2"/>
						</Link>
						<Box className="space-x-3 flex-grow text-sm items-center font-extralight md:text-base">
							<Link href='/music'>Music</Link>
							<Link href='/posts'>Posts</Link>
							<Link href='/about'>About</Link>
						</Box>
					</Flex>
					<Show when={!hideLogin && !user}>
						<Link.Button href="/auth" theme="Primary" className="py-1 h-min">Login</Link.Button>
					</Show>
					<Show when={user}>
						<Link.Button href="/dashboard" theme="Primary" className="py-1 h-min">
							<Icon name="dashboard" color="white" className="mr-1"/>
							Dash
						</Link.Button>
					</Show>
				</Flex>
				<Flex className="rounded justify-between items-center md:flex-row">
					<Text className="text-gray-lightest text-xs font-extralight md:text-sm">
						Copyright &copy; Fidel Elie {(new Date()).getFullYear()}
					</Text>
					<Box className="space-x-3 mb-2 md:mb-0 md:space-x-4">
						<SocialLink href={AppConfig.socials.Github} icon="github"/>
						<SocialLink href={AppConfig.socials.Instagram} icon="instagram"/>
						<SocialLink href={AppConfig.socials.Linkedin} icon="linkedin-box"/>
					</Box>
				</Flex>
			</Container>
		</Flex>
	)
}

const SocialLink = ({ icon, href, type = "fill" }: SocialLinkProps) => (
	<Link href={href}>
		<Icon
			name={icon as any}
			type={type}
			className="text-white text-2xl inline transition-all md:text-3xl hover:text-primary"
		/>
	</Link>
)

interface SocialLinkProps {
	icon: IconProps["name"],
	href: string,
	type?: IconProps["type"]
}

export interface FooterProps {
	className?: string,
	hideLogin?: boolean
}
