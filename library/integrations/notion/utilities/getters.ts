import type { PageObjectResponse } from "../notion.types";

export const getPropertyValue = <ValueFallback extends any>(
	property: PageObjectResponse["properties"][number],
	fallback?: ValueFallback
) => {
	switch (property.type) {
		case "title":
			return (
				(property.title && property.title.length) ? property.title : [{ plain_text: fallback }])[0].plain_text;
		case "rich_text":
			return (
				property.rich_text && property.rich_text.length ? property.rich_text : [{ plain_text: fallback }]
			)[0].plain_text;
		case "select":
			return property.select ? property.select.name : fallback;
		case "multi_select":
			return property.multi_select;
		// case "files":
		// 	return property.files && property.files.length ? property.files : [{ }]
		default:
			return property.toString();
	}
}
