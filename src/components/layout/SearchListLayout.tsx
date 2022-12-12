import SearchList, { SearchListProps } from "@ziothh/tailwindui-next/app/search/SearchList"
import { PropsWithChildren } from "react"

interface Props<T, G> {
    searchList: SearchListProps<T, G>
}


const SearchListLayout = <T, G = undefined>({
    searchList,
    children,
}: PropsWithChildren<Props<T, G>>) => {
    return (
        <div className="flex h-full bg-white">
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <div className="relative z-0 flex flex-1 overflow-hidden">
                    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                        {children}
                    </main>
                    <SearchList
                    {...searchList as Parameters<typeof SearchList>[0]}
                    />
                </div>
            </div>
        </div>
    )
}


export default SearchListLayout