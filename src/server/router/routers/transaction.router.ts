import { z } from "zod";
import { prisma } from "../../db/client";
import { createProtectedRouter, createRouter } from "../context";

const transactionRouter = createProtectedRouter()
.query("getAll.paginated", {
    input: z.object({
        pagination: z.object({
            limit: z.number().optional(),
            page: z.number().optional(),
            count: z.boolean().optional()
        }),
        // userId: z.string()
    })
    .optional(),
    async resolve({ctx, input}) {
        return prisma.$transaction([
            prisma.transaction.findMany({
                where: {
                    userId: ctx.session.user.id,
                }, 
                take: input?.pagination?.limit,
                orderBy: {
                    date: "desc",
                },
                // cursor: {},
                skip: (input?.pagination?.limit && input?.pagination?.page) ? ((input.pagination.page - 1) * input.pagination.limit!) : undefined,
            }),
            prisma.transaction.count({
                where: {
                    userId: ctx.session.user.id,
                }
            })
        ])
    }
})
.query("getAll", {
    // input: z.object({
    //     pagination: z.object({
    //         limit: z.number(),
    //         page: z.number().optional(),
    //         count: z.boolean().optional()
    //     }).optional()
    //     // userId: z.string()
    // })
    // .optional(),
    async resolve({ctx, input}) {
        return prisma.transaction.findMany({
            where: {
                userId: ctx.session.user.id,
            }, 
            orderBy: {
                date: "desc",
            },
        })
    }
})
.query("getOne", {
    input: z.object({
        id: z.string()
    }),
    async resolve({input}) {
        return prisma.transaction.findFirstOrThrow({
            where: {
                id: input.id,
            }
        })
    }
})
.query("getOne.full", {
    input: z.object({
        id: z.string()
    }),
    async resolve({input}) {
        return prisma.transaction.findFirstOrThrow({
            where: {
                id: input.id,
            },
            include: {
                category: true,
                queuedBy: true,
                recipient: true,
                wallet: true,
            }
        })
    }
})

export default transactionRouter