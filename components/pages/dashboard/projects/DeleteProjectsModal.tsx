import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProject } from "@/library/api";
import type { ProjectModel } from "@/library/models";

import { Button, Copy, Divider, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

export const DeleteProjectsModal = (props: DeleteProjectsModalProps) => {
	const { isOpen, onClose, project } = props;

	const queryClient = useQueryClient();
	const deleteProject = useDeleteProject();

	if (!project) { return null; }

	const handleConfirmation = async () => {
		try {
			await deleteProject.mutateAsync(project.id);

			queryClient.invalidateQueries(["experiences"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>Delete Project?</Modal.Header>
			<Divider className="my-2"/>
			<Copy className="mb-3">
				Are you sure you would like to delete project <Copy.Bold>{project.title}</Copy.Bold>? Confirm your choice below.
			</Copy>
			<Flex className="items-center justify-between">
				<button
					type="button"
					className="underline text-sm text-blue-500"
					onClick={onClose}
				>
					Cancel
				</button>
				<Button onClick={handleConfirmation}>Submit</Button>
			</Flex>
		</Modal>
	)
}

interface DeleteProjectsModalProps extends ModalConfiguredProps { project: ProjectModel; }
