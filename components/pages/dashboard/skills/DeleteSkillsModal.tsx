import { useQueryClient } from "@tanstack/react-query";

import { useDeleteSkill } from "@/library/api";
import { SkillModel } from "@/library/models";

import { Button, Copy, Divider, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

export const DeleteSkillsModal = (props: DeleteProjectsModalProps) => {
	const { isOpen, onClose, skill } = props;

	const queryClient = useQueryClient();
	const deleteProject = useDeleteSkill();

	if (!skill) { return null; }

	const handleConfirmation = async () => {
		try {
			await deleteProject.mutateAsync(skill.id);

			queryClient.invalidateQueries(["skills"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>Delete Skill?</Modal.Header>
			<Divider className="my-2"/>
			<Copy className="mb-3">
				Are you sure you would like to delete skill <Copy.Bold>{skill.name}</Copy.Bold>? Confirm your choice below.
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

interface DeleteProjectsModalProps extends ModalConfiguredProps {
	skill: SkillModel;
}
