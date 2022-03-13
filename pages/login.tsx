import { useForm } from "react-hook-form";
import { AtSymbolIcon, ChevronRightIcon, LightningBoltIcon } from "@heroicons/react/solid";

import { Button, Typography } from "../components/core";

const LoginPage = () =>  {

	const handleSubmit = (event: any) => {
		event.preventDefault();
	}

	return (
		<div className="p-5 flex flex-col justify-center items-center w-screen min-h-screen md:p-0">
			<div className="fixed px-3 py-3 top-0 flex space-x-4 items-center w-full">
				<LightningBoltIcon className="w-9 h-9 text-light cursor-pointer transition-colors hover:fill-tertiary" />
				{/* Becomes link component styles */}
				<Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
					Home
				</Typography>
				<Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
					Music
				</Typography>
				<Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
					Blog
				</Typography>
				<Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
					Resume
				</Typography>
			</div>
			<form className="md:w-96 flex flex-col space-y-8" onSubmit={handleSubmit}>
				<div className="space-y-2.5">
					<Typography as="h1" type="h3" className="tracking-tighter" weight="bold">
						Sign into your account
					</Typography>
					<Typography as="h2" type="subtitle" className="tracking-tighter">
						Or <Typography as="span" decorate="underline" weight="bold" color="link" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">create your new account.</Typography>
					</Typography>
				</div>
				<div className="space-y-3">
					<div>
						<label className="sr-only">Email address</label>
						<div className="flex bg-white rounded-md items-center">
							<div className="px-2">
								<AtSymbolIcon className="text-tertiary w-6 h-auto"/>
							</div>
							<input
								className="w-full py-2.5 px-2 focus:outline-primary shadow-lg rounded-r-md"
								type="text"
								placeholder="Email address"
							/>
						</div>
					</div>
					{/* <div className="space-y-1">
						<label className="text-light">Password</label>
						<input
							className="w-full py-2.5 px-2 rounded-md focus:outline-primary shadow-lg"
							type="password"
						/>
					</div> */}
				</div>
				<Button type="submit" className="flex items-center justify-end">
					Continue
					<ChevronRightIcon className="text-light w-6 h-auto"/>
				</Button>
			</form>
		</div>
	)
}

export default LoginPage;
