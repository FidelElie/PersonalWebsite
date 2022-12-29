import { createNotionClient } from "@/library/integrations/notion";
import { EnvError } from "@/library/errors";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) { throw new EnvError("NOTION_API_KEY"); }

const NOTION_MUSIC_DATABASE = process.env.NOTION_MUSIC_DATABASE;
const NOTION_PROJECTS_DATABASE = process.env.NOTION_PROJECTS_DATABASE;
const NOTION_RECIPES_DATABASE = process.env.NOTION_RECIPES_DATABASE;
const NOTION_BLOG_DATABASE = process.env.NOTION_BLOG_DATABASE;

if (!NOTION_MUSIC_DATABASE) { throw new EnvError("NOTION_MUSIC_DATABASE"); }

if (!NOTION_PROJECTS_DATABASE) { throw new EnvError("NOTION_PROJECTS_DATABASE"); }

if (!NOTION_RECIPES_DATABASE) { throw new EnvError("NOTION_RECIPES_DATABASE"); }

if (!NOTION_BLOG_DATABASE) { throw new EnvError("NOTION_BLOG_DATABASE"); }

const notion = createNotionClient(NOTION_API_KEY, {
	music: NOTION_MUSIC_DATABASE,
	projects: NOTION_PROJECTS_DATABASE,
	recipes: NOTION_RECIPES_DATABASE,
	blog: NOTION_BLOG_DATABASE
});

export default notion;
