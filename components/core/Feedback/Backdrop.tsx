import { Fragment } from "react"

import { Dialog, Transition } from "@headlessui/react"
import { Icon } from "../Data/Icon";

export const Backdrop = (props: BackdropProps) => {
	const { isOpen } = props;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-darker bg-opacity-50" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="w-full h-full flex items-center justify-center transition-all">
							<Icon name="loader-5" className="text-7xl animate-spin text-white opacity-80" />
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export interface BackdropProps {
	isOpen: boolean
}
