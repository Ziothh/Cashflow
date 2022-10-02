import { BankAccount, Recipient, Transaction } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import NordigenClient from "nordigen-node";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../db/client";
import { createProtectedRouter } from "../context";


type TBankTransaction = {
    /** The id reference of the transaction */
    entryReference: string,
    /** Date string of the booking (as YYYY-MM-DD) */
    bookingDate: string,
    /** Date string of the value (as YYYY-MM-DD) */
    valueDate: string,
    transactionAmount: {
        /** The amount of the transaction (a number wrapped as a string: example: `"-1"`)*/
        amount: string,
        /** The currency of the transaction (example: `"EUR"`) */
        currency: string
    },

    // Possible names
    creditorName?: string,
    creditorAccount?: {
        iban: string,
    },
    debtorName?: string,
    debtorAccount?: {
        iban: string,
    },

    /** An array of comments */
    remittanceInformationUnstructuredArray: string[],
    /** A string of comma-seperated values */
    additionalInformation: string,
    bankTransactionCode: string

    purposeCode?: string,
}

const tokenValidator = z.object({
    access: z.string(),
    refresh: z.string()
})

// const client = new NordigenClient({
//     secretId: env.NORDIGEN_ID,
//     secretKey: env.NORDIGEN_SECRET,
// })

const BNP = {
    id: "BNP_BE_GEBABEBB"
}

type TInstitution = {
    "id": string,
    "name": string,
    "bic": string,
    "transaction_total_days": string,
    /** A list of all the country codes this institution is active in */
    countries: string[],
    /** Url to the banking logo */
    logo: string,
    "payments": false
}

// const BNP = (await client.institution.getInstitutions({
//     country: "BE"
// })).find((i: any) => i.id === "BNP_BE_GEBABEBB")

const bankingRouter = createProtectedRouter()
.query("login", {
    async resolve() {
        // return await client.generateToken() as Promise<{
        //     access: string
        //     refresh: string
        // }>

    }
})
.middleware(async ({ ctx, next, path, rawInput, meta }) => {
    // if (!ctx.session || !ctx.session.user) {
    //     throw new TRPCError({ code: "UNAUTHORIZED" });
    // }

    // if (!(rawInput as any)?.tokens?.access) throw new TRPCError({ code: "UNAUTHORIZED" });
    
    // client.token = (rawInput as any).tokens.access as string

    const bankAccount: BankAccount | null = await prisma.bankAccount.findFirst({
        where: {
            userId: ctx.session.user.id,
        }
    })

    if (bankAccount === null) {
        throw new TRPCError({ code: "UNAUTHORIZED", cause: "bankAccount couldn't be found" });
    }

    if (bankAccount.accessToken === null) {
        throw new TRPCError({ code: "UNAUTHORIZED", cause: "bankAccount.accessToken is null" });
    }
    if (bankAccount.requisitionId === null) {
        throw new TRPCError({ code: "UNAUTHORIZED", cause: "bankAccount.requisitionId is null" });
    }

    const client = new NordigenClient({
        secretId: env.NORDIGEN_ID,
        secretKey: env.NORDIGEN_SECRET,
    })

    client.token = bankAccount.accessToken!


    // const requisitionData = await client.requisition.getRequisitionById(bankAccount.requisitionId);

    // client.requisition.

    return next({
      ctx: {
        ...ctx,
        banking: {
            client,
            account: client.account(bankAccount.id),
            // requisitionData
        },
        // infers that `session` is non-nullable to downstream resolvers
        // session: { ...ctx.session, user: ctx.session.user },
      },
    });
})
.query("createSession", {
    input: z.object({
        tokens: tokenValidator,
    }),
    async resolve() {
        // return {
        //     session: (await client.initSession({
        //         redirectUrl: "http://localhost:3001/banking",
        //         institutionId: BNP.id,
        //         referenceId: randomUUID()
        //     })) as {
        //         "id": string,
        //         "created": string,
        //         "redirect": string,
        //         "status": string,
        //         "institution_id": string,
        //         "agreement": string,
        //         "reference": string,
        //         "accounts": string[],
        //         "link": string,
        //         "ssn": null,
        //         "account_selection": false,
        //         "redirect_immediate": false
        //     }
    
        // }
    }
})
.query("test", {
    // input: z.object({
    //     tokens: tokenValidator,
    //     requisitionId: z.string()
    // }),
    async resolve({ctx, input, }) {
        return false // ! already synced !

        const transactions = (await ctx.banking.account.getTransactions()).transactions as {
            "booked": TBankTransaction[],
            "pending": TBankTransaction[],
        }

        
        // const dbTransactions = prisma.transaction.createMany({
        //     data: []
        // })

        const failedTransactions: TBankTransaction[] = []
        const successFullTransactions: Transaction[] = []

        for (const t of transactions.booked) {
            try {
                const recipientData = (t.creditorName !== undefined && t.creditorAccount !== undefined)
                ? {
                    name: t.creditorName,
                    iban: t.creditorAccount!.iban
                }
                : (t.debtorName !== undefined && t.debtorAccount !== undefined)
                    ? {
                        name: t.debtorName,
                        iban: t.debtorAccount!.iban
                    }
                    : null

                // const recipient = prisma.recipient.

                let recipient: Recipient | null = null;

                if (recipientData?.iban) {
                    const foundRecipient = await prisma.recipient.findFirst({
                        where: {
                            iban: recipientData.iban,
                        }
                    })

                    recipient = foundRecipient

                    if (!foundRecipient) {
                        recipient = await prisma.recipient.create({
                            data: {
                                iban: recipientData.iban,
                                name: recipientData.name,
                            }
                        })
                    }
                }



                const amount = parseFloat(t.transactionAmount.amount)

                const newT = await prisma.transaction.create({
                    data: {
                        amount,
                        name: t.remittanceInformationUnstructuredArray?.[0] ?? (
                            recipientData !== null
                            ?  `Payment ${amount > 0 ? "from" : "to"} ${recipientData!.name}`
                            : "Unknown payment"
                        ),
                        date: new Date(t.bookingDate),
                        referenceId: t.entryReference,
                        status: "SUCCESS",
                        walletId: "cl8rlspa80000xrrbaj8kf3l2",
                        userId: ctx.session.user.id,
                        description: t.remittanceInformationUnstructuredArray?.join("\n"),
                        type: recipientData?.name === "DIGITAL ASTRONAUT" ? "INCOME" : "PAYMENT",
                        recipientId: recipient ? recipient.id : undefined,
                        additionalInformation: t.additionalInformation || undefined,
                    }
                })

                if (!newT.recipientId) {
                    console.log({
                        apiData: t,
                        dbData: newT
                    })
                }

                successFullTransactions.push(
                    newT
                )
            } catch (e) {
                console.error(e)

                failedTransactions.push(t)
            }
        }

        // // Get account id after completed authorization with a bank
        // const requisitionData = await client.requisition.getRequisitionById(input.requisitionId);
        // // Get account id from the list
        // const accountId = requisitionData.accounts[0];

        // // Instantiate account object
        // const account = client.account(accountId)

        // // Fetch account metadata
        // const metadata = await account.getMetadata();
        // // Fetch account balances
        // const balances = await account.getBalances();
        // // Fetch account details
        // const details = await account.getDetails();
        // // Fetch account transactions
        // const transactions = await account.getTransactions();

        // return {
        //     account: {
        //         metadata,
        //         balances,
        //         details,
        //         transactions,
        //     }
        // };

        return {
            failedTransactions,
            successFullTransactions,
            transactions,
        }
    }
})


export default bankingRouter