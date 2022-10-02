import { useQuery } from "../../utils/trpc";

export const useGetAllWalletsQuery = () => useQuery(["wallet.getAll"])