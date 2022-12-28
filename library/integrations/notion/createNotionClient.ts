import { Client } from "@notionhq/client";

import type {
	NotionDatabaseMap,
	DatabaseInterfaces,
	NotionClient,
	PageInterfaces,
	BlockInterfaces,
	CommentInterfaces,
	UserInterfaces
} from "./notion.types";

const createNotionClient = <DatabaseNames extends string>(
	apiKey: string,
	databases: NotionDatabaseMap<DatabaseNames>
) : NotionClient<DatabaseNames> => {
	const client = new Client({ auth: apiKey });

	const registerDatabaseInterface = () => Object.fromEntries(
		(Object.entries(databases) as [DatabaseNames, string][]).map(
			([databaseName, databaseId]) => [
				databaseName,
				{
					retrieve: () => client.databases.retrieve({ database_id: databaseId }),
					query: (config) => client.databases.query({
						database_id: databaseId,
						...(config ? config : {})
					}),
					update: (args) => client.databases.update({
						database_id: databaseId,
						...(args ? args : {})
					})
				} as DatabaseInterfaces
			] as const
	)) as { [key in keyof NotionDatabaseMap<DatabaseNames>]: DatabaseInterfaces }

	const registerPagesInterface = (): PageInterfaces => ({
		retrieve: (pageId: string) => client.pages.retrieve({ page_id: pageId }),
		create: (args) => client.pages.create(args),
		update: (pageId: string, body: {}) => client.pages.update({ page_id: pageId, ...body }),
		property: (pageId: string, propertyId) => client.pages.properties.retrieve({
			page_id: pageId,
			property_id: propertyId
		})
	});

	const registerBlocksInterface = (): BlockInterfaces => ({
		retrieve: (blockId) => client.blocks.retrieve({ block_id: blockId }),
		update: (blockId, args) => client.blocks.update({ block_id: blockId, ...args }),
		delete: (blockId) => client.blocks.delete({ block_id: blockId }),
		children: (blockId) => client.blocks.children.list({ block_id: blockId }),
		append: (blockId, args) => client.blocks.children.append({ block_id: blockId, ...args })
	});

	const registerCommentsInterface = (): CommentInterfaces => ({
		list: (blockId) => client.comments.list({ block_id: blockId }),
		create: (args) => client.comments.create(args)
	});

	const registerUsersInterface = (): UserInterfaces => ({
		retrieve: (userId) => client.users.retrieve({ user_id: userId }),
		list: () => client.users.list({})
	})

	return {
		databases: registerDatabaseInterface(),
		pages: registerPagesInterface(),
		blocks: registerBlocksInterface(),
		comments: registerCommentsInterface(),
		users: registerUsersInterface()
	};
}

export default createNotionClient;
