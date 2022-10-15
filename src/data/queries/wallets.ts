import { useQuery } from "../../utils/trpc";

export const useGetAllWalletsQuery = (suspense = false) => useQuery(["wallet.getAll"], {
    suspense,
})