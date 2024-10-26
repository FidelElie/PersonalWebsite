import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { MusicContentPostSchema } from "@/libraries/schemas";

export const MusicBookmark = (props: MusicBookmarkProps) => {
	const { post, artist, cover } = props;

	const [showPopup, setShowPopup] = useState(false);

	const normalisedSlug = !post.slug.startsWith("/") ? `/${post.slug}` : post.slug;

	const label = `${artist} - ${post.metadata.name}`;

	return (
		<span className="relative" aria-label={label}>
			<button
				onClick={() => setShowPopup(!showPopup)}
				className="underline underline-offset-2 font-semibold "
			>
				{label}
			</button>
			<div
				className={clsx(
					"absolute left-0 border bg-white px-2 py-3 rounded shadow-lg",
					showPopup ? "block" : "hidden"
				)}
			>
				<div className="relative w-48 aspect-square not-prose border">
					{
						cover && (
							<Image
								src={cover}
								alt={label}
								loading="lazy"
								fill
							/>
						)
					}
				</div>
				<div className="flex justify-between">
					<Link href={normalisedSlug}>
						{label} &gt;
					</Link>
				</div>
			</div>
		</span>
	)
}

export interface MusicBookmarkProps {
	post: MusicContentPostSchema;
	cover?: string;
	artist: string;
}
