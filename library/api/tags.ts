import { useMutation, useQuery } from "@tanstack/react-query";

import { Tag, TagSchema } from "../models";

export const fetchTags = () => Tag.find();

export const useFetchTags = () => useQuery(["tags"], fetchTags);

export const useCreateTags = () => useMutation(
	async (entries: TagSchema[]) => {
		return await Tag.create(entries)
	}
);

export const useEditTag = () => useMutation(
	async (tag: TagSchema & { id: string }) => {
		return await Tag.findByIdAndUpdate(tag.id, tag);
	}
);

export const useDeleteTag = () => useMutation(
	async (id: string) => {
		return await Tag.findByIdAndDelete(id);
	}
);

export const useDeleteTags = () => useMutation(
	async (ids: string[]) => {
		await Promise.all(ids.map(id => Tag.findByIdAndDelete(id)));
	}
)
