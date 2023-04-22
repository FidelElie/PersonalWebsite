import { Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useFloating, FloatingPortal, size, offset, flip } from "@floating-ui/react"

export const Select = <Value extends string, Option extends unknown>(
	props: SelectProps<Value, Option>
) => {
	const { valueDisplay, value, onChange, options, optionDisplay } = props;

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
			offset(10),
			flip()
		]
	});

	return (
		<Listbox value={value} onChange={onChange}>
			<div className="relative mt-1">
				<Listbox.Button
					ref={refs.setReference}
					className="relative py-2 px-3 rounded bg-white w-full border text-sm border-gray-200 dark:text-white dark:border-gray-50 dark:bg-gray-700 text-left"
				>
					{valueDisplay(value)}
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
							className="max-h-60 border-gray-200 border rounded shadow overflow-y-auto bg-white  dark:bg-gray-700 z-50"
							style={{
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
								width: 'max-content'
							}}
						>
							{options.map((option, optionIndex) => (
								<Listbox.Option
									key={optionIndex}
									value={option}
								>
									{optionDisplay(option)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</FloatingPortal>
			</div>
		</Listbox>
	)
}

export interface SelectProps<T extends string, Option extends unknown> {
	valueDisplay: (value?: T | null) => ReactNode;
	value?: T;
	onChange?: (value: T) => void;
	options: Option[] | readonly Option[],
	optionDisplay: (option: Option) => ReactNode
}
