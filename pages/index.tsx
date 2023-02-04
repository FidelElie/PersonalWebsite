import { useLogout } from "@/library/functions/auth";
import { useSupabaseContext } from "@/library/providers";

const Home = () => {
	const { session } = useSupabaseContext();
	const logout = useLogout();

	return (
		<main className="h-screen flex items-center">
			{ session && (
				<button className="text-white" onClick={() => logout.mutate()}>Sign out</button>
			)}
		</main>
	)
}

export default Home;
