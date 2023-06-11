import { For, Copy } from "@/components/core";

export const PointsDisplay = (props: PointsDisplayProps) => {
	const { points } = props;

	return (
		<ul className="list-disc ml-5">
			<For each={points}>
				{ (point, pointIndex) => (
					<li key={pointIndex} className="text-sm">
						<Copy.Inline>{point}</Copy.Inline>
					</li>
				)}
			</For>
		</ul>
	)
}

export interface PointsDisplayProps {
	points: string[];
}
