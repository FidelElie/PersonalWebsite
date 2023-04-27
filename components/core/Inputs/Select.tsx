import { Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useFloating, FloatingPortal, size, offset, flip, autoUpdate } from "@floating-ui/react";

import { clc } from "@/library/utilities";

export function Select<Value extends string[], Option extends unknown>(
	props: SelectProps<Value, Option> & { multiple: true, valueDisplay: (option?: Option[]) => ReactNode; }
): JSX.Element;
export function Select<Value extends string, Option extends unknown>(
	props: SelectProps<Value, Option> & { valueDisplay: (option?: Option) => ReactNode }
): JSX.Element
export function Select<Value extends string | string[], Option extends unknown>(
	props: SelectProps<Value, Option> & { multiple?: true, valueDisplay: (option?: Option | Option[]) => ReactNode; }
): JSX.Element {
	const {
		valueDisplay,
		value,
		accessor,
		onChange,
		options,
		optionDisplay,
		placeholder,
		multiple,
		className,
		selectClassName,
		optionsClassName
	} = props;

	const { x, y, strategy, refs } = useFloating({
		placement: "bottom-start",
		whileElementsMounted(...args) {
			const cleanup = autoUpdate(...args, { animationFrame: true });
			// Important! Always return the cleanup function.
			return cleanup;
		},
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

	const getAccessedOptions = () => {
		if (!accessor) {
			// Assumes that value and options are in a form that can be compared directly string - string
			return options.filter(
				option => multiple ?
					(value as string[] | undefined)?.some(entry => entry === option) : value === option
			);
		}

		const filteredOptions = options.filter(
			option => multiple ? (value as string[] || []).some(string => string === accessor(option)) : value === accessor(option)
		);

		return multiple ? filteredOptions : filteredOptions[0]
	}


	const dispatchOnChange = (value: Value) => {
		if (!onChange) { return; }

		onChange(value);
	}

	return (
		<Listbox value={value} onChange={dispatchOnChange} multiple={multiple}>
			<div className={clc("relative mt-1", className)}>
				<Listbox.Button
					ref={refs.setReference}
					className={clc(
						"relative py-2 px-3 rounded bg-white w-full border text-sm border-gray-200 text-left",
						"dark:text-white dark:border-gray-100 dark:bg-gray-700",
						selectClassName
					)}
				>
					{
						(!value || !value.length) ? (
							<SelectPlaceholder placeholder={placeholder}/>
						) : (
							valueDisplay(getAccessedOptions())
						)
					}
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
							className={clc(
								"max-h-60 border-gray-200 border rounded shadow overflow-y-auto bg-white z-50",
								"dark:bg-gray-700",
								optionsClassName
							)}
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
									value={accessor ? accessor(option) : option}
								>
									{
										({ selected }) => (
											<>{optionDisplay(option, selected)}</>
										)
									}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</FloatingPortal>
			</div>
		</Listbox>
	)
}

const SelectPlaceholder = ({ placeholder }: { placeholder?: string, }) => (
	<span className="text-gray-500 tracking-tight font-light">{placeholder}</span>
)

export interface SelectProps<Value extends string | string[], Option extends unknown> {
	value?: Value;
	accessor?: (value: Option) => string;
	onChange?: (value: Value) => void;
	options: Option[] | readonly Option[];
	placeholder?: string;
	optionDisplay: (option: Option, selected: boolean) => ReactNode;
	className?: string;
	selectClassName?: string;
	optionsClassName?: string;
}
