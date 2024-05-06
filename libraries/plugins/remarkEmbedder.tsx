import { renderToString } from "react-dom/server";
import { Transformer } from "@remark-embedder/core";
import { request } from "../clients";

export const YoutubeEmbedTransformer: Transformer = {
	name: "Youtube",
	shouldTransform(url: string) {
		const { host } = new URL(url);

		return host.includes("youtube.com");
	},

	async getHTML(url: string) {
		const { pathname, searchParams } = new URL(url);

		const idFromQuery = searchParams.get("v");

		const idFromParams = pathname.split("/").filter(Boolean)[0];

		const response = await request<YoutubeOEmbedResult>({
			url: `https://www.youtube.com/oembed?format=json&url=${url}`
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
		);
	}
}

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
