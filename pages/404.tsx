import { Copy, Link } from "@/components/core";

import { ServiceLayout } from "@/components/interfaces";

const NotFoundErrorPage = () => {
	return (
		<ServiceLayout
			title="Not Found"
			heading="404: Page Not Found"
			description={(
				<Copy className="font-light">
					Looks like you took a wrong turn. Click <Link href="/">here</Link> to go back home
				</Copy>
			)}
		/>
	)
}

export default NotFoundErrorPage;
