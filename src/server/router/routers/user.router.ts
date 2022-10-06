import { createProtectedRouter } from "../context";

const userRouter = createProtectedRouter()
.query("getOne.full", {
    async resolve({ctx,}) {
        return ctx.prisma.user.findFirstOrThrow({
            where: {
                id: ctx.session.user.id,
            },
            include: {
                BankAccount: true,
            }
        })
    }
})

export default userRouter