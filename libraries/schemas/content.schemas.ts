import { z } from "zod";

const BaseMusicPostSchema = z.object({
	spotifyId: z.string(),
	spotifyLink: z.string().url(),
	name: z.string(),
	artists: z.array(z.string()),
	images: z.array(z.object({ height: z.number(), width: z.number(), url: z.string().url() })),
	duration: z.number(), // In minutes
	release: z.coerce.string(),
	genres: z.array(z.string())
});

export const MusicPostSchema = z.union([
	BaseMusicPostSchema.merge(
		z.object({
			type: z.literal("album"),
			favourites: z.array(z.object({ spotifyId: z.string(), name: z.string() }))
		})
	),
	BaseMusicPostSchema.merge(z.object({ type: z.literal("track") }))
]);

export type MusicPostSchema = z.infer<typeof MusicPostSchema>;

export const MusicArtistMetadataSchema = z.object({
	spotifyId: z.string(),
	spotifyLink: z.string().url(),
	name: z.string(),
	images: z.array(z.object({ height: z.number(), width: z.number(), url: z.string().url() })),
	genres: z.array(z.string())
});

export type MusicArtistMetadataSchema = z.infer<typeof MusicArtistMetadataSchema>;
