import type { CompileOptions } from "@mdx-js/mdx";

import type { GenericObject, PromiseOrNot } from "@/libraries/types";

export type ContentConfig<Schema extends PostSchema = unknown> = {
	/** Enable debug flag to provide verbose logging */
	debug?: boolean;
	/** Define multiple post entries for your project */
	entries: PostEntry<Schema>[];
	/** Configuration for posts */
	posts?: {
		/** Directory where posts are located - relative to root */
		postsDir?: string;
		/** Whether meta files should be created */
		emitMetadata?: boolean;
		/** Locate metadata directory will override collocation */
		metadataDir?: string | null;
		/** What format should metadata files be outputted in */
		metadataFormat?: "js" | "ts" | "json";
	};
	/** Control build command settings */
	build?: {
		/** Include content strings in metadata build output */
		includeContent?: boolean;
	};
	/** Configure markdown settings */
	markdown?: {
		/** Choose markdown type */
		type: "md" | "mdx";
		/** Register plugins to control markdown */
		plugins?: {
			remarkPlugins?: CompileOptions["remarkPlugins"];
			rehypePlugins?: CompileOptions["rehypePlugins"];
		}
	};
}

export type PostEntry<Schema extends PostSchema = unknown> = {
	/** Identifier slug for where posts will be saved  */
	id: string;
	/** Give entry a more human friendly name */
	name?: string;
	/** Define extra path segments when creating new posts */
	path?: string;
	/** Define flow for creating a new post - will revert to default process if not found */
	onCreate?: (context: PostContext<NoInfer<Schema>>) => PromiseOrNot<void>;
	// TODO add on edit callback
	// onEdit?: (context: PostContext) => PromiseOrNot<void>;
	validator?: (input: unknown) => Schema extends GenericObject ? GenericObject : unknown;
	/** Define shared metadata between posts */
	metadata?: MetadataEntry<Schema>[];
};

export type MetadataEntry<Schema extends PostSchema = unknown> = {
	id: string;
	onUpdate?: (entries: MetaPostEntry<Schema>[]) => PromiseOrNot<void>;
}

export type PostContext<Schema extends PostSchema = unknown> = {
	config: ContentConfig<Schema>;
	entry: PostEntry<Schema>;
};

export type PostEntryFields = { slug: string; path: string; }

export type MetaPostEntry<Schema extends PostSchema = unknown> = PostEntryFields & {
	metadata: Schema;
	content: string;
}

export type PostSchema = GenericObject | unknown;
