import { useQueryClient } from "@tanstack/react-query";

import { useDeleteExperience } from "@/library/api";
import { ExperienceSchema } from "@/library/models";

import { MergedModelSchema } from "@/configs/firebase";

import { Button, Copy, Divider, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

export const DeleteExperiencesModal = (props: DeleteExperiencesModalProps) => {
	const { isOpen, onClose, experience } = props;

	const queryClient = useQueryClient();
	const deleteExperience = useDeleteExperience();

	if (!experience) { return null; }

	const handleConfirmation = async () => {
		try {
			await deleteExperience.mutateAsync(experience.id);

			queryClient.invalidateQueries(["experiences"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>Delete Experience?</Modal.Header>
			<Divider/>
			<Copy className="mb-3">
				Are you sure you would like to delete experience <Copy.Bold>{experience.title}</Copy.Bold>? Confirm your choice below.
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

interface DeleteExperiencesModalProps extends ModalConfiguredProps {
	experience: MergedModelSchema<ExperienceSchema>;
}
