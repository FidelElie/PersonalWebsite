import mongoose, { Schema, Types,  } from "mongoose";
import jwt from "jsonwebtoken";

import APP_CONFIG from "../../configs/environment";
import type { User } from "../types";

const SCHEMA_OPTIONS = { timestamps: true }

const UserSchema = new Schema<User>({
	forename: { type: String, trim: true, required: true },
	surname: { type: String, required: true },
	email: { type: String, trim: true, lowercase: true, required: true, unique: true, index: true },
	strategies: { password: { type: String }, code: { type: String } },
	confirmed: { type: Boolean, default: false },
	photo: { type: String, trim: true },
	role: { type: Schema.Types.ObjectId, ref: "role", default: null }
}, SCHEMA_OPTIONS);

class UserClass {
	_id: Types.ObjectId;
	email: string;
	forename: string;
	surname: string;

	get fullname() {
		return [
			this.forename,
			this.surname ? this.surname : ""
		]
		.filter(name => !!name)
		.join(" ");
	}

	createAccessToken() {
		const { _id, email } = this;
		try {
			return jwt.sign(
				{ user: { _id, email }},
				APP_CONFIG.secret,
				{ expiresIn: "1h" }
			)
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	createRefreshToken() {
		const { _id, email } = this;
		try {
			return jwt.sign(
				{ user: { _id, email } },
				APP_CONFIG.secret,
				{ expiresIn: "1d" }
			)
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

UserSchema.loadClass(UserClass);

export default mongoose.models.User || mongoose.model("User", UserSchema);
