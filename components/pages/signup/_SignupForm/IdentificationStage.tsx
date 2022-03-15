import { useForm, SubmitHandler } from "react-hook-form";
import {
	AtSymbolIcon,
	ChevronRightIcon,
	UserCircleIcon
} from "@heroicons/react/solid";

import { Button, TextField } from "../../../core";

type IdentificationInputs  = {
	username: string,
	email: string
}

const IdentificationStage = (props: IdentificationStageProps) => {
	const { editField, setStage } = props;
	const { register, handleSubmit } = useForm<IdentificationInputs>();

	const onSubmit: SubmitHandler<IdentificationInputs> = (data) => {
		editField(data);
		setStage("credentials");
	}

	return (
		<form className="w-full flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
			<div className="space-y-3">
				<TextField
					label="Username"
					placeholder="Username"
					icon={UserCircleIcon}
					{...register("username", { required: true })}
				/>
				<TextField
					email
					label="Email"
					placeholder="Email"
					icon={AtSymbolIcon}
					{...register("email", { required: true })}
				/>
			</div>
			<Button type="submit" className="flex items-center justify-end">
				Continue
				<ChevronRightIcon className="text-light w-6 h-auto" />
			</Button>
		</form>
	)
}

interface IdentificationStageProps {
	editField: Function,
	setStage: Function
}

export default IdentificationStage;
