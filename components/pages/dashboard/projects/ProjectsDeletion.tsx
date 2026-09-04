import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProject } from "@/library/api";
import { ProjectModel } from "@/library/models";

import { Button, Card, Copy, Flex, Loader, Show } from "@/components/core";

export const ProjectsDeletion = (props: ProjectDeletionProps) => {
	const { project, cancel } = props;

	const queryClient = useQueryClient();
	const deleteProject = useDeleteProject();

	const handleConfirmation = async () => {
		try {
			await deleteProject.mutateAsync(project.id);

			queryClient.invalidateQueries(["experiences"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="p-3 md:w-1/2">
			<Copy className="mb-3">
				Are you sure you would like to delete project <Copy.Bold className="underline">{project.title}</Copy.Bold>? Confirm your choice below.
			</Copy>
			<Flex className="items-center justify-between">
				<Show if={!deleteProject.isLoading} else={<Loader>Deleting project... Please wait</Loader>}>
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

export interface ProjectDeletionProps {
	project: ProjectModel;
	cancel: () => void;
}
