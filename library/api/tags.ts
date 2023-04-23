import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Tag, TagSchema } from "../models";

export const useFetchTags = () => useQuery(
	["tags"],
	() => Tag.find()
);

export const useCreateTags = () => useMutation(
	async (entries: TagSchema[]) => {
		return await Tag.create(entries)
	}
);

export const useEditTag = () => useMutation(
	async (tag: MergedModelSchema<TagSchema>) => {
		return await Tag.findByIdAndUpdate(tag.id, tag);
	}
);

export const useDeleteTag = () => useMutation(
	async (id: string) => {
		return await Tag.findByIdAndDelete(id);
	}
);
