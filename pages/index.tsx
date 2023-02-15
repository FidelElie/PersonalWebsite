import { useLogout } from "@/library/functions/auth";
import { useSupabaseContext } from "@/library/providers";

import { Page } from "@/components/core";
import { Navbar } from "@/components/interfaces";

const Home = () => {
	const { session } = useSupabaseContext();
	const logout = useLogout();

	return (
		<Page header={<Navbar/>}>
			{ session && (
				<button className="text-white" onClick={() => logout.mutate()}>Sign out</button>
			)}

		</Page>
	)
}

export default Home;
