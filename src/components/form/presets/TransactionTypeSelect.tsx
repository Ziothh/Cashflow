import { TransactionType } from "@prisma/client"
import FormikEnumSelect, { createFormikEnumSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik/EnumSelect.formik.tsx"

interface Props {
    name?: string
}


const TransactionTypeSelect = createFormikEnumSelect(TransactionType, {
    label: "Type",
    name: "type",
    nullable: false,
}) 



export default TransactionTypeSelect