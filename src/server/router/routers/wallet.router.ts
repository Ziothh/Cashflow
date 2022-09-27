import { z } from "zod";
import { prisma } from "../../db/client";
import { createProtectedRouter, createRouter } from "../context";

const walletRouter = createProtectedRouter()
.query("getAll", {
    // input: z.object({
    //     userId: z.string()
    // }),
    async resolve({ctx,}) {
        return prisma.wallet.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        })
    }
})

export default walletRouter