import { z } from "zod";

import { registerModel } from "@/configs/firebase";

// Education
const EducationDetail = z.object({
	type: z.literal("education"),
	qualification: z.string(),
	organisation: z.string(),
	startDate: z.coerce.date().transform(date => date.toISOString()),
	endDate: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
});

type EducationDetail = z.infer<typeof EducationDetail>;

// Contact
const ContactDetail = z.object({
	type: z.literal("contact"),
	medium: z.enum(["phone", "linkedin", "instagram", "facebook", "github", "location"]),
	value: z.string()
});

type ContactDetail = z.infer<typeof ContactDetail>;

// Activities
const ActivityDetail = z.object({
	type: z.literal("activity")
});

type ActivityDetail =  z.infer<typeof ActivityDetail>;

// Languages
const LanguageDetail = z.object({
	type: z.literal("language"),
	proficiency: z.enum(["Native", "Fluent", "Basic"])
});

type LanguageDetail = z.infer<typeof LanguageDetail>;

// Interests
const InterestDetail = z.object({
	type: z.literal("interest"),
	detail: z.string()
});

type InterestDetail = z.infer<typeof InterestDetail>;

export const DetailSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
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

