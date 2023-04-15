import { z } from "zod";

import { Model } from "./model";

const BaseInfo = Model.merge(z.object({
	title: z.string(),
	description: z.string().optional(),
	order: z.number()
}));

// Education
export const EducationInfo = BaseInfo.merge(z.object({
	type: z.enum(["education"]),
	qualification: z.string(),
	organisation: z.string(),
	startDate: z.coerce.date().transform(date => date.toISOString()),
	endDate: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
}));

export type EducationInfo = z.infer<typeof EducationInfo>;

// Contact
export const ContactInfo = BaseInfo.merge(z.object({
	type: z.enum(["contact"]),
	icon: z.string().optional(),
	link: z.string().optional(),
	phone: z.string(),
	email: z.string()
}));

export type ContactInfo = z.infer<typeof ContactInfo>;

// Activities
export const ActivityInfo = BaseInfo.merge(z.object({
	type: z.enum(["activity"])
}));

export type ActivityInfo =  z.infer<typeof ActivityInfo>;

// Languages
export const LanguageInfo = BaseInfo.merge(z.object({
	type: z.enum(["language"]),
	proficiency: z.enum(["Native", "Fluent", "Basic"])
}));

export type LanguageInfo = z.infer<typeof LanguageInfo>;

// Interests
export const InterestInfo = BaseInfo.merge(z.object({
	type: z.enum(["interest"]),
	detail: z.string()
}));

export type InterestInfo = z.infer<typeof InterestInfo>;

// Generic Info
export const Info = z.union([
	EducationInfo,
	ContactInfo,
	ActivityInfo,
	LanguageInfo,
	InterestInfo
]);

export type Info = z.infer<typeof Info>;
