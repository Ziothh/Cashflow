import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import CommandPalette, { useCommandPalette } from "@ziothh/tailwindui-next/common/components/modals/CommandPalette"
import classNames from "classnames"

interface Props {
    
}


const SearchInput: React.FC<Props> = ({}) => {
    const commandPalette = useCommandPalette()

    return (
        <>
        <form className="flex w-full md:ml-0 cursor-pointer" action="#" method="GET" onClick={() => commandPalette.setOpen(true)}>
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
      <CommandPalette/>
      </>
    )
}


export default SearchInput