import { z } from "zod";

export const CATEGORY_VALIDATORS = {
    id: () => z.string()
} as const