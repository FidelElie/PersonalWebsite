import { renderToString } from "react-dom/server";

import { createRegExpDirective } from "@/libraries/plugins/remarkRegExpDirective";

import { request } from "@/libraries/clients";

export const EmbedDirective = createRegExpDirective({
	identifier: /:embed\[.*?\]/g,
	onMatch: (match) => {
		return { url: match[1] }
	},
	getHTML: async (result) => {
		const { host, pathname, searchParams } = new URL(result.url);

		if (host.includes("youtube.com")) {
			const idFromQuery = searchParams.get("v");

			const idFromParams = pathname.split("/").filter(Boolean)[0];

			const response = await request<YoutubeOEmbedResult>({
				url: `https://www.youtube.com/oembed?format=json&url=${result.url}`
			});

			return renderToString(
				<iframe
					title={response.title}
					src={`https://www.youtube.com/embed/${idFromQuery || idFromParams}`}
					className="aspect-video w-full"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			)
		}

		return "[Unknown embed]";
	}
});

export const YoutubeEmbedDirective = createRegExpDirective({
	identifier: /:youtube\[.*?\]/g,
	onMatch: (match) => {
		return { id: match[1] }
	},
	getHTML: async (result) => {
		try {
			const url = `https://youtube.com/watch?v=${result.id}`;

			const response = await request<YoutubeOEmbedResult>({
				url: `https://www.youtube.com/oembed?format=json&url=${url}`
			});

			return renderToString(
				<iframe
					title={response.title}
					src={`https://www.youtube.com/embed/${result.id}`}
					className="aspect-video w-full"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			);
		} catch (error) {
			return "[Error loading iframe]";
		}
	}
});

type YoutubeOEmbedResult = {
	title: string;
	author_name: string;
	author_url: string;
	type: string;
	height: number;
	width: number;
	version: string;
	provider_name: string;
	provider_url: string;
	thumbnail_height: number;
	thumbnail_width: number;
	thumbnail_url: string;
	html: string;
}
