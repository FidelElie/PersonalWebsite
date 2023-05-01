import { Copy, Link } from "@/components/core";

import { ServiceLayout } from "@/components/interfaces";

const ServerErrorPage = () => {
	return (
		<ServiceLayout
			title="Something Went Wrong"
			heading="500: Something Went Wrong"
			description={(
				<Copy className="font-light">
					Apologies, something has gone wrong on our end. Click <Link href="/">here</Link> to go back home
				</Copy>
			)}
		/>
	)
}

export default ServerErrorPage;
