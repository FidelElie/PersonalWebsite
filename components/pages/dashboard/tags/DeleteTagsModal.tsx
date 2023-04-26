import { useQueryClient } from "@tanstack/react-query";

import { useDeleteTags } from "@/library/api";

import { Button, Copy, Divider, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

export const DeleteTagsModal = (props: DeleteTagsModalProps) => {
	const { isOpen, onClose, selected = [], onSuccess } = props;

	const queryClient = useQueryClient();
	const deleteTags = useDeleteTags();

	const handleConfirmation = async () => {
		try {
			await deleteTags.mutateAsync(selected);

			queryClient.invalidateQueries(["tags"]);
			onClose();
			if (onSuccess) { onSuccess(); }
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header className="text-2xl dark:text-white">Delete Detail?</Modal.Header>
			<Divider className="my-2"/>
			<Copy className="mb-3">
				Are you sure you would like to <Copy.Bold>{selected.length} tags</Copy.Bold>? Confirm your choice below.
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

interface DeleteTagsModalProps extends ModalConfiguredProps {
	selected: string[],
	onSuccess?: () => void,
}
