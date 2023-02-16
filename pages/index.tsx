import { useLogout } from "@/library/api/client";
import { useSupabaseContext } from "@/library/providers";

import { Page } from "@/components/core";
import { Navbar } from "@/components/interfaces";

const Home = () => {
	const { user } = useSupabaseContext();
	const logout = useLogout();

	return (
		<Page header={<Navbar/>}>
			{ user && (
				<button className="text-white" onClick={() => logout.mutate()}>Sign out</button>
			)}

		</Page>
	)
}

export default Home;
