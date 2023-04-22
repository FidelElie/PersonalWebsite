import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const DetailTypes = [
	"education", "contact", "activity", "language", "interest"
] as const;

// Education
const EducationDetail = z.object({
	type: z.literal(DetailTypes[0]),
	qualification: z.string(),
	organisation: z.string(),
	startDate: z.coerce.date().transform(date => date.toISOString()),
	endDate: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
});

type EducationDetail = z.infer<typeof EducationDetail>;

// Contact
export const ContactMediums = [
	"phone", "linkedin", "instagram", "facebook", "github", "location", "email"
] as const;

const ContactDetail = z.object({
	type: z.literal(DetailTypes[1]),
	medium: z.enum(ContactMediums),
	value: z.string()
});

type ContactDetail = z.infer<typeof ContactDetail>;

// Activities
const ActivityDetail = z.object({
	type: z.literal(DetailTypes[2]),
	detail: z.string()
});

type ActivityDetail =  z.infer<typeof ActivityDetail>;

// Languages
export const LanguageProficiencies = ["Native", "Fluent", "Basic"] as const;

const LanguageDetail = z.object({
	type: z.literal(DetailTypes[3]),
	proficiency: z.enum(LanguageProficiencies)
});

type LanguageDetail = z.infer<typeof LanguageDetail>;

// Interests
const InterestDetail = z.object({
	type: z.literal(DetailTypes[4]),
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

