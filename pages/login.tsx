import { useState } from "react";

import { clc } from "@/library/utilities";
import { useLoginUser } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import {
	TextField,
	Form,
	Icon,
	Button,
	Box,
	Heading,
	Show,
	Copy,
	Container
} from "@/components/core";

import { AuthLayout } from "@/components/interfaces";

const SUBMISSION_ERRORS = {
	"auth/user-not-found": false,
	"auth/wrong-password": false,
	"auth/invalid-email": false,
	generic: false
}

const LoginPage: ExtendedNextPage = () => {
	const loginUser = useLoginUser();
	const [fields, setFields] = useState({ email: "", password: "" });
	const [submissionErrors, setSubmissionErrors] = useState(SUBMISSION_ERRORS);

	const editFields = (data: Partial<typeof fields>) => setFields(fields => ({ ...fields, ...data }))

	const handleSubmission = async () => {
		try {
			setSubmissionErrors(SUBMISSION_ERRORS);
			await loginUser.mutateAsync(fields);
		} catch (error: any) {
			if (!error.code) { return console.error(error); }

			const key = error.code in submissionErrors ? error.code : "generic";

			setSubmissionErrors(currentErrors => ({ ...currentErrors, [key]: true }));
		}
	}

	return (
		<AuthLayout>
			<Container className="shadow mx-auto max-w-sm px-2 md:px-0">
				<Box className="bg-blue-500 rounded-t px-4 py-3 text-center">
					<Heading.One className="text-2xl font-light uppercase text-white">Login</Heading.One>
				</Box>
				{
					Object.values(submissionErrors).some(error => error === true) && (
						<Box className="px-3 py-2 bg-gray-400 text-sm">
							<Show if={submissionErrors["auth/wrong-password"]}>
								<Copy className="text-white">Wrong username / password provided</Copy>
							</Show>
							<Show
								if={submissionErrors["auth/user-not-found"] || submissionErrors["auth/invalid-email"]}
							>
								<Copy className="text-white">User Not Found</Copy>
							</Show>
							<Show if={submissionErrors.generic}>
								<Copy className="text-white">
									Oops something went wrong, please try again later
								</Copy>
							</Show>
						</Box>
					)
				}
				<Form
					className="bg-white rounded-b space-y-4 p-4 dark:bg-gray-700"
					onSubmit={handleSubmission}
				>
					<Box className="space-y-2">
						<TextField.Email
							id="email"
							label="Email"
							value={fields.email}
							placeholder="Email Address"
							onChange={value => editFields({ email: value })}
							required
						/>
						<TextField.Password
							id="password"
							label="Password"
							value={fields.password}
							placeholder="Password"
							onChange={value => editFields({ password: value })}
							required
						/>
						<Box className="text-right">
							<Copy className="text-xs whitespace-nowrap tracking-wide">
								Forgot Password? Contact An Administrator
							</Copy>
						</Box>
					</Box>
					<Button.Submit
						className="w-full flex items-center justify-between disabled:opacity-75"
						disabled={loginUser.isLoading || !fields.email || !fields.password}
					>
						Continue
						<Icon
							name={!loginUser.isLoading ? "arrow-right-s-line" : "loader-4-line"}
							className={clc("text-white text-2xl", loginUser.isLoading && "animate-spin")}
						/>
					</Button.Submit>
				</Form>
			</Container>
		</AuthLayout>
	)
}

LoginPage.auth = {
	redirectAuthenticated: (user) => {
		if (["admin", "editor"].includes(user.role)) { return "/dashboard"; }

		return "/";
	}
}
LoginPage.title = "Login";

export default LoginPage;
