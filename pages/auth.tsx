import { useState } from "react";

import {
	useContinueWithMagicLink,
	useContinueWithPassword,
	useContinueWithSocialProvider
} from "@/library/api/client";
import { useForm } from "@/library/hooks";
import type { NextPage } from "@/library/types/next.types";
import { joinClasses } from "@/library/utilities";

import {
	Button,
	Icon,
	Form,
	TextField,
	Flex,
	Show,
	Container,
	Link,
	Text,
	Page,
	Backdrop,
	type IconNames
} from "@/components/core";

import { Footer, Rocket } from "@/components/interfaces";

const AuthPage: NextPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { fields, register } = useForm({ email: "", password: "" });

	const continueWithMagicLink = useContinueWithMagicLink();
	const continueWithPassword = useContinueWithPassword();
	const continueWithSpotify = useContinueWithSocialProvider("spotify");
	const continueWithGithub = useContinueWithSocialProvider("github");

	const isSubmitting = [
		continueWithMagicLink, continueWithPassword, continueWithSpotify, continueWithGithub
	]
	.some(mutation => mutation.isLoading)

	const handleSubmission = async () => {
		try {
			const mutation = !fields.password ? continueWithMagicLink : continueWithPassword;

			await mutation.mutateAsync(fields);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Page
			title="Auth"
			mainClassName="flex items-center min-h-screen"
			footer={<Footer hideLogin/>}
		>
			<Container className="px-5 max-w-sm mx-auto md:px-0 space-y-2">
				<Rocket className="text-6xl -ml-2 md:text-7xl"/>
				<Link href="/" className="inline-flex items-center" neutral>
					<Text.Inline className="text-xs base:text-base">Back To Home</Text.Inline>
				</Link>
				<Flex className="space-x-2">
					<SocialButton onClick={continueWithSpotify.mutate} icon="spotify" />
					<SocialButton onClick={continueWithGithub.mutate} icon="github" />
				</Flex>
				<Form onSubmit={handleSubmission} className="flex flex-col">
					<TextField.Email label="Email Address" {...register("email")} connect="bottom"/>
					<TextField
						{...register("password")}
						label="Password"
						right={fields.password && (
							<Button
								className={joinClasses(
									"bg-transparent px-2 transition-all hover:text-primary-light",
									!showPassword ? "text-gray-lighter opacity-50" : "text-primary opacity-100"

								)}
								onClick={() => setShowPassword(currentState => !currentState)}
							>
								<Icon name="eye" type="line" className="text-xl"/>
							</Button>
						)}
						type={showPassword ? "text" : "password"}
						connect
					/>
					<Button.Submit theme="Primary" className="py-2" disabled={!fields.email} connect="top">
						<Show
							when={!fields.password}
							else={<ButtonContent text="Continue with Password" icon="lock"/>}
						>
							<ButtonContent text="Continue with Email" icon="mail-send"/>
						</Show>
					</Button.Submit>
				</Form>
			</Container>
			<Backdrop isOpen={isSubmitting}/>
		</Page>
	)
}

const SocialButton = ({ onClick, icon }: { onClick: () => void, icon: IconNames }) => (
	<Button theme="Primary" onClick={onClick} className="rounded py-2" alternate>
		<Icon name={icon} className="text-primary text-2xl md:text-3xl"/>
	</Button>
)

const ButtonContent = ({ text, icon }: { text: string, icon: IconNames }) => (
	<>
		<Text.Inline className="text-sm md:text-base">{text}</Text.Inline>
		<Icon name={icon} className="fill-white ml-2 text-lg" />
	</>
)

AuthPage.auth = {
	redirectWithSession: true
}

export default AuthPage;
