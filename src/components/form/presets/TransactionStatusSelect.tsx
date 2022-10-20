import { TransactionStatus } from "@prisma/client"
import FormikEnumSelect, { createFormikEnumSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik/EnumSelect.formik.tsx"

interface Props {
   name?: string 
}


// const TransactionStatusSelect: React.FC<Props> = ({
//     name = "status"
// }) => {
//     return (
//         <FormikEnumSelect
//         label="Status"
//         name={name}
//         enum={TransactionStatus}
//         /> 
//     )
// }

const TransactionStatusSelect = createFormikEnumSelect(TransactionStatus, {
    label: "Status",
    name: "status",
    nullable: false,
}) 


export default TransactionStatusSelect