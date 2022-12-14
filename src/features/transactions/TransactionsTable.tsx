import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { TransactionStatus } from "@prisma/client"
import classNames from "classnames"
import { useState } from "react"
import { AppRoutes } from "../../config/routes"
import { useGetAllWalletsQuery } from "../../data/queries/wallets"
import { useQuery } from "../../utils/trpc"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useGetAllRecipientsQuery } from "../../data/queries/recipients.query"

// const transactions = [
//     {
//       id: 1,
//       name: 'Payment to Molly Sanders',
//       href: '#',
//       amount: '$20,000',
//       currency: 'USD',
//       status: 'success',
//       date: 'July 11, 2020',
//       datetime: '2020-07-11',
//     },
//     // More transactions...
// ]

const statusStyles: {[key in TransactionStatus]: string} = {
SUCCESS: 'bg-green-100 text-green-800',
PENDING: 'bg-yellow-100 text-yellow-800',
// failed: 'bg-gray-100 text-gray-800',
}

interface Props {
    limit?: number
}


const TransactionsTable: React.FC<Props> = ({
    limit,
}) => {
    const [page, setPage] = useState(1)

    const {
        data,
        isLoading: transactionsLoading
    } = useQuery(["transaction.getAll.paginated", {
        pagination: {
            limit,
            page,
            // limit: 10,
            count: true,
        },
    }], {keepPreviousData: true,})

    const {data: wallets, isLoading: walletsLoading} = useGetAllWalletsQuery()
    const {data: recipients, isLoading: recipientLoading} = useGetAllRecipientsQuery()


    const transactions = data?.[0] ?? []
    const count = data?.[1] ?? 0

    const isLoading = transactionsLoading || walletsLoading || recipientLoading


    return (<>
        {/* Activity list (smallest breakpoint only) */}
        <div className="shadow sm:hidden rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                {isLoading 
                ? (
                    "Loading..."
                ) 
                : transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <a href={AppRoutes.TRANSACTIONS(transaction.id)} className="block bg-white px-4 py-4 hover:bg-gray-50">
                            <span className="flex items-center space-x-4">
                                <span className="flex flex-1 space-x-2 truncate">
                                <BanknotesIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="flex flex-col truncate text-sm text-gray-500">
                                    <span className="truncate">{transaction.name}</span>
                                    <span className={transaction.amount >= 0 ? "text-green-500" : "text-red-500"}>
                                        $ <span className={`font-medium`}>{Math.abs(transaction.amount).toFixed(2)}</span>
                                    </span>
                                    <time dateTime={transaction.createdAt.toLocaleDateString()}>{transaction.createdAt.toLocaleDateString()}</time>
                                </span>
                                </span>
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                aria-label="Pagination"
            >
                <div className="flex flex-1 justify-between">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                    Next
                </a>
                </div>
            </nav>
        </div>

        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
            <div className="">
                <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Transaction
                                </th>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Amount
                                </th>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Recipient
                                </th>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Category
                                </th>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Wallet
                                </th>
                                <th
                                    className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                                    scope="col"
                                >
                                    Status
                                </th>
                                <th
                                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {!data 
                            ? (
                                null
                            ) : transactions.map((transaction) => (
                                <tr key={transaction.id} className="bg-white hover:bg-gray-50">
                                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                        <div className="flex">
                                            <a href={AppRoutes.TRANSACTIONS(transaction.id)} className="group inline-flex space-x-2 truncate text-sm">
                                            <BanknotesIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                                                {transaction.name}
                                            </p>
                                            </a>
                                        </div>
                                    </td>
                                    <td className={`whitespace-nowrap px-6 py-4 text-right text-sm ${transaction.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
                                        $<span className="font-medium">{Math.abs(transaction.amount).toFixed(2)}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 truncate max-w-[150px]">
                                        <span>
                                            {recipients?.find(r => transaction.recipientId === r.id)?.name ?? "None"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                        <span>
                                            {transaction.categoryId ?? "None"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                        <span
                                            style={{
                                                backgroundColor: wallets!.find(w => w.id === transaction.walletId)!.color,
                                            }}
                                            className={classNames(
                                            "text-white",
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                            )}
                                        >
                                            {wallets!.find(w => w.id === transaction.walletId)!.name}
                                        </span>
                                    </td>
                                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                        <span
                                            className={classNames(
                                            statusStyles[transaction.status],
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                            )}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                        <time dateTime={(transaction.date ?? transaction.createdAt).toLocaleDateString()}>{(transaction.date ?? transaction.createdAt).toLocaleDateString()}</time>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        {/* Pagination */}
                        <nav
                        className="w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                        aria-label="Pagination"
                        >
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                Showing {limit ? (<><span className="font-medium">{(limit * (page - 1)) + 1}</span> to <span className="font-medium">{Math.min(limit * page, count!)}</span> of{' '}</>) : <span>all </span>}
                                <span className="font-medium">{count}</span> results
                                </p>
                            </div>
                            {limit && (
                                <div className="flex flex-1 justify-between sm:justify-end">
                                    <button
                                    disabled={page <= 1}
                                    onClick={() => setPage(prev => prev - 1)}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity"
                                    >
                                        Previous
                                    </button>
                                    <button
                                    disabled={count === undefined || (limit * page) >= count}
                                    onClick={() => setPage(prev => prev + 1)}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default TransactionsTable