import { z } from "zod";
import { transactionUpdateValidator } from "../../../shared/validators";
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
.query("getSpentReport.minimal", {
    async resolve ({ctx}) {
        const dateOffset = new Date(Date.now())

        const currentMonth = dateOffset.getMonth()
        const currentYear = dateOffset.getFullYear()

        const offsetMonth = currentMonth - 2
        const offsetYear = offsetMonth < 1
        ? currentYear - 1
        : currentYear

        dateOffset.setFullYear(
            offsetYear,
            offsetMonth === 0
            ? 12
            : offsetMonth === -1
                ? 11
                : offsetMonth
        )


        const transactions = await ctx.prisma.transaction.findMany({
            where: {
                userId: ctx.session.user.id,
                date: {
                    gt: dateOffset,
                }
            }
        })

        const filtered =  transactions.reduce((acc, t) => {
            const isThisMonth = t.date.getFullYear() === currentYear && t.date.getMonth() === currentMonth

            return isThisMonth
            ? {
                ...acc,
                thisMonth: acc.thisMonth + t.amount,
            } : {
                ...acc,
                previousMonth: acc.previousMonth + t.amount,
            }
        }, {thisMonth: 0, previousMonth: 0})

        
        return {
            ...filtered,
            /** `(thisMonth / previousMonth) * 100`% */
            deltaPercentage: ((filtered.thisMonth / filtered.previousMonth) * 100)
        }
    }
})
.mutation("update", {
    input: transactionUpdateValidator(),
    async resolve({ctx, input, type}) {
        const {id, ...rest} = input
        return prisma.transaction.update({
            where: {id},
            data: {
                ...rest,
            }
        })
    }
})
.mutation("sync.bank", {
    async resolve() {
        await new Promise((res) => {
            setTimeout(() => {
                res("hi")
            }, 2000)
        })

        return false
    }
})

export default transactionRouter