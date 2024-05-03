import clsx from "clsx";
import Link from "next/link";

export const Navbar = (props: NavbarProps) => {
	const { className } = props;

	return (
		<header className={className}>
			<div
				className={clsx(
					"container max-w-5xl mx-auto px-5 flex flex-col"
				)}
			>
				<nav className="flex items-center justify-between pb-3 pt-5">
					<Link
						href="/"
						className="tracking-tighter text-lg block p-0.5 px-2 border rounded-lg font-light"
					>
						FiPE
					</Link>
					<ul className="flex gap-2">
						<li><Link href="/music" className="font-extralight text-gray-500">Music</Link></li>
						<li>
							<Link href="/projects" className="font-extralight text-gray-500">Projects</Link>
						</li>
					</ul>
				</nav>
				<hr className="w-full"/>
			</div>
		</header>
	)
}

export interface NavbarProps {
	className?: string;
}
