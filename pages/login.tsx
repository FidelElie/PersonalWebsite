import { useForm } from "react-hook-form";
import { AtSymbolIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { Button, Typography, Link } from "../components/core";
import Sidebar from "../components/theme/Sidebar";

const LoginPage = () =>  {
	const handleSubmit = (event: any) => {
		event.preventDefault();
	}

	return (
		<div className="p-5 flex flex-col justify-center items-center w-screen min-h-screen md:p-0">
			<Sidebar/>
			<div className="md:w-96">
				<div className="space-y-2.5 mb-5">
					<Typography as="h1" type="h3" className="tracking-tighter" weight="bold">
						Sign into your account
					</Typography>
					<Typography as="h2" type="subtitle" className="tracking-tighter">
						Or <Link href="/signup" alt>create a new account</Link>
					</Typography>
				</div>
				<form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
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
					</div>
					<Button type="submit" className="flex items-center justify-end">
						Continue
						<ChevronRightIcon className="text-light w-6 h-auto"/>
					</Button>
				</form>
			</div>
		</div>
	)
}

export default LoginPage;
