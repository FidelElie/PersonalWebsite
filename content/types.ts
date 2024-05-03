import type { CompileOptions } from "@mdx-js/mdx";

import type { ArrayOrNot, PromiseOrNot } from "@/libraries/types";

export type ContentConfig = {
	/**
	 * Enable more verbose logging
	 */
	debug?: boolean;
	/**
	 * Register post entries here
	 */
	entries: PostEntry<any>[];
	build?: {
		/**
		 * Include content strings in metadata build output
		 */
		includeContent?: boolean;
	};
	posts?: {
		/**
		 * Directory where posts are located - relative to root
		 */
		postsDir?: string;
		/**
		 * Locate metadata directory will override collocation
		 */
		metadataDir?: string | null;
	};
	/**
	 * Configure markdown settings
	 */
	markdown?: {
		/**
		 * Choose markdown type
		 */
		type: "md" | "mdx";
		/**
		 * Register plugins to control markdown
		 */
		plugins?: {
			remarkPlugins?: CompileOptions["remarkPlugins"];
			rehypePlugins?: CompileOptions["rehypePlugins"];
		}
	};
}

export type PostEntry<T> = {
	/**
	 * Identifier slug for where posts will be saved
	 */
	id: string;
	/**
	 * Give entry a more human friendly name
	 */
	name?: string;
	/**
	 * Define extra path segments when creating new posts
	 */
	path?: (
		string |
		((post: Pick<ContentPost<NoInfer<T>>, "slug" | "metadata">) => PromiseOrNot<string>)
	);
	/**
	 * Create validator for post
	 */
	validator?: (input: unknown) => PromiseOrNot<T>;
	/**
	 * Define flow for creating a new post - will revert to default process if not found
	 */
	onCreate?: PostCreationContext<T>;
	/**
	 * Define flow for editing an existing post
	 */
	onEdit?: PostEditContext<T>;
	/**
	 * Define flow for metadata and assets when defining posts
	 */
	onSync?: PostSyncContext<T>;
	/**
	 * Define shared metadata between posts
	 */
	metadata?: PostMetadataEntry<any>[];
}

export type PostMetadataEntry<T> = {
	/**
	 * Identifier for metadata used to create metadata files
	*/
	id: string;
	/**
	 * Validate the metadata with optional validation function
	 */
	validator?: (input: unknown) => PromiseOrNot<T>;
	/**
	 * Unique accessor to be used when deduping entries
	 */
	accessor?: (entry: NoInfer<T>) => string;
	/**
	 * Determine whether metadata is created within a external file or inlined in main posts file
	 */
	external?: boolean | string;
}

export type ContentPost<T> = {
	slug: string;
	path: string;
	post: string;
	createdAt: string;
	updatedAt?: string | null;
	publishedAt?: string | null;
	content?: string;
	metadata: T;
}

type PostContext<T> = { entry: PostEntry<T>; }

export type PostCreationContext<T> = (context: PostContext<T>) => PromiseOrNot<
	ArrayOrNot<{ slug: string; path?: string; metadata: T }>
>;

export type PostEditContext<T> = (
	context: PostContext<T> & { post: ContentPost<T> }
) => PromiseOrNot<
	{ slug: string; path?: string; metadata: T; }
>

export type PostSyncContext<T> = (
	context: PostContext<T> & { posts: ContentPost<T>[] }
) => PromiseOrNot<{
	metadata?: { [id: string]: unknown[]; };
}>;

export type ContentFile<T> = {
	entries: ContentPost<T>[];
	metadata: {
		[key: string]: unknown[];
	};
}

export type ExternalContentFile<T> = { entries: T[]; }
