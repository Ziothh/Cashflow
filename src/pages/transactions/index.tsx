import Button from "@ziothh/tailwindui-next/common/components/Button"
import DefaultPageLayout from "../../components/layout/page/DefaultPageLayout"
import { AppRoutes } from "../../config/routes"
import TransactionsTable from "../../features/transactions/TransactionsTable"
import { useToastifyMutation } from "../../utils/toastify"
import { useMutation, useTrpcContext } from "../../utils/trpc"

/* This example requires Tailwind CSS v2.0+ */
const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]
  
interface Props {
    
}



const Page: React.FC<Props> = ({}) => {
    const {mutateAsync} = useMutation("transaction.sync.bank")
    const trpcCtx = useTrpcContext()

    return (
        <DefaultPageLayout
        title="Transactions"
        headerText="A list of all the transactions in your account."
        buttons={<>
        <Button size="md" theme="neutral" onClick={async () => {
            await mutateAsync()
            trpcCtx.invalidateQueries("transaction.getAll")
            trpcCtx.refetchQueries(["transaction.getAll"])
        }}>
            Sync with bank
        </Button>
        <Button size="md" href={AppRoutes.TRANSACTIONS("new")} >
            Add transaction
        </Button>
        </>}
        >
            <TransactionsTable/>
        </DefaultPageLayout>
    )
}


export default Page
  