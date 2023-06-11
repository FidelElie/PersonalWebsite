import { useQueryClient } from "@tanstack/react-query";

import { useDeleteDetail } from "@/library/api";
import type { DetailModel } from "@/library/models";

import { Button, Card, Copy, Flex, Loader, Show } from "@/components/core";

export const DetailsDeletion = (props: DetailsDeletionProps) => {
	const { detail, cancel } = props;

	const queryClient = useQueryClient();
	const deleteDetail = useDeleteDetail();

	const handleConfirmation = async () => {
		try {
			await deleteDetail.mutateAsync(detail.id);

			queryClient.invalidateQueries(["details"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="p-3 md:w-1/2">
			<Copy className="mb-3">
				Are you sure you would like to delete detail <b >{detail.title}</b>? Confirm your choice below.
			</Copy>
			<Flex className="items-center justify-between">
				<Show if={!deleteDetail.isLoading} else={<Loader>Deleting detail... Please wait</Loader>}>
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

export interface DetailsDeletionProps {
	detail: DetailModel;
	cancel: () => void;
}
