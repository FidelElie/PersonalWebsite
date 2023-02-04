import Link from "next/link";
import { FormEventHandler } from "react";

import {
	useContinueWithMagicLink,
	useContinueWithPassword,
	useContinueWithSocialProvider
} from "@/library/functions/auth";
import { useForm } from "@/library/hooks";
import { joinClasses } from "@/library/utilities";
import { NextPage } from "@/library/types/next.types";

const AuthPage: NextPage = () => {
	const { fields, register } = useForm({ fields: { email: "", password: "" } });

	const continueWithMagicLink = useContinueWithMagicLink();
	const continueWithPassword = useContinueWithPassword();
	const continueWithSpotify = useContinueWithSocialProvider("spotify");
	const continueWithGithub = useContinueWithSocialProvider("github");

	const handleSubmission: FormEventHandler  = async (event) => {
		event.preventDefault();

		try {
			const mutation = !fields.password ? continueWithMagicLink : continueWithPassword;

			await mutation.mutateAsync(fields);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="h-screen flex items-center">
			<div className="container px-5 max-w-sm mx-auto md:px-0 z-20">
				<Link href="/" className="text-cyan-600 inline-flex items-center mb-2">
					<i className="ri-home-3-fill mr-1 text-lg"/>
					<span className="text-sm base:text-base">Back To Home</span>
				</Link>
				<div className="flex space-x-2 mb-2">
					<SocialButton onClick={continueWithSpotify.mutate} icon="spotify" />
					<SocialButton onClick={continueWithGithub.mutate} icon="github" />
				</div>
				<form onSubmit={handleSubmission}>
					<div className="flex items-center bg-white overflow-hidden rounded-t">
						<label htmlFor="email" className="sr-only">
							Email Address
						</label>
						<input
							{...register("email")}
							type="email"
							placeholder="Email Address"
							className={joinClasses(
								"w-full bg-transparent py-2 px-3 text-gray-900 border-0",
								"text-sm font-light bg-white md:text-base",
								"placeholder:text-gray-400 focus:outline-cyan-500 focus:outline-offset-0"
							)}
						/>
					</div>
					<div className="flex items-center bg-white overflow-hidden">
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							{...register("password")}
							type="password"
							placeholder="Password"
							className={joinClasses(
								"w-full bg-transparent py-2 px-3 text-gray-900 border-0",
								"text-sm font-light bg-white md:text-base",
								"placeholder:text-gray-400 focus:outline-cyan-500 focus:outline-offset-0"
							)}
						/>
					</div>
					<button
						className="flex items-center text-white bg-cyan-600 font-light px-3 py-1.5 w-full mb-2 rounded-b justify-center disabled:opacity-75 md:py-2"
						disabled={!fields.email}
					>
						{
							!fields.password ? (
								<>
									<span className="text-sm md:text-base">Continue with Email</span>
									<i className="ri-mail-send-fill text-white ml-2 text-lg" />
								</>
							) : (
								<>
									<span className="text-sm md:text-base">Continue with Password</span>
									<i className="ri-lock-fill text-white ml-2 text-lg" />
								</>
							)
						}
					</button>
				</form>
			</div>
		</main>
	)
}

const SocialButton = ({ onClick, icon }: { onClick: () => void, icon: string }) => {
	return (
		<button className="flex-grow bg-white rounded py-0.5" onClick={onClick}>
			<i className={`ri-${icon}-fill text-2xl text-cyan-500 md:text-3xl`} />
		</button>
	)
}

AuthPage.auth = {
	redirectOnSession: true
}

export default AuthPage;
