import type { NextPage } from "next";

import { Navbar, Page } from "@/components/core";

const MusicPage: NextPage = () => {
	return (
		<Page
			title="Music"
			header={<Navbar/>}
			container
		>

		</Page>
	)
}

export default MusicPage;
