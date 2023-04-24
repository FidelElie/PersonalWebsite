import { Fragment, ReactNode } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Placement, offset, useFloating } from "@floating-ui/react";

const BaseMenu = (props: MenuProps) => {
	const {
		placement,
		button,
		buttonClassName,
		menuClassName,
		offset: offsetMenu = 10,
		children
	} = props;

	const { x, y, strategy, refs } = useFloating({
		strategy: "fixed",
		placement,
		middleware: [
			offset(offsetMenu)
		]
	});

	return (
		<HeadlessMenu as="div">
			<HeadlessMenu.Button
				className={buttonClassName}
				ref={refs.setReference}
			>
				{ button }
			</HeadlessMenu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<HeadlessMenu.Items
					className={menuClassName}
					ref={refs.setFloating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
						width: 'max-content'
					}}
				>
					{ children }
				</HeadlessMenu.Items>
			</Transition>
		</HeadlessMenu>
	)
}

export interface MenuProps {
	placement: Placement,
	button: ReactNode,
	buttonClassName?: string,
	menuClassName?: string,
	offset?: number,
	children: ReactNode
}

export const Menu = Object.assign(BaseMenu, { Item: HeadlessMenu.Item });
