import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useQueryStatuses } from "@/library/hooks";
import { useCreateTags, useEditTagById } from "@/library/api";
import { Tag, TagSchema, TagModel } from "@/library/models";

import { Button, Flex, Form, Icon, Loader, Show, TextField } from "@/components/core"

export const TagInput = (props: TagInputProps) => {
	const { tag, onClose } = props;

	const queryClient = useQueryClient();
	const [fields, setFields] = useState(populateFields(tag));

	const createTags = useCreateTags();
	const editTag = useEditTagById();
	const { isLoading } = useQueryStatuses([createTags, editTag]);

	const editFields = (data: Partial<typeof fields>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const handleSubmission = async () => {
		try {
			if (!tag) {
				await createTags.mutateAsync([Tag.schema.parse(fields)]);
			} else {
				await editTag.mutateAsync({
					id: tag.id,
					tag: Tag.schema.parse({ ...tag, ...fields  } )
				});
			}

			queryClient.invalidateQueries(["tags"]);

			if (tag) { return onClose(); }

			setFields(populateFields());
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form onSubmit={handleSubmission} className="w-full">
			<Flex.Column className="items-center space-x-2 space-y-3 w-full">
				<Flex.Column className="space-y-2 w-full">
					<TextField
						id="name"
						label='Name'
						placeholder="Tag name"
						inputClassName="h-8 w-full"
						value={fields.name}
						onChange={name => editFields({ name })}
						required
					/>
					<TextField
						id="link"
						label='Link'
						placeholder="Tag link"
						inputClassName="h-8 w-full"
						value={fields.link ?? ""}
						onChange={link => editFields({ link })}
					/>
				</Flex.Column>
				<Flex.Row className="items-center justify-between w-full">
					<Show if={!isLoading} else={<Loader>Submitting tag changes... Please wait</Loader>}>
						<button
							onClick={onClose}
							className="text-secondary underline text-sm decoration-primary underline-offset-2 decoration-2 dark:text-white"
						>
							Close
						</button>
						<Button.Submit
							className="flex items-center h-8"
							disabled={createTags.isLoading || !fields.name}
						>
							{ !tag ? "Create" : "Edit" }
							<Icon name={!tag ? "add-circle-line" : "edit-line"} className="text-lg ml-2" />
						</Button.Submit>
					</Show>
				</Flex.Row>
			</Flex.Column>
		</Form>
	)
}

const populateFields = (tag?: TagModel | null): TagModel | TagSchema => {
	return {
		...(tag ? { id: tag.id } : {}),
		name: tag?.name ?? "",
		link: tag?.link ?? ""
	}
}

export interface TagInputProps { tag?: TagModel, onClose: () => void }
