import { useLogout } from "@/library/functions/auth";
import { useSupabaseContext } from "@/library/providers";

import { Page } from "@/components/core";
const Home = () => {
	const { session } = useSupabaseContext();
	const logout = useLogout();

	return (
		<Page>
			{ session && (
				<button className="text-white" onClick={() => logout.mutate()}>Sign out</button>
			)}

		</Page>
	)
}

export default Home;
