import { BanknotesIcon, MagnifyingGlassIcon, TagIcon, WalletIcon } from "@heroicons/react/24/outline"
import { Category, Transaction, Wallet, Wishlist, WishlistItem } from "@prisma/client"
import CommandPalette, { createGroup, isOpenAtom, useCommandPalette } from "@ziothh/tailwindui-next/common/components/modals/CommandPalette"
import classNames from "classnames"
import { useAtom, useSetAtom } from "jotai"
import { FC, Suspense } from "react"
import { useQuery } from "../../../utils/trpc"

interface Props {
    
}

const AppCommandPalette: FC = () => {
    const wallets = useQuery(["wallet.getAll"], {
        suspense: true,
    })
    const transactions = useQuery(["transaction.getAll"], {
        suspense: true,
    })
    const wishlists = useQuery(["wishlist.getAll"], {
        suspense: true,
    })
    const wishlistItems = useQuery(["wishlistItem.getAll"], {
        suspense: true,
    })
    const categories = useQuery(["category.getAll"], {
        suspense: true,
    })

    const groups = [
        createGroup({
            allResults: wallets.data! ?? [] as Wallet[],
            filter: (p, s) => p.name.toLowerCase().includes(s),
            label: "Wallets",
            toCard: (r) => ({
                id: r.id,
                name: r.name,
                // href: r.url,
                icon: WalletIcon
            }),
            identifyer: "!",
            isLoading: wallets.isLoading
        }),
        createGroup({
            allResults: transactions.data! ?? [] as Transaction[],
            filter: (t, s) => t.name.toLowerCase().includes(s),
            label: "Transactions",
            toCard: (t) => ({
                id: t.id,
                name: t.name,
                // href: r.url,
                icon: BanknotesIcon
            }),
            identifyer: "$",
            isLoading: transactions.isLoading
        }),
        createGroup({
            allResults: wishlists.data! ?? [] as Wishlist[],
            filter: (t, s) => t.name.toLowerCase().includes(s),
            label: "Wishlists",
            toCard: (t) => ({
                id: t.id,
                name: t.name,
                // href: r.url,
                icon: BanknotesIcon
            }),
            identifyer: "**",
            isLoading: wishlists.isLoading,
        }),
        createGroup({
            allResults: wishlistItems.data! ?? [] as WishlistItem[],
            filter: (t, s) => t.name.toLowerCase().includes(s),
            label: "Wishlist items",
            toCard: (t) => ({
                id: t.id,
                name: t.name,
                // href: r.url,
                icon: BanknotesIcon
            }),
            identifyer: "*",
            isLoading: wishlistItems.isLoading,
        }),
        createGroup({
            allResults: categories.data! ?? [] as Category[],
            filter: (t, s) => t.name.toLowerCase().includes(s),
            label: "Categories",
            toCard: (t) => ({
                id: t.id,
                name: t.name,
                // href: r.url,
                icon: TagIcon
            }),
            identifyer: "@",
            isLoading: categories.isLoading,
        }),
    ] as unknown as ReturnType<typeof createGroup>[]
    
    return <CommandPalette groups={groups}/>
}


const SearchInput: React.FC<Props> = ({}) => {
    const setIsOpen = useSetAtom(isOpenAtom)

    return (
        <>
        <form className="flex w-full md:ml-0 cursor-pointer" action="#" method="GET" onClick={() => setIsOpen(true)}>
            <label htmlFor="search-field" className="sr-only">
            Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600 flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                    id="search-field"
                    name="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm
                    pointer-events-none
                    "
                    disabled
                    placeholder="Search transactions, wallets, ..."
                    type="search"
                />
                <kbd className={'mx-1 flex w-fit text-sm p-1 px-2 h-fit items-center whitespace-nowrap justify-center rounded border bg-white font-semibold sm:mx-2 border-gray-400 text-gray-900 hover:bg-gray-50'}>
                    Cmd + K
                </kbd>
            </div>
      </form>
      <Suspense>
        <AppCommandPalette/>
      </Suspense>
      </>
    )
}


export default SearchInput