import { TransactionStatus, TransactionType } from "@prisma/client";
import { z } from "zod";
import { CATEGORY_VALIDATORS } from "./category.validators";
import { RECIPIENT_VALIDATORS } from "./recipient.validators";
import { RECURRING_TRANSACTION_VALIDATORS } from "./recurringTransaction.validators";
import { WALLET_VALIDATORS } from "./wallet.validators";

const TRANSACTION_VALIDATORS = {
    id: () => z.string(),
    name: () => z.string(),
    amount: () => z.number(),
    type: () => z.enum<TransactionType, [TransactionType, ...TransactionType[]]>(Object.values(TransactionType) as any),
    description: () => z.string().nullable(),
    additionalInformation: () => z.string().nullable(),
    date: () => z.date(),
    status: () => z.enum<TransactionStatus, [TransactionStatus, ...TransactionStatus[]]>(Object.values(TransactionStatus) as any),
    recipientId: () => RECIPIENT_VALIDATORS.id().nullable(),
    categoryId: () => CATEGORY_VALIDATORS.id().nullable(),
    queuedById: () => RECURRING_TRANSACTION_VALIDATORS.id().nullable(),
    walletId: WALLET_VALIDATORS.id,
}

export const transactionUpdateValidator = () => z.object({
    id: TRANSACTION_VALIDATORS.id(),
    name: TRANSACTION_VALIDATORS.name(),
    amount: TRANSACTION_VALIDATORS.amount(),
    type: TRANSACTION_VALIDATORS.type(),
    description: TRANSACTION_VALIDATORS.description(),
    additionalInformation: TRANSACTION_VALIDATORS.additionalInformation(),
    status: TRANSACTION_VALIDATORS.status(),
    date: TRANSACTION_VALIDATORS.date(),
    recipientId: TRANSACTION_VALIDATORS.recipientId(),
    categoryId: TRANSACTION_VALIDATORS.categoryId(),
    walletId: TRANSACTION_VALIDATORS.walletId(),
    queuedById: TRANSACTION_VALIDATORS.queuedById(),
})