import Link from "next/link";
import { type NextPage, type GetServerSideProps } from "next";
import dayjs from "dayjs";

import notion from "@/configs/notion";
import { getPropertyValue, type PageObjectResponse } from "@/library/integrations/notion";

import { Page, Navbar, Tag, Flex, Text, Box, Heading } from "@/components/core";

const RecipesPage: NextPage<RecipesProps> = ({ recipes }) => {
	const description = "All the recipes I can be bothered to remember and write about, in one easy to find place.";

	return (
		<Page
			title="Recipes"
			description={description}
			header={<Navbar/>}
			container
		>
			<Box className="grid gap-5 grid-cols-1 md:grid-cols-2">
				{
					recipes.map((recipe) => {
						return (
							<Link
								href={`/recipes/${recipe.slug}`}
								key={recipe.id}
								className="flex flex-col bg-tertiary bg-opacity-20 p-3 space-y-1 shadow-sm cursor-pointer hover:bg-opacity-40 transition-all duration-200"
							>
								<Heading level={3} className="text-white text-sm">
									{ recipe.name }
								</Heading>
								<Text className="text-xs text-tertiary font-light tracking-tighter">
									{dayjs(recipe.createdAt).format("DD/MM/YYYY")}
								</Text>
								<Flex className="gap-1" wrap>
									{ recipe.tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>) }
								</Flex>
								{ recipe.difficulty && <Tag bg="accent1">{recipe.difficulty}</Tag> }
							</Link>
						)
					})
				}
			</Box>
		</Page>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { results } = await notion.databases.recipes.query({
		page_size: 12,
		sorts: [{ timestamp: "created_time", direction: "ascending" }]
	});

	const recipes = (results as PageObjectResponse[]).map(recipe => {
		return {
			id: recipe.id,
			createdAt: recipe.created_time,
			name: getPropertyValue(recipe.properties.Name),
			tags: getPropertyValue(recipe.properties.Tags),
			difficulty: getPropertyValue(recipe.properties.Difficulty),
			slug: getPropertyValue(recipe.properties.Slug, recipe.id)
		}
	})

	return { props: { recipes: recipes } as RecipesProps }
}

interface RecipesProps {
	recipes: {
		id: string,
		createdAt: string,
		name: string,
		tags: { id: string, name: string, color: string }[],
		difficulty: string,
		slug: string
	}[]
}

export default RecipesPage;
