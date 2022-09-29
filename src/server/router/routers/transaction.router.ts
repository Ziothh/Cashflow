import { z } from "zod";
import { prisma } from "../../db/client";
import { createProtectedRouter, createRouter } from "../context";

const transactionRouter = createProtectedRouter()
.query("getAll", {
    // input: z.object({
    //     userId: z.string()
    // }),
    async resolve({ctx,}) {
        return prisma.transaction.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        })
    }
})

export default transactionRouter