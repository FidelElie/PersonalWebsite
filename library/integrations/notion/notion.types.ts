import type {
	AppendBlockChildrenParameters,
	AppendBlockChildrenResponse,
	CreateCommentParameters,
	CreateCommentResponse,
	CreatePageParameters,
	CreatePageResponse,
	DeleteBlockResponse,
	GetBlockResponse,
	GetDatabaseResponse,
	GetPagePropertyResponse,
	GetPageResponse,
	GetUserResponse,
	ListBlockChildrenResponse,
	ListCommentsResponse,
	ListUsersResponse,
	QueryDatabaseParameters,
	QueryDatabaseResponse,
	UpdateBlockParameters,
	UpdateBlockResponse,
	UpdateDatabaseResponse,
	UpdatePageParameters,
	UpdatePageResponse,
	BlockObjectResponse,
	PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

export type { BlockObjectResponse, PageObjectResponse }

// ! Mapped Types
export type SimpleBlockTypes = "image" | "section" | "paragraph" | "list";

export type HeadingLevels = 1 | 2 | 3;

export type ParsingMap = {
	type: SimpleBlockTypes,
	start: number,
	end: number,
	level?: HeadingLevels,
	ordered?: boolean
}

type SimpleStructuredBlock<T> = {
	id: string,
	type: SimpleBlockTypes,
	start: number,
	end: number,
	content: string,
	contents: (string | T)[]
}

export interface SimpleBlock extends SimpleStructuredBlock<SimpleBlock> {};

// ! Notion Client Types
export type ConfiguredDatabase<T> = Omit<T, "database_id">;

export type DatabaseInterfaces = {
	retrieve: () => Promise<GetDatabaseResponse>,
	query: (args?: ConfiguredDatabase<QueryDatabaseParameters>) => Promise<QueryDatabaseResponse>,
	update: (args?: ConfiguredDatabase<UpdateDatabaseResponse>) => Promise<UpdateDatabaseResponse>
}

export type PageInterfaces = {
	create: (args: CreatePageParameters) => Promise<CreatePageResponse>,
	retrieve: (pageId: string) => Promise<GetPageResponse>,
	update: (
		pageId: string,
		args: Omit<UpdatePageParameters, "page_id">
	) => Promise<UpdatePageResponse>,
	property: (pageId: string, propertyId: string) => Promise<GetPagePropertyResponse>
}

export type BlockInterfaces = {
	retrieve: (blockId: string) => Promise<GetBlockResponse>,
	update: (
		blockId: string,
		args: Omit<UpdateBlockParameters, "block_id">
	) => Promise<UpdateBlockResponse>,
	delete: (blockId: string) => Promise<DeleteBlockResponse>,
	children: (blockId: string) => Promise<ListBlockChildrenResponse>,
	append: (
		blockId: string,
		args: Omit<AppendBlockChildrenParameters, "block_id">
	) => Promise<AppendBlockChildrenResponse>,
}

export type CommentInterfaces = {
	list: (blockId: string) => Promise<ListCommentsResponse>,
	create: (args: CreateCommentParameters) => Promise<CreateCommentResponse>
}

export type UserInterfaces = {
	retrieve: (userId: string) => Promise<GetUserResponse>,
	list: () => Promise<ListUsersResponse>
}

export type NotionDatabaseMap<T extends string> = { [databaseKey in T]: string }

export type NotionClient<DatabaseNames extends string> = {
	databases: { [key in DatabaseNames]: DatabaseInterfaces },
	pages: PageInterfaces,
	blocks: BlockInterfaces,
	comments: CommentInterfaces,
	users: UserInterfaces
}
