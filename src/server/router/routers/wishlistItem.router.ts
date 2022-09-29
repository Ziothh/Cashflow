import { z } from "zod";
import { prisma } from "../../db/client";
import { createProtectedRouter, createRouter } from "../context";

const wishlistItemRouter = createProtectedRouter()
.query("getAll", {
    // input: z.object({
    //     userId: z.string()
    // }),
    async resolve({ctx,}) {
        return prisma.wishlistItem.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        })
    }
})

export default wishlistItemRouter