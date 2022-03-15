import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
	AtSymbolIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	InboxIcon,
	InformationCircleIcon,
	ServerIcon,
	ShieldCheckIcon,
	UserCircleIcon
} from "@heroicons/react/solid";

import { Button, TextField, Typography, Checkbox } from "../../../core";

type CredentialsInputs = {
	strategy: string,
	password: string,
	repeatPassword: string
}

const CredentialsStage = (props: CredentialsStageProps) => {
	const { editField, setStage } = props;
	const [usePassword, setUsePassword] = useState(false);
	const { register, handleSubmit } = useForm<CredentialsInputs>();

	const onSubmit: SubmitHandler<CredentialsInputs> = (data) => {
		editField(data);
		setStage("credentials");
	}

	return (
		<form
			className="w-full flex flex-col space-y-8"
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-3">
				<Checkbox label="1. Sign in using your email (recommended)" />
				<Checkbox
					label="2. Sign in using a password"
					checked={usePassword}
					onChange={() => setUsePassword(!usePassword)}
				/>
				<AnimatePresence initial={false}>
					{
						usePassword && (
							<motion.div
								className="space-y-3"
								key="content"
								initial="collapsed"
								animate="open"
								exit="collapsed"
								variants={{
									open: { opacity: 1, height: "auto" },
									collapsed: { opacity: 0, height: 0 }
								}}
								transition={{ duration: 0.4 }}
							>
								<div className="flex items-center space-x-2">
									<InformationCircleIcon className="w-6 h-auto text-cyan-600"/>
									<Typography type="caption" className="underline underline-offset-2 decoration-2  decoration-cyan-600 shadow">You will have to verify your email before being able to post comments.</Typography>
								</div>
								<TextField
									label="Password"
									// icon={UserCircleIcon}
									icon={ShieldCheckIcon}
									{...register("password", { required: true })}
									/>
								<TextField
									label="Repeat Password"
									icon={ShieldCheckIcon}
									// icon={AtSymbolIcon}
									{...register("repeatPassword", { required: true })}
								/>
							</motion.div>
						)
					}
				</AnimatePresence>
			</div>
			<div className="flex items-center space-x-2">
				<Button theme="secondary" className="flex items-center justify-end" onClick={() => setStage("identification")}>
					<ChevronLeftIcon className="text-light w-6 h-auto"/>
					Back
				</Button>
				<Button type="submit" className="flex items-center justify-end grow">
					Create Account
					<ServerIcon className="ml-2 text-light w-6 h-auto" />
				</Button>
			</div>
		</form>
	)
}

interface CredentialsStageProps {
	editField: Function,
	setStage: Function
}

export default CredentialsStage;
