import { z } from "zod";

export const WALLET_VALIDATORS = {
    id: () => z.string()
} as const