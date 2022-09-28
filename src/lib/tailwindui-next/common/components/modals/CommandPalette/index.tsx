import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon, WalletIcon } from '@heroicons/react/24/outline'
import { Wallet } from '@prisma/client'
import { GetProps } from '@ziothh/tailwindui-next/common/utils/typescript'
import classNames from 'classnames'
import { atom, useAtom } from "jotai"
import { FC, Fragment, Key, useDeferredValue, useMemo, useState } from 'react'
import { useQuery } from '../../../../../../utils/trpc'

const commandPaletteAtom = atom({
    open: true,
})

export const useCommandPalette = () => {
    const [value, setValue] = useAtom(commandPaletteAtom)

    return {
        isOpen: value.open,
        setOpen: (value: boolean) => setValue(prev => ({...prev, open: value})),
    }
}

const projects = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', category: 'Projects', url: '#' },
  // More projects...
]

const users = [
  {
    id: 1,
    name: 'Leslie Alexander',
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More users...
]

interface IResultGroupProps<T, > {
    label: string
    results: T[]
    toCard: (result: T) => {
        id: Key, 
        name: string, 
        icon?: FC<{className: string}>
        href?: string
        action?: () => void
    }
    combobox: typeof Combobox
}

const ResultsGroup = <T extends any>({
    label,
    results,
    toCard,
    combobox,
}: IResultGroupProps<T>): JSX.Element | null => {
    if (results.length === 0) return null

    return (
        <li>
            <h2 className="text-xs font-semibold text-gray-900">{label}</h2>
            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                {results.map(r => toCard(r)).map((r) => (
                <combobox.Option
                    key={r.id}
                    value={r}
                    className={({ active }) =>
                    classNames(
                        'flex rounded-md cursor-default select-none items-center px-4 py-2',
                        active && 'bg-indigo-600 text-white'
                    )
                    }
                >
                    {({ active }) => (
                    <>
                        {r.icon && (
                            <r.icon
                            className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                            aria-hidden="true"
                            />
                        )}
                        <span className="ml-3 flex-auto truncate">{r.name}</span>
                    </>
                    )}
                </combobox.Option>
                ))}
            </ul>
        </li>
    )
}

const createGroup = <T extends Object,>(options: ({
    allResults: T[]
    identifyer?: string
    filter: (result: T, query: string) => boolean
    isLoading?: boolean
} & Omit<IResultGroupProps<T>, "results" | "combobox">)) => options

interface IResultsListProps<T extends Object> {
    rawQuery: string
    query: string
    groups: ReturnType<typeof createGroup<T>>[]
    combobox: typeof Combobox
}

const ResultsList = <T, >({
    groups,
    rawQuery,
    query,
    combobox,
}: IResultsListProps<T>) => {
    const deferredSearch = useDeferredValue(rawQuery)

    const groupsWithFiltered = useMemo(
        () => groups.map(g => {
            return {
                ...g,
                filteredResults: (g.identifyer && deferredSearch.startsWith(`${g.identifyer}`))
                ? g.allResults
                : g.allResults.filter((r) => g.filter(r, deferredSearch)),
            }
        })
        .filter(g => !g.isLoading && g.filteredResults.length !== 0),
        [deferredSearch, groups]
    )

    if (rawQuery === "") return null

    if (rawQuery === '?') return (
        <div className="py-14 px-6 text-center text-sm sm:px-14">
        <LifebuoyIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
        <p className="mt-4 font-semibold text-gray-900">Help with searching</p>
        <p className="mt-2 text-gray-500">
            Use this tool to quickly search for users and projects across our entire platform. You can also
            use the search modifiers found in the footer below to limit the results to just users or projects.
        </p>
        </div>
    )

    if (query !== '' && rawQuery !== '?' && groupsWithFiltered.length === 0) return (
        <div className="py-14 px-6 text-center text-sm sm:px-14">
            <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">No results found</p>
            <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
        </div>
    )

    return (
        <Combobox.Options
        static
        className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
        >
            {groupsWithFiltered.map(({filteredResults, label, toCard, identifyer, }) => (
                <ResultsGroup
                    key={label}
                    combobox={combobox}
                    label={label}
                    results={filteredResults}
                    toCard={toCard}
                />

            ))}
            {/* <ResultsGroup
                combobox={Combobox}
                label={"Users"}
                results={filteredUsers}
                toCard={({id, name, imageUrl}) => ({
                    id,
                    name,
                    icon: () => (<img src={imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />)
                })}
            /> */}
        </Combobox.Options>
    )
}


interface Props {
    groups: ReturnType<typeof createGroup<T>>[]
}
const CommandPalette: React.FC<Props> = ({
    groups,
}) => {
    const {isOpen, setOpen} = useCommandPalette()
    const [rawQuery, setRawQuery] = useState('')

    const wallets = useQuery(["wallet.getAll"])
  
    const query = rawQuery.toLowerCase().replace(/^[#>]/, '') // Replace identifyers
  
    groups = [
        // @ts-ignore
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
        }),
        // @ts-ignore
        createGroup({
            allResults: projects,
            filter: (p, s) => p.name.toLowerCase().includes(s),
            label: "Projects",
            toCard: (r) => ({
                id: r.id,
                name: r.name,
                href: r.url,
                icon: FolderIcon
            }),
            identifyer: "#",
        }),
        // @ts-ignore
        createGroup({
            allResults: users,
            label: "Users",
            filter: (p, s) => p.name.toLowerCase().includes(s),
            identifyer: ">",
            toCard: (r) => ({
                id: r.id,
                name: r.name,
                href: r.url,
                icon: () => (<img src={r.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />)
            })
        }),
    ]
  
    return (
      <Transition.Root show={isOpen} as={Fragment} afterLeave={() => undefined} appear>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            {/* Backdrop */}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="mx-auto max-w-xl transform  divide-gray-100 overflow-hidden p-2 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                        <Combobox onChange={(item) => {
                            // @ts-ignore
                            item.action?.(item)
                            // @ts-ignore
                            if (item.href) window.location = item.href
                        }}>
                            {/* Input */}
                            <div className={classNames("relative flex items-center bg-gray-50 rounded-xl px-4", rawQuery.length === 0 && "rounded-b-none")}>
                                <MagnifyingGlassIcon
                                className="pointer-events-none  top-3.5 left-4 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                />
                                <Combobox.Input
                                className="h-12 w-full border-0 bg-transparent pl-2 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Search..."
                                onChange={(event) => setRawQuery(event.target.value)}
                                />
                            </div>

                            <ResultsList 
                            query={query}
                            groups={groups}
                            rawQuery={rawQuery}
                            combobox={Combobox} 
                            />

                            {/* Footer */}
                            <div className={classNames("flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700 rounded-xl", rawQuery.length === 0 && "rounded-t-none border-t border-gray-100")}>
                                Type{' '}
                                {
                                groups.filter(g => g.identifyer !== undefined)
                                .map((g, i, arr) => (<>
                                    <kbd
                                    className={classNames(
                                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                                        rawQuery.startsWith(g.identifyer!) ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                                    )}
                                    >
                                    {g.identifyer}
                                    </kbd>{' '}
                                    <span className="">for {g.label.toLowerCase()}{i !== arr.length - 1 && ","}</span>
                                </>))
                                }
                                
                                
                                <pre> and</pre>
                                <kbd
                                className={classNames(
                                    'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                                    rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                                )}
                                >
                                ?
                                </kbd>{' '}
                                for help.
                            </div>
                        </Combobox>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
      </Transition.Root>
    )
}


export default CommandPalette