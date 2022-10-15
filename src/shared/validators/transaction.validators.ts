import { TransactionType } from "@prisma/client";
import { z } from "zod";

const TRANSACTION_VALIDATORS = {
    id: () => z.string(),
    name: () => z.string(),
    amount: () => z.number(),
    type: () => z.enum<TransactionType, [TransactionType, ...TransactionType[]]>(Object.values(TransactionType) as any)
}

export const transactionUpdateValidator = () => z.object({
    id: TRANSACTION_VALIDATORS.id(),
    name: TRANSACTION_VALIDATORS.name(),
    amount: TRANSACTION_VALIDATORS.amount(),
    type: TRANSACTION_VALIDATORS.type(),
})