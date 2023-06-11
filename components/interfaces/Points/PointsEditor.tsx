import { Button, Flex, For, Icon, TextField } from "@/components/core";

export const PointsEditor = (props: PointsEditorProps) => {
	const { points, onChange } = props;

	const addNewPoint = () => onChange(points.concat(""));

	const updatePoint = (value: string, index: number) => onChange(
		points.map((point, pointIndex) => pointIndex === index ? value : point)
	);

	const removePoint = (index: number) => onChange(
		points.filter((_, pointIndex) => pointIndex !== index)
	);

	return (
		<Flex.Column className="space-y-2 w-full">
			<Flex.Column className="space-y-1">
				<For each={points}>
					{ (point, pointIndex) => (
						<Flex.Row className="space-x-1 items-center" key={pointIndex}>
							<button
								type="button"
								className="w-5 h-5 rounded-full text-gray-500"
								onClick={() => removePoint(pointIndex)}
							>
								<Icon name="close-line" className="text-xl dark:text-white"/>
							</button>
							<TextField
								id={`point-${pointIndex}`}
								label="Point"
								className="w-full"
								placeholder={`Point ${pointIndex + 1}`}
								value={point}
								onChange={value => updatePoint(value, pointIndex)}
							/>
						</Flex.Row>
					)}
				</For>
			</Flex.Column>
			<Button onClick={addNewPoint} className="items-center w-min whitespace-nowrap">
				<Icon name="add-circle-fill" className="text-white text-xl mr-1.5"/>
				Add point
			</Button>
		</Flex.Column>
	)
}

export interface PointsEditorProps {
	points: string[],
	onChange: (points: string[]) => void;
}
