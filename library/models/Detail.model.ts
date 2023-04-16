import { z } from "zod";

import { registerModel } from "@/configs/firebase";

const BaseInfo = z.object({
	title: z.string(),
	description: z.string().optional(),
	order: z.number()
});

// Education
export const EducationDetail = BaseInfo.merge(z.object({
	type: z.literal("education"),
	qualification: z.string(),
	organisation: z.string(),
	startDate: z.coerce.date().transform(date => date.toISOString()),
	endDate: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
}));

export type EducationDetail = z.infer<typeof EducationDetail>;

// Contact
export const ContactDetail = BaseInfo.merge(z.object({
	type: z.literal("contact"),
	icon: z.string().optional(),
	link: z.string().optional(),
	phone: z.string(),
	email: z.string()
}));

export type ContactDetail = z.infer<typeof ContactDetail>;

// Activities
export const ActivityDetail = BaseInfo.merge(z.object({
	type: z.literal("activity")
}));

export type ActivityDetail =  z.infer<typeof ActivityDetail>;

// Languages
export const LanguageDetail = BaseInfo.merge(z.object({
	type: z.literal("language"),
	proficiency: z.enum(["Native", "Fluent", "Basic"])
}));

export type LanguageDetail = z.infer<typeof LanguageDetail>;

// Interests
export const InterestDetail = BaseInfo.merge(z.object({
	type: z.literal("interest"),
	detail: z.string()
}));

export type InterestDetail = z.infer<typeof InterestDetail>;

const DetailSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	order: z.number(),
	data: z.union([
		EducationDetail,
		ContactDetail,
		ActivityDetail,
		LanguageDetail,
		InterestDetail
	])
});

export type DetailSchema = z.infer<typeof DetailSchema>;

export const Detail = registerModel("details", DetailSchema);

