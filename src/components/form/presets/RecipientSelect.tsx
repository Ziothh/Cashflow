import { Recipient } from "@prisma/client"
import { FormikSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik"
import { createFormikSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik/Select.formik"
import { useGetAllRecipientsQuery } from "../../../data/queries/recipients.query"
import { useGetAllWalletsQuery } from "../../../data/queries/wallets"
import WalletColorDot from "../../../features/wallets/WalletColorDot"

interface Props {
   name?: string 
   nullable?: boolean
}


// const RecipientSelect: React.FC<Props> = ({
//     name = "recipientId",
//     nullable = true,
// }) => {
//     const {data: recipients} = useGetAllRecipientsQuery(true)

//     return (
//         <FormikSelect
//         label="Recipient"
//         name={name}
//         nullable={nullable}
//         placeholder="No recipient"
//         // value={wallets.find(w => w.id === transaction.walletId)!}
//         options={recipients!.map(w => w.id)}
//         // onChange={nv => console.log(nv)}
//         optionParser={id => {
//             const recipient = recipients!.find(w => w.id === id)!

//             return {
//                 label: recipient.name ?? recipient.iban ?? recipient.userId!,
//                 before: undefined // TODO: image (see tailwindui comboboxes)
//             }
//         }}
//         />
//     )
// }

const RecipientSelect = createFormikSelect<Recipient["id"]>(() => {
    const {data: recipients} = useGetAllRecipientsQuery(true)

    return {
        options: recipients!.map(r => r.id),
        optionParser(option) {
            const recipient = recipients!.find(w => w.id === option)!

            return {
                label: recipient.name ?? recipient.iban ?? recipient.userId!,
                before: undefined, // TODO: image (see tailwindui comboboxes)
                after: undefined
            }
        },

    }
}, {
    label: "Recipients",
    placeholder: "No recipient",
    name: "recipientId",
})

export default RecipientSelect