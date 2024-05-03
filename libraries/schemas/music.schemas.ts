import { z } from "zod";

const BaseMusicPostMetadataSchema = z.object({
	name: z.string(),
	spotifyId: z.string(),
	spotifyLink: z.string().url(),
	artists: z.array(z.string()),
	duration: z.number(), // In milliseconds
	release: z.coerce.string(),
	rating: z.enum(["Must listen", "Worth it", "Alright", "Meh", "Hot garbage"]),
	genres: z.array(z.string()),
});

export const MusicPostMetadataSchema = z.union([
	BaseMusicPostMetadataSchema.merge(
		z.object({
			type: z.literal("album"),
			tracks: z.array(
				z.object({
					spotifyId: z.string(),
					name: z.string(),
					favourite: z.boolean()
				})
			)
		})
	),
	BaseMusicPostMetadataSchema.merge(z.object({ type: z.literal("track") }))
]);

export type MusicPostMetadataSchema = z.infer<typeof MusicPostMetadataSchema>;

export const MusicContentPostSchema = z.object(
	{
		slug: z.string(),
		path: z.string(),
		post: z.string(),
		createdAt: z.string(),
		updatedAt: z.string().nullish(),
		publishedAt: z.string().nullish(),
		content: z.string().optional(),
		metadata: MusicPostMetadataSchema
	}
);

export type MusicContentPostSchema = z.infer<typeof MusicContentPostSchema>;

export const MusicArtistMetadataSchema = z.object({
	slug: z.string(),
	spotifyId: z.string(),
	spotifyLink: z.string().url(),
	name: z.string(),
	genres: z.array(z.string())
});

export type MusicArtistMetadataSchema = z.infer<typeof MusicArtistMetadataSchema>;

export const SpotifyImageMetadataSchema = z.object({
	slug: z.string(),
	type: z.enum(["project", "artist"]),
	images: z.array(z.object({ height: z.number(), width: z.number(), url: z.string().url() })),
	placeholder: z.string().optional()
});

export type SpotifyImageMetadataSchema = z.infer<typeof SpotifyImageMetadataSchema>;

