import { MouseEventHandler, ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/solid";

const Checkbox = (props: CheckboxProps) => {
	const { checked, label, onChange, children } = props;
	return (
		<div className="flex items-center">
			<div className="relative border-2 rounded-md shadow-md bg-white h-6 w-6 mr-3 flex items-center justify-center cursor-pointer" onClick={onChange}>
				{checked && <CheckIcon className="w-6 h-auto text-primary" />}
			</div>
			<label className="text-white">
				{label}
				{children}
			</label>
		</div>
	)
}

interface CheckboxProps {
	checked?: boolean,
	label?: string,
	onChange?: MouseEventHandler<HTMLDivElement>
	children?: ReactNode
}

export default Checkbox;
export type { CheckboxProps }
