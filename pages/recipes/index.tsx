import Link from "next/link";
import { type NextPage, type GetServerSideProps } from "next";
import dayjs from "dayjs";

import notion from "@/configs/notion";
import { getPropertyValue, type PageObjectResponse } from "@/library/integrations/notion";

import { Page, Navbar, Tag, Flex, Text, Box, Heading, Icon } from "@/components/core";

const description = "All the recipes I can be bothered to remember and write about, in one easy to find place.";

const RecipesPage: NextPage<RecipesProps> = ({ recipes }) => {
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
								<Heading level={3} className="text-white text-base tracking-tighter">
									{ recipe.name }
								</Heading>
								{/* {
									recipe.image && (
										<img
											src={recipe.image}
											// className
										/>
									)
								} */}
								{/* {
									recipe.description && (
										<Text className="text-white text-sm opacity-70">{recipe.description}</Text>
									)
								} */}
								<Flex align="center">
									<Icon name="calendar" className="mr-2 text-tertiary" />
									<Text as="span" className="text-white text-xs">
										{dayjs(recipe.createdAt).format("DD/MM/YYYY")}
									</Text>
								</Flex>
								<Flex align="center">
									<Icon name="tag" className="mr-2 text-tertiary" />
									<Flex className="gap-1" wrap>
										{ recipe.tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>) }
									</Flex>
								</Flex>

								{
									recipe.difficulty && (
										<Flex align="center">
											<Icon name="chart-bar" className="mr-2 text-tertiary"/>
											<Tag bg="accent1">{recipe.difficulty}</Tag>
										</Flex>
									)
								}
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
		console.log(recipe.properties);
		return {
			id: recipe.id,
			createdAt: recipe.created_time,
			name: getPropertyValue(recipe.properties.Name),
			image: getPropertyValue(recipe.properties.Image, null),
			tags: getPropertyValue(recipe.properties.Tags),
			difficulty: getPropertyValue(recipe.properties.Difficulty),
			slug: getPropertyValue(recipe.properties.Slug, recipe.id),
			description: getPropertyValue(recipe.properties.Description, null)
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
		image: string | null,
		description: string | null,
		slug: string
	}[]
}

export default RecipesPage;
