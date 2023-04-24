import { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { clc } from "@/library/utilities";
import { useLoginUser } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { TextField, Form, Icon, Button } from "@/components/core";
import { AuthLayout } from "@/components/interfaces";

const SUBMISSION_ERRORS = {
	"auth/user-not-found": false,
	"auth/wrong-password": false,
	"auth/invalid-email": false,
	generic: false
}

const LoginPage: ExtendedNextPage = () => {
	const queryClient = useQueryClient();
	const loginUser = useLoginUser({ onSuccess: () => queryClient.invalidateQueries(["user"]) });
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
		<AuthLayout title="Login | Fi Dev">
			<div className="container rounded shadow mx-auto max-w-sm px-2 md:px-0">
				<div className="bg-blue-500 rounded-t px-4 py-3 text-center">
					<h1 className="text-white text-2xl font-light tracking-tight uppercase">Login</h1>
				</div>
				{
					Object.values(submissionErrors).some(error => error === true) && (
						<div className="px-3 py-2 bg-gray-400 text-white font-light text-sm dark:">
							{
								submissionErrors["auth/wrong-password"] && (
									<span>Wrong username / password provided</span>
								)
							}
							{
								submissionErrors["auth/user-not-found"] || submissionErrors["auth/invalid-email"] && (
									<span>User not found</span>
								)
							}
							{
								submissionErrors.generic && (
									<span>Oops something went wrong, please try again later</span>
								)
							}
						</div>
					)
				}
				<Form
					className="bg-white rounded-b space-y-4 p-4 dark:bg-gray-700"
					onSubmit={handleSubmission}
				>
					<div className="space-y-2">
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
						<div className="flex justify-end">
							<Link
								href="/recovery"
								className="text-tertiary text-xs whitespace-nowrap font-light tracking-wide dark:text-gray-50"
							>
								Forgot Password?
							</Link>
						</div>
					</div>
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
			</div>
		</AuthLayout>
	)
}

LoginPage.auth = {
	redirectAuthenticated: (user) => {
		if (["admin", "editor"].includes(user.role)) { return "/dashboard"; }

		return "/";
	}
}

export default LoginPage;
