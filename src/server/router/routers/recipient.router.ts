import { createProtectedRouter } from "../context";

const recipientRouter = createProtectedRouter()
.query("getAll", {
    async resolve({ctx}) {
        return ctx.prisma.recipient.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        })
    }
})  

export default recipientRouter