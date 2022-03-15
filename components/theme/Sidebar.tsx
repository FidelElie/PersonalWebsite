import { LightningBoltIcon } from "@heroicons/react/solid";

import { Link } from "../core";

const Sidebar = (props: SidebarProps) => {
	const { } = props;

	return (
		<div className="fixed px-3 py-3 top-0 flex space-x-4 items-center w-full">
			<LightningBoltIcon className="w-9 h-9 text-light cursor-pointer transition-colors hover:fill-tertiary" />
			<Link href="/">Book of Elie</Link>
		</div>
	)
}

interface SidebarProps {

}
export default Sidebar;
