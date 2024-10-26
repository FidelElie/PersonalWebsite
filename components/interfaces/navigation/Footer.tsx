import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

export const Footer = (props: FooterProps) => {
	const { className } = props;

	return (
		<footer className={className}>
			<div
				className={clsx(
					"container max-w-5xl mx-auto px-5 flex flex-col pb-5",
				)}
			>
				<hr className="w-full mb-3" />
				<div className="flex items-start justify-between mb-5">
					<Link
						href="/"
						className="tracking-tighter text-lg block p-0.5 px-2 border rounded-lg font-light"
					>
						FiPE
					</Link>
					<nav className="flex items-end gap-10">
						{/* <ul>
							<FooterLink href="/music">Home</FooterLink>
							<FooterLink href="/projects">About</FooterLink>
							<FooterLink href="/about">About</FooterLink>
						</ul> */}
						<div className="flex flex-col">
							<span className="mb-2">Posts</span>
							<ul>
								<FooterLink href="/music">Music</FooterLink>
								<FooterLink href="/projects">Projects</FooterLink>
							</ul>
						</div>
						<div className="flex flex-col">
							<span className="mb-2">Music</span>
							<ul>
								<FooterLink href="/music">Records</FooterLink>
								<FooterLink href="/music/artists">Artists</FooterLink>
							</ul>
						</div>
					</nav>
				</div>
				<div className="flex items-center justify-start">
					<span className="font-extralight text-sm">
						Copyright &copy; Fidel Pierre Elie - All Rights Reserved {new Date().getFullYear()}
					</span>
				</div>
			</div>
		</footer>
	)
}

const FooterLink = (props: FooterLinkProps) => {
	const { className, linkClassName, href, children } = props;

	return (
		<li className={className}>
			<Link
				href={href}
				className={clsx("font-extralight text-gray-500", linkClassName)}
			>
				{children}
			</Link>
		</li>
	)
}

interface FooterLinkProps {
	className?: string;
	linkClassName?: string;
	href: string;
	children: ReactNode;
}

export interface FooterProps {
	className?: string;
}
