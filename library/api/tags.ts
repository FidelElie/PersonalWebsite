import type { AnyZodObject } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig, Model } from "@/configs/firebase";

import { Tag, Project, Experience, Skill, TagSchema, TagModel } from "../models";

// READ Tags
export type FindTagConfig = FindConfig<TagSchema>;

export const fetchTags = (config?: FindTagConfig) => Tag.find(config);

export const useFetchTags = (config?: FindTagConfig) => useQuery(
	["tags", config],
	() => fetchTags(config)
);

// CREATE Tags
export const createTags = (entries: TagSchema[]) => Tag.create(entries);

export const useCreateTags = () => useMutation(createTags);

// UPDATE Tags
export const editTagById = (
	{ id, tag }: { id: string, tag: Partial<TagModel> }
) => {
	return Tag.findByIdAndUpdate(id, tag);
}

export const useEditTagById = () => useMutation(editTagById);

// DELETE Tags
const deleteTag = async (id: string) => {
	const amendCorrespondingReference = async <T extends AnyZodObject>(resource: Model<T>) => {
		const documents = await resource.find({ where: [["tags", "array-contains", id as any]]});

		await Promise.all(documents.map(document => {
			const tags = [...document.tags];

			const amendedTags = tags.filter(tag => tag.id !== id);

			return resource.findByIdAndUpdate(document.id, { tags: amendedTags } as any);
		}));
	}

	await Promise.all([
		amendCorrespondingReference(Project),
		amendCorrespondingReference(Experience),
		amendCorrespondingReference(Skill),
		Tag.findByIdAndDelete(id)
	]);
}

export const useDeleteTag = () => useMutation((id: string) => deleteTag(id));

export const useDeleteTags = () => useMutation(
	(ids: string[]) => Promise.all(ids.map(id => deleteTag(id)))
);
