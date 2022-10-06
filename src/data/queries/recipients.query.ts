import { useQuery } from "../../utils/trpc";

export const useGetAllRecipientsQuery = () => useQuery(["recipient.getAll"])
