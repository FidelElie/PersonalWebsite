import { useQueryClient } from "@tanstack/react-query";

import { useDeleteExperience } from "@/library/api";
import { ExperienceModel } from "@/library/models";

import { Button, Card, Copy, Flex, Loader, Show } from "@/components/core";

export const ExperiencesDeletion = (props: ExperiencesDeletionsProps) => {
	const { experience, cancel } = props;

	const queryClient = useQueryClient();
	const deleteExperience = useDeleteExperience();

	const handleConfirmation = async () => {
		try {
			await deleteExperience.mutateAsync(experience.id);

			queryClient.invalidateQueries(["experiences"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="p-3 md:w-1/2">
			<Copy className="mb-3 text-sm">
				Are you sure you would like to delete experience <Copy.Bold>{experience.title}</Copy.Bold>? Confirm your choice below.
			</Copy>
			<Flex className="items-center justify-between">
				<Show if={!deleteExperience.isLoading} else={(
					<Loader>Deleting experience... Please wait</Loader>
				)}>
					<button
						type="button"
						className="underline text-sm text-blue-500"
						onClick={cancel}
					>
						Cancel
					</button>
					<Button onClick={handleConfirmation}>Submit</Button>
				</Show>
			</Flex>
		</Card>
	)
}

export interface ExperiencesDeletionsProps {
	experience: ExperienceModel;
	cancel: () => void;
}
