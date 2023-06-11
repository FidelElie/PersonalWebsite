import { useState } from "react";
import { ViewportList } from "react-viewport-list";

import { clc } from "@/library/utilities";

import {
	Box,
	Button,
	Copy,
	Flex,
	Icon,
	Show,
	TextField,
	For,
	type IconProps
} from "@/components/core";

export function IconPicker(props: IconPickerProps) {
	const {
		id,
		label,
		value,
		icons,
		onChange,
		multiple
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");

	const filterIconsBySearch = () => {
		if (!search) { return icons; }
		const lowercaseSearch = search.toLowerCase();

		return icons.filter(icon => {
			const humanVersion = icon.split("-").join(" ").toLowerCase();

			return humanVersion.includes(lowercaseSearch) || icon.toLowerCase().includes(lowercaseSearch);
		});
	}

	const parseValue = () => {
		if (!value) { return [] }

		return !!multiple ? value : [value];
	}

	const dispatchOnChange = (icon: SingularIcon) => {
		if (multiple) {
			onChange(
				value?.includes(icon) ? value.filter(valueIcon => valueIcon !== icon) : (value || []).concat([icon])
			);
		} else {
			setIsOpen(false);
			onChange(icon);
		}

	}

	const parsedValue = parseValue();
	const iconsToDisplay = filterIconsBySearch();

	return (
		<Show if={isOpen} else={(
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="h-10 flex-row items-center border rounded px-3"
			>
				<Flex.Row className="items-center flex-grow">
					<Show if={parsedValue.length} else={(
						<Copy className="text-left text-sm">Select {multiple ? "icons" : "icon"}</Copy>
					)}>
						<For each={parsedValue}>
							{ value => (
								<Flex.Row key={value} as="span" className="items-center">
									<Icon name={value} className="text-xl mr-2 dark:text-white"/>
									<Copy.Inline className="text-xs capitalize">
										{value.split("-").join(" ")}
									</Copy.Inline>
								</Flex.Row>
							)}
						</For>
					</Show>
				</Flex.Row>
				<Icon name="arrow-down-s-line" className="text-2xl dark:text-white"/>
			</button>
		)}>
			<Flex.Column className="space-y-2">
				<Flex.Row className="items-center space-x-2 h-10">
					<TextField
						id={id}
						label={label}
						value={search}
						right={<Icon name="search-line" className="text-lg dark:text-white"/>}
						placeholder="Search Icons"
						className="flex items-center pr-3 flex-grow h-10"
						onChange={setSearch}
					/>
					<Button onClick={() => setIsOpen(false)} className="h-10 items-center">
						<Icon name="close-fill" className="text-xl"/>
					</Button>
				</Flex.Row>
				<IconList
					icons={iconsToDisplay}
					value={parsedValue}
					onClick={dispatchOnChange}
				/>
			</Flex.Column>
		</Show>

	)
}

const IconList = (props: IconListProps) => {
	const {
		icons,
		value,
		lines = 2,
		onClick
	} = props;

	const numberOfIconLines = Math.ceil(icons.length / lines);

	const iconLines = (new Array(numberOfIconLines)).fill(null).map((_, line) => {
		return icons.slice(line * lines, (line * lines) + lines);
	});

	return (
		<Box className={clc("overflow-y-auto min-h-0 max-h-64", !!numberOfIconLines && "border-y")}>
			<Flex.Column>
				<Show if={numberOfIconLines} else={(
					<Box className="p-3 border rounded">
						<Copy className="text-sm">No icons matched</Copy>
					</Box>
				)}>
					<ViewportList items={iconLines}>
						{(iconLine, iconLineIndex) => (
							<Flex.Row className="items-center" key={iconLineIndex}>
								{
									iconLine.map(icon => (
										<Box
											key={`${iconLineIndex}-${icon}`}
											className={clc(
												"p-1",
												lines === 2 && "w-1/2",
												lines === 3 && "w-1/3",
												lines === 4 && "w-1/4",
												lines === 5 && "w-1/5"
											)}
										>
											<button
												className={clc(
													"h-24 w-full rounded space-y-1 border",
													"flex flex-col items-center justify-center dark:text-white focus:outline focus:outline-offset-2",
													value?.includes(icon) ? " border-primary text-primary" : "border"
												)}
												type="button"
												onClick={() => onClick(icon)}
											>
												<Icon name={icon} className="text-2xl" />
												<Box as="span" className="space-y-0.5 text-center">
													<Copy.Inline className="text-sm capitalize">
														{icon.split("-").join(" ")}
													</Copy.Inline>
													<Copy className="text-xs text-gray-400">{icon}</Copy>
												</Box>
											</button>
										</Box>
									))
								}
							</Flex.Row>
						)}
					</ViewportList>
				</Show>
			</Flex.Column>
		</Box>
	)
}

type SingularIcon = IconProps["name"];
type MultipleIcons = (IconProps["name"])[];

export type IconPickerProps = {
	id: string;
	label: string;
	icons: MultipleIcons;
} & ({
	multiple: true;
	value?: MultipleIcons;
	onChange: (icon: MultipleIcons) => void;
} | {
	multiple?: never;
	value?: SingularIcon;
	onChange: (icon: SingularIcon) => void;
})

type IconListProps = {
	icons: MultipleIcons;
	value?: MultipleIcons;
	lines?: 2 | 3 | 4 | 5;
	onClick: (icon: SingularIcon) => void;
}
