import { useQueryClient } from "@tanstack/react-query";

import { useDeleteDetail } from "@/library/api";
import { DetailSchema } from "@/library/models";

import { MergedModelSchema } from "@/configs/firebase";

import { Button, Flex, Modal, ModalConfiguredProps } from "@/components/core";

export const DeleteDetailsModal = (props: DeleteDetailsModalProps) => {
	const { isOpen, onClose, detail } = props;

	const queryClient = useQueryClient();
	const deleteDetail = useDeleteDetail();

	if (!detail) { return null; }

	const handleConfirmation = async () => {
		try {
			await deleteDetail.mutateAsync(detail.id);

			queryClient.invalidateQueries(["details"]);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header className="text-2xl dark:text-white">Delete Detail?</Modal.Header>
			<hr className="my-2"/>
			<p className="mb-3 font-light">
				Are you sure you would like to delete detail <b >{detail.title}</b>? Confirm your choice below.
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

interface DeleteDetailsModalProps extends ModalConfiguredProps {
	detail: MergedModelSchema<DetailSchema>;
}