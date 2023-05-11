import { Switch } from "@headlessui/react";

import { clc } from "@/library/utilities";

export const Toggle = (props: ToggleProps) => {
	const { className, checked, label, onChange } = props;

	return (
		<Switch
			checked={checked}
			onChange={onChange}
			className={clc(
				"relative inline-flex py-1 px-2 rounded transform transition-all",
				checked ? "bg-primary justify-end" : "bg-gray-500 justify-start",
				className
			)}
		>
			<span className="sr-only">{label}</span>
			<span
				aria-hidden="true"
				className={clc(
					"pointer-events-none inline-block p-2 transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
				)}
			/>
		</Switch>
	)
}

export interface ToggleProps {
	className?: string,
	label: string,
	checked: boolean;
	onChange: (value: boolean) => void
}
