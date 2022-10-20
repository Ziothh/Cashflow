import { Wallet } from "@prisma/client"
import { FormikSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik"
import { createFormikSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik/Select.formik"
import { useGetAllWalletsQuery } from "../../../data/queries/wallets"
import WalletColorDot from "../../../features/wallets/WalletColorDot"

interface Props {
   name?: string 
}


const WalletSelect = createFormikSelect<Wallet["id"]>(() => {
    const {data: wallets} = useGetAllWalletsQuery(true)

    return {
        options: wallets!.map(r => r.id),
        optionParser(optionId) {
            const wallet = wallets!.find(w => w.id === optionId)!
            return {
                label: wallet.name,
                before: <WalletColorDot wallet={wallet} />, // TODO: image (see tailwindui comboboxes)
                after: undefined
            }
        },

    }
}, {
    label: "Wallet",
    placeholder: "No wallet",
    name: "walletId",
})

export default WalletSelect