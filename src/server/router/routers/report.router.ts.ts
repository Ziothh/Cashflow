import { BankAccount, Recipient, Transaction } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import NordigenClient from "nordigen-node";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../db/client";
import { createProtectedRouter } from "../context";


const tokenValidator = z.object({
    access: z.string(),
    refresh: z.string()
})

// const client = new NordigenClient({
//     secretId: env.NORDIGEN_ID,
//     secretKey: env.NORDIGEN_SECRET,
// })


const reportRouter = createProtectedRouter()
.query("income", {
    async resolve({ctx}) {
        const [last, previous] = await ctx.prisma.transaction.findMany({
            where: {
                userId: ctx.session.user.id,
                type: "INCOME"
            },
            take: 2,
            orderBy: {date: "desc"}
        })

        return {
            lastAmount: last?.amount ?? null,
            previousAmount: previous?.amount ?? null,
            deltaPercentage: (last && previous)
            ? ((last.amount / previous.amount) * 100)
            : 0
        }
    }
})

export default reportRouter