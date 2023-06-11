import { useState } from "react";

import { clc } from "@/library/utilities";

import { Flex, Box, Show, Copy, Icon, IconProps } from "@/components/core";
import { PointsDisplay } from "@/components/interfaces";

export const InformationDisplay = (props: InformationDisplayProps) => {
	const { points, description, light } = props;

	const [info, setInfo] = useState<"points" | "description">("points");

	return (
		<Flex.Row className="items-start space-x-4">
			<Box className="flex-grow">
				<Show if={info === "points"} else={<Copy className="text-sm">{description}</Copy>}>
					<Show if={points.length} else={(
						<Copy className="text-sm my-1 tracking-tight" light={light}>No points added</Copy>
					)}>
						<PointsDisplay points={points} />
					</Show>
				</Show>
			</Box>
			<Flex.Row className="space-x-2">
				<InformationToggleButton
					title="Points"
					icon="list-unordered"
					toggled={info === "points"}
					onClick={() => setInfo("points")}
				/>
				<InformationToggleButton
					title="Description"
					icon="text-wrap"
					toggled={info === "description"}
					onClick={() => setInfo("description")}
				/>
			</Flex.Row>
		</Flex.Row>
	)
}

const InformationToggleButton = ({ title, icon, toggled, onClick }: InformationToggleButtonProps) =>
(
	<button
		title={title}
		className={clc(
			"border p-1 rounded transition-all",
			toggled ? "border-primary text-primary" : "dark:text-white"
		)}
		onClick={onClick}
	>
		<Icon name={icon} className="text-xl" />
	</button>
)

interface InformationToggleButtonProps {
	title: string;
	icon: IconProps["name"];
	toggled: boolean;
	onClick: () => void;
}

export interface InformationDisplayProps {
	points: string[];
	description: string;
	light?: boolean;
}
