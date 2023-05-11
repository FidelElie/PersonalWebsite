import type { ExtendedNextPage } from "@/library/types";

import { Copy, Link } from "@/components/core";

import { ServiceLayout } from "@/components/interfaces";

const ServerErrorPage: ExtendedNextPage = () => {
	return (
		<ServiceLayout
			heading="500: Something Went Wrong"
			description={(
				<Copy className="font-light">
					Apologies, something has gone wrong on our end. Click <Link href="/">here</Link> to go back home
				</Copy>
			)}
		/>
	)
}

ServerErrorPage.title = "Something Went Wrong";

export default ServerErrorPage;
