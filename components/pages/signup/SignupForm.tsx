import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import IdentificationStage from "./_SignupForm/IdentificationStage";
import CredentialsStage from "./_SignupForm/CredentialsStage";

import { Typography, Link } from "../../core";

const STAGES = [
	{ key: "identification", Component: IdentificationStage },
	{ key: "credentials", Component: CredentialsStage }
]

type StagesType = "identification" | "credentials" | "confirmation";

const SignupForm = () => {
	const [stage, setStage] = useState<StagesType>("identification");
	const [data, setData] = useState({
		username: "",
		email: "",
		password: ""
	});

	const editField = (dataToMerge: object) => setData(data => ({ ...data, ...dataToMerge }));

	return (
		<motion.div
			// className="md:w-[26rem]"
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { scale: 0, opacity: 0 },
				visible: { scale: 1, opacity: 1 }
			}}
			transition={{ duration: 1 }}
		>
			<div className="space-y-2.5 mb-5">
				<Typography as="h1" type="h3" className="tracking-tighter" weight="bold">
					Create a new account
				</Typography>
				<Typography as="h2" type="subtitle" className="tracking-tighter">
					Or <Link href="/login" alt>sign into a existing account</Link>
				</Typography>
			</div>
			<AnimatePresence initial={false} exitBeforeEnter>
				{
					STAGES.map(stageData => stageData.key === stage && (
						<motion.div
							key={stageData.key}
							initial={{ opacity: 0, x: -200 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 200 }}
						>
							<stageData.Component
								editField={editField}
								setStage={setStage}
							/>
						</motion.div>
					))
				}
			</AnimatePresence>
		</motion.div>
	)
}

export default SignupForm;

