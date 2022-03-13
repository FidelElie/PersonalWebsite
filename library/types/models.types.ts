import { Types } from "mongoose";

interface User {
	forename: string,
	surname: string,
	email: string,
	strategies: {
		password?: string,
		code?: string
	},
	confirmed: boolean,
	photo?: string,
	role: Types.ObjectId,
	fullname?: string // Virtual
}

export type {
	User
}
