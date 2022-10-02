// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";
import bankingRouter from "./routers/banking.router";
import categoryRouter from "./routers/category.router";

import transactionRouter from "./routers/transaction.router";
import walletRouter from "./routers/wallet.router";
import wishlistRouter from "./routers/wishlist.router";
import wishlistItemRouter from "./routers/wishlistItem.router";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("transaction.", transactionRouter)
    .merge("wallet.", walletRouter)
    .merge("wishlist.", wishlistRouter)
    .merge("wishlistItem.", wishlistItemRouter)
    .merge("category.", categoryRouter)
    .merge("banking.", bankingRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
