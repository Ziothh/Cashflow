import { Category, Recipient, Transaction, Wallet, Wishlist, WishlistItem } from "@prisma/client";

export const AppRoutes = {
    DASHBOARD: "/dashboard",
    /** `/transactions` */
    TRANSACTIONS: (subrouteIdentifyer?: Transaction["id"] | "new") => `/transactions${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
    CATEGORIES: (subrouteIdentifyer?: Category["id"] | "new") => `/categories${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
    RECIPIENTS: (subrouteIdentifyer?: Recipient["id"] | "new") => `/recipients${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
    WALLETS: (subrouteIdentifyer?: Wallet["id"] | "new") => `/wallets${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
    WISHLISTS: (subrouteIdentifyer?: Wishlist["id"] | "new") => `/wishlists${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
    WISHLIST_ITEMS: (subrouteIdentifyer?: WishlistItem["id"] | "new") => `/wishlists/items${subrouteIdentifyer ? `/${subrouteIdentifyer}` : ""}`,
} as const 