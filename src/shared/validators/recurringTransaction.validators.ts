import { z } from "zod";

export const RECURRING_TRANSACTION_VALIDATORS = {
    id: () => z.string()
} as const