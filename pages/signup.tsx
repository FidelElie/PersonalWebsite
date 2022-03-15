import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Link, Typography } from "../components/core";

import Sidebar from "../components/theme/Sidebar";

import SignupForm from "../components/pages/signup/SignupForm";
import SignupProvider from "../components/pages/signup/SignupProvider";

const SignupPage = () => {
	return (
		<SignupProvider>
			<div className="p-5 flex flex-col justify-center items-center w-screen min-h-screen md:p-0">
				<Sidebar/>
				<div className="container max-w-md">
					<SignupForm/>
				</div>
			</div>
		</SignupProvider>
	)
}

export default SignupPage;
