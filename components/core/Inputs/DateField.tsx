import { Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useFloating, FloatingPortal, size, offset, flip } from "@floating-ui/react";

import { clc, numberArray } from "@/library/utilities";

export const DateField = (props: DateFieldProps) => {
	const {
		id,
		label,
		value,
		onChange,
		years = {}
	} = props;

	const { min: minYear, max: maxYear } = { ...{ min: 1975, max: 2050 }, ...years }

	const parsedDate = typeof value === "string" ? new Date(value) : value;

	const dispatchChange = (value: number, component: "year" | "month" | "day") => {
		onChange(
			new Date(
				component === "year" ? value : parsedDate.getFullYear(),
				component === "month" ? value : parsedDate.getMonth(),
				component === "day" ? value : parsedDate.getDate()
			)
		);
	}

	return (
		<div className="flex items-center" id={id}>
			<label
				htmlFor={id}
				className="text-sm text-gray-500 mr-2 font-light border-gray-200 dark:text-white dark:border-gray-50 dark:bg-gray-700"
			>
				{label}
			</label>
			<DateComponentField
				value={value.getDate()}
				onChange={day => dispatchChange(day, "day")}
				options={numberArray(
					1,
					new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 0).getDate()
				)}
				className="w-10"
			>
				{ year => year }
			</DateComponentField>
			<DateComponentSeparator />
			<DateComponentField
				value={parsedDate.getMonth()}
				onChange={month => dispatchChange(month, "month")}
				options={numberArray(0, 12)}
				renderValue={(value) => value + 1}
				className="w-10"
			>
				{ month => month + 1 }
			</DateComponentField>
			<DateComponentSeparator/>
			<DateComponentField
				value={parsedDate.getFullYear()}
				onChange={year => dispatchChange(year, "year")}
				options={numberArray(minYear, maxYear, { exclusive: true })}
				className="w-14"
			>
				{ year => year }
			</DateComponentField>
		</div>
	)
}

const DateComponentField = (props: DateComponentFieldProps) => {
	const { className, value, onChange, options, renderValue, children } = props;

	const { x, y, strategy, refs } = useFloating({
		placement: "bottom-start",
		middleware: [
			size({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`
					});
				}
			}),
			offset(5),
			flip()
		]
	});


	return (
		<Listbox value={value} onChange={onChange}>
			<div className="relative">
				<Listbox.Button
					ref={refs.setReference}
					className={clc(
						"h-8 rounded bg-white pl-2 border font-light text-sm border-gray-300 dark:text-white dark:border-gray-50 dark:bg-gray-700 text-left",
						className
					)}
				>
					{ renderValue ? renderValue(value) : value }
				</Listbox.Button>
				<FloatingPortal>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							ref={refs.setFloating}
							className="max-h-60 border-gray-200 border rounded shadow overflow-y-auto bg-white  dark:bg-gray-700 z-50 space-y-1"
							style={{
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
								width: 'max-content'
							}}
						>
							{
								options.map(
									option => (
										<Listbox.Option
											key={option}
											value={option}
											className="font-light text-sm px-1.5 py-0.5"
										>
											{children(option)}
										</Listbox.Option>
									)
								)
							}
						</Listbox.Options>
					</Transition>
				</FloatingPortal>
			</div>
		</Listbox>
	)
}

const DateComponentSeparator = () => (
	<div
		className="h-8 w-4 flex items-center justify-center border-gray-300 dark:text-white dark:border-gray-50 dark:bg-gray-700"
	>
		<span>/</span>
	</div>
)

export interface DateFieldProps {
	id: string,
	label: string,
	value: Date;
	className?: string,
	onChange: (date: Date) => void;
	years?: { min: number, max: number }
}

interface DateComponentFieldProps {
	value: number;
	renderValue?: (value: number) => ReactNode;
	onChange: (value: number) => void;
	className?: string,
	options: number[];
	children: (option: number) => ReactNode;
}
