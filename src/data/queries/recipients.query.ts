import { useQuery } from "../../utils/trpc";

export const useGetAllRecipientsQuery = (suspense = false) => useQuery(["recipient.getAll"], {
    suspense,
})
