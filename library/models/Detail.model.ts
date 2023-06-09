import { z } from "zod";

import { registerModel, timestamp } from "@/configs/firebase";

export const DETAIL_TYPES = [
	"education", "contact", "activity", "language", "interest"
] as const;

// Education
export const EducationDetailSchema = z.object({
	type: z.literal(DETAIL_TYPES[0]),
	qualification: z.string(),
	organisation: z.string(),
	startDate: timestamp(),
	endDate: timestamp().nullable().optional()
});

export type EducationDetailSchema = z.infer<typeof EducationDetailSchema>;

// Contact
export const CONTACT_MEDIUMS = [
	"phone", "linkedin", "instagram", "facebook", "github", "location", "email"
] as const;

export const ContactDetailSchema = z.object({
	type: z.literal(DETAIL_TYPES[1]),
	medium: z.enum(CONTACT_MEDIUMS),
	value: z.string()
});

export type ContactDetailSchema = z.infer<typeof ContactDetailSchema>;

// Activities
export const ActivityDetailSchema = z.object({
	type: z.literal(DETAIL_TYPES[2]),
	detail: z.string()
});

export type ActivityDetailSchema =  z.infer<typeof ActivityDetailSchema>;

// Languages
export const LanguageProficiencies = ["Native", "Fluent", "Basic"] as const;

export const LanguageDetailSchema = z.object({
	type: z.literal(DETAIL_TYPES[3]),
	proficiency: z.enum(LanguageProficiencies)
});

export type LanguageDetailSchema = z.infer<typeof LanguageDetailSchema>;

// Interests
export const InterestDetailSchema = z.object({
	type: z.literal(DETAIL_TYPES[4]),
	detail: z.string()
});

export type InterestDetailSchema = z.infer<typeof InterestDetailSchema>;

const DetailSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	data: z.discriminatedUnion("type", [
		EducationDetailSchema,
		ContactDetailSchema,
		ActivityDetailSchema,
		LanguageDetailSchema,
		InterestDetailSchema
	])
});

export const Detail = registerModel("details", DetailSchema);

export type DetailSchema = z.infer<typeof Detail.schema>;
export type DetailModel = z.infer<typeof Detail.model>;

