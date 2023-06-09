import { useQueryClient } from "@tanstack/react-query";

import { useDeleteDetail } from "@/library/api";
import {  DetailModel } from "@/library/models";

import { Button, Copy, Divider, Flex, Modal, type ModalConfiguredProps } from "@/components/core";

export const DeleteDetailsModal = (props: DeleteDetailsModalProps) => {
	const { isOpen, onClose, detail } = props;

	const queryClient = useQueryClient();
	const deleteDetail = useDeleteDetail();

	if (!detail) { return null; }

	const handleConfirmation = async () => {
		try {
			await deleteDetail.mutateAsync(detail.id);

			queryClient.invalidateQueries(["details"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>Delete Detail?</Modal.Header>
			<Divider className="my-2"/>
			<Copy className="mb-3">
				Are you sure you would like to delete detail <b >{detail.title}</b>? Confirm your choice below.
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

interface DeleteDetailsModalProps extends ModalConfiguredProps { detail: DetailModel; }
