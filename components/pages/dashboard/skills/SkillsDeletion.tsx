import { useQueryClient } from "@tanstack/react-query";

import { useDeleteSkill } from "@/library/api";
import type { SkillModel } from "@/library/models";

import { Button, Copy, Flex, Card, Show, Loader } from "@/components/core";

export const SkillsDeletion = (props: SkillsDeletionProps) => {
	const { skill, cancel } = props;

	const queryClient = useQueryClient();
	const deleteSkill = useDeleteSkill();

	const handleConfirmation = async () => {
		try {
			await deleteSkill.mutateAsync(skill.id);

			queryClient.invalidateQueries(["skills"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Card className="p-3 md:w-1/2">
			<Copy className="mb-1.5">
				Are you sure you would like to delete skill <Copy.Bold className="underline">{skill.name}</Copy.Bold>? Confirm your choice below.
			</Copy>
			<Flex className="items-center justify-between">
				<Show if={!deleteSkill.isLoading} else={<Loader>Deleting skill... Please wait</Loader>}>
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

interface SkillsDeletionProps {
	skill: SkillModel;
	cancel: () => void
}
