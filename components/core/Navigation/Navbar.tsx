import Link from "next/link";

const Navbar = (props: NavbarProps) => {
	return (
		<nav className="px-5 py-5 flex justify-between lg:px-0">
			<div className="container max-w-3xl mx-auto">
				<Link
					href="/"
					className="text-white underline underline-offset-4 decoration-2 tracking-tighter transition-all hover:text-primary"
				>
					fidel.dev
				</Link>
			</div>
		</nav>
	)
}

interface NavbarProps {

}

export default Navbar;
export type { NavbarProps }
