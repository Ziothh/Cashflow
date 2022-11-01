import { z } from "zod";

export const RECIPIENT_VALIDATORS = {
    id: () => z.string()
} as const