import { useQuery } from "@tanstack/react-query";
import { Detail } from "../models";

export const useFetchDetails = () => useQuery({
	queryKey: ["details"],
	queryFn: async () => {
		return await Detail.find();
	}
})
