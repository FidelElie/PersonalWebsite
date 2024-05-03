import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { fetchMusicInformation } from "@/libraries/functions";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.get((req) => {
	const { nextUrl } = req;

	const offset = nextUrl.searchParams.get("offset");
	const limit = nextUrl.searchParams.get("limit");

	const musicPosts = fetchMusicInformation.local({ offset, limit });

	return NextResponse.json(musicPosts);
});

export default router.handler();

export const config = {
	runtime: "edge"
}
