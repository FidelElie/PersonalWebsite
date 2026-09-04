import { format } from "date-fns";

import { toTimestamp } from "./toTimestamp";

	export const formatDate = (payload: { seconds: number; nanoseconds: number }) => {
		const timestamp = toTimestamp(payload);

		return format(timestamp.toDate(), "MMM yyyy");
	}
