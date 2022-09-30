import { Transaction } from "@prisma/client";

export const AppRoutes = {
    DASHBOARD: "/dashboard",
    /** `/transactions` */
    TRANSACTIONS: (subrouteIdentifyer?: Transaction["id"] | "new") => `/transactions${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`
} as const 