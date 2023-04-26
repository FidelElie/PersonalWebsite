import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProject } from "@/library/api";
import { ProjectSchema } from "@/library/models";

import { MergedModelSchema } from "@/configs/firebase";

import { Button, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

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
			<Modal.Header className="text-2xl dark:text-white">Delete Project?</Modal.Header>
			<hr className="my-2"/>
			<p className="mb-3 font-light dark:text-white">
				Are you sure you would like to delete project <b >{project.title}</b>? Confirm your choice below.
			</p>
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

interface DeleteProjectsModalProps extends ModalConfiguredProps {
	project: MergedModelSchema<ProjectSchema>;
}
