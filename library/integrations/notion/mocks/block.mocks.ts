import { BlockObjectResponse } from "../notion.types";

export const ImageBlockMock = {
	object: "block",
	id: "d8d3427d-f45d-4f5e-9e82-8cd4e29d2613",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:03:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "image",
	image: {
		caption: [],
		type: "external",
		external: {
			"url": "https://images.unsplash.com/photo-1486622544617-1d8bf5f8b694?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb"
		}
	}
} as BlockObjectResponse;

export const HeadingOneBlockMock = {
	object: "block",
	id: "5024e313-4934-4d85-805a-fcde8f03a3bf",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:03:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "heading_1",
	heading_1: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Introduction",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Introduction",
				href: null
			}
		],
		is_toggleable: false,
		color: "default"
	}
} as BlockObjectResponse;

export const HeadingTwoBlockMock = {
	object: "block",
	id: "5024e313-4934-4d85-805a-fcde8f03a3bf",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:03:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "heading_2",
	heading_2: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Introduction",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Introduction",
				href: null
			}
		],
		is_toggleable: false,
		color: "default"
	}
} as BlockObjectResponse;

export const HeadingThreeBlockMock = {
	object: "block",
	id: "5024e313-4934-4d85-805a-fcde8f03a3bf",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:03:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "heading_3",
	heading_3: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Introduction",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Introduction",
				href: null
			}
		],
		is_toggleable: false,
		color: "default"
	}
} as BlockObjectResponse;

export const ParagraphBlockMock = {
	object: "block",
	id: "26395df4-cc69-4395-b250-8a6fa02e98a3",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2022-12-26T13:48:00.000Z",
	last_edited_time: "2022-12-27T18:16:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "paragraph",
	paragraph: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Easy, full of protein and so nice when paired with the right bread and accompaniments.",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Easy, full of protein and so nice when paired with the right bread and accompaniments.",
				href: null
			}
		],
		color: "default"
	}
} as BlockObjectResponse;

export const BulletedListItemBlockMock = {
	object: "block",
	id: "d8b593d5-f27d-4bc0-87fe-45beb839fcce",
	parent: {
		type: "page_id",
		page_id: "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:06:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "bulleted_list_item",
	bulleted_list_item: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Beef Mince - 500g, 20% Fat ",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Beef Mince - 500g, 20% Fat ",
				href: null
			}
		],
		color: "default"
	}
} as BlockObjectResponse;

export const NumberedListItemBlockMock = {
	object: "block",
	id: "c85be003-8c0a-436e-be29-59c67f358a10",
	parent: {
		type: "page_id",
		"page_id": "64e67dd1-8cf9-4688-84f4-aba1b559b586"
	},
	created_time: "2020-12-01T12:03:00.000Z",
	last_edited_time: "2020-12-01T12:09:00.000Z",
	created_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	last_edited_by: {
		object: "user",
		id: "902b2977-1e0e-41ac-b200-60d3cee12379"
	},
	has_children: false,
	archived: false,
	type: "numbered_list_item",
	numbered_list_item: {
		rich_text: [
			{
				type: "text",
				text: {
					content: "Start by heating your butter or oil in the frying pan on a medium heat. When the butter is bubbling or the spatula bubbles around the oil when placed in it.",
					link: null
				},
				annotations: {
					bold: false,
					italic: false,
					strikethrough: false,
					underline: false,
					code: false,
					color: "default"
				},
				plain_text: "Start by heating your butter or oil in the frying pan on a medium heat. When the butter is bubbling or the spatula bubbles around the oil when placed in it.",
				href: null
			}
		],
		color: "default"
	}
} as BlockObjectResponse;


