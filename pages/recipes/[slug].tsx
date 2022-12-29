import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import dayjs from "dayjs";

import notion from "@/configs/notion";
import {
	parseNotionBlocks,
	getPropertyValue,
	type PageObjectResponse,
	BlockObjectResponse
} from "@/library/integrations/notion";

import { Navbar, Page, Icon, Link, Text, Box, Flex, Heading, Tag } from "@/components/core";
import { Content } from "@/components/interfaces";

const RecipePage: NextPage<RecipeWithContent> = (props) => {
	const { name, createdAt, tags, description, difficulty, content } = props;

	return (
		<Page
			title={name}
			description={description}
			header={<Navbar/>}
			container
			index
			follow
		>
			<Link href="/recipes" className="inline-flex items-center group">
				<Icon name="arrow-left" className="mr-1 text-white text-lg"/>
				<Text as="span" className="text-white text-sm">Recipes</Text>
			</Link>
			<Box as="article">
				<Box.Section className="space-y-2">
					<Heading className="font-bold text-white text-3xl tracking-tighter md:text-4xl">
						{name}
					</Heading>
					<Flex>
						<Icon name="calendar" className="mr-2 text-tertiary" />
						<Text as="span" className="text-white text-xs md:text-sm">
							{dayjs(createdAt).format("MMMM YYYY")}
						</Text>
					</Flex>
					<Flex align="center">
						<Icon name="tag" className="mr-2 text-tertiary" />
						<Flex className="gap-1" wrap>
							{ tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>) }
						</Flex>
					</Flex>
					{ difficulty && (
						<Flex align="center">
							<Icon name="chart-bar" className="mr-2 text-tertiary"/>
							<Tag bg="accent1">{difficulty}</Tag>
						</Flex>
					) }
				</Box.Section>
				<hr className="mt-5 mb-4"></hr>
				<Content nodes={parseNotionBlocks(content)}/>
			</Box>
		</Page>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { results } = await notion.databases.recipes.query();


	return {
		paths: (results as PageObjectResponse[]).map(recipe => ({
			params: {
				slug: getPropertyValue(recipe.properties.Slug, recipe.id) as string
			}
		})),
		fallback: "blocking"
	}
}

export const getStaticProps: GetStaticProps<RecipeWithContent> = async (context) => {
	const { slug } = context.params as { slug: string };

	const transformRecipe = async (recipe: PageObjectResponse): Promise<RecipeWithContent> => {
		const contentResponse = await notion.blocks.children(recipe.id);

		return {
			id: recipe.id,
			createdAt: recipe.created_time,
			name: getPropertyValue(recipe.properties.Name) as string,
			description: getPropertyValue(recipe.properties.Description, null) as string,
			tags: getPropertyValue(recipe.properties.Tags, []) as { id: string, name: string }[],
			difficulty: getPropertyValue(recipe.properties.Difficulty) as string,
			content: contentResponse.results as BlockObjectResponse[]
		}
	}

	const slugResponse = await notion.databases.recipes.query({
		filter: { property: "Slug", rich_text: { equals: slug } }
	});

	if (!slugResponse.results.length) { return { notFound: true } }

	const recipeWithContent = await transformRecipe(slugResponse.results[0] as PageObjectResponse);

	return { props: recipeWithContent }
}

interface RecipeWithContent {
	id: string,
	createdAt: string,
	name: string,
	description?: string,
	tags: { id: string, name: string }[],
	difficulty: string,
	content: BlockObjectResponse[]
}

export default RecipePage;
