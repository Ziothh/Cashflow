import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon, WalletIcon } from '@heroicons/react/24/outline'
import { Wallet } from '@prisma/client'
import { GetProps } from '@ziothh/tailwindui-next/common/utils/typescript'
import classNames from 'classnames'
import { atom, Provider, useAtom, useAtomValue,  } from "jotai"
import { FC, Fragment, Key, SetStateAction, useDeferredValue, useMemo, useState } from 'react'
import { useQuery } from '../../../../../../utils/trpc'
import useKeypress from '../../../../../../utils/useKeypress'

export const isOpenAtom = atom(true)
const groupsAtom = atom<ReturnType<typeof createGroup>[]>([])
const rawQueryAtom = atom("",)
const metaAtom = atom((get) => {
    const rawQuery = get(rawQueryAtom).trim()
    const groups = get(groupsAtom)

    // const identifyers = groups.map(g => g.identifyer)

    const activeGroupIndexByIdentifyer = groups.findIndex(g => g.identifyer && rawQuery.startsWith(g.identifyer))
    const activeGroup = activeGroupIndexByIdentifyer >= 0 
    ? groups[activeGroupIndexByIdentifyer]!
    : null

    const query = activeGroup === null
    ? rawQuery
    : rawQuery.slice(activeGroup.identifyer!.length, -1).trim()

    return {
        query,
        rawQuery,
        activeGroup,
        activeGroupIndex: activeGroupIndexByIdentifyer,
    }
})
const filteredGroupsAtom = atom((get) => {
    const groups = get(groupsAtom)
    const meta = get(metaAtom)

    const allowedGroups = meta.activeGroup === null
    ? groups
    : [meta.activeGroup]

    return allowedGroups.map(g => ({
        ...g,
        filteredResults: g.allResults.filter((v) => g.filter(v, meta.query))
    }))
    .filter(g => g.filteredResults.length !== 0)
})
// const query = atom((get) => {
//     const raw = get(rawQuery)
    
    
// }, (v) => {
//     v()
// })
// const activeIdentifyer = atom<string | null>(null)

const commandPaletteAtom = atom({
    isOpen: true,
    activeIdentifyer: null as string | null,
    query: "",
    rawQuery: "",
})

export const useCommandPalette = () => {
    const [value, setValue] = useAtom(commandPaletteAtom)

    type Value = typeof value

    const set = <K extends keyof Value>(
        key: K, 
        value: Value[K] extends Function
        ? never 
        : SetStateAction<Value[K]>
    ) => setValue(prev => ({
        ...prev,
        [key]: typeof value === "function" 
        ? value(prev[key]) 
        : value
    }))


    return {
        value,
        setValue,
        set,
        // isOpen: value.isOpen,
        // setOpen: (value: boolean) => setValue(prev => ({...prev, isOpen: value})),
        // toggleOpen: () => setValue(prev => ({...prev, isOpen: !prev.isOpen}))
    }
}

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
                    <button className="flex items-center">
                        {r.icon && (
                            <r.icon
                            className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                            aria-hidden="true"
                            />
                        )}
                        <span className="ml-3 flex-auto truncate">{r.name}</span>
                    </button>
                    )}
                </combobox.Option>
                ))}
            </ul>
        </li>
    )
}

export const createGroup = <T extends Object,>(options: ({
    allResults: T[]
    identifyer?: string
    filter: (result: T, query: string) => boolean
    isLoading?: boolean
} & Omit<IResultGroupProps<T>, "results" | "combobox">)) => options

interface IResultsListProps{
    // rawQuery: string
    // query: string
    // groups: ReturnType<typeof createGroup<T>>[]
    combobox: typeof Combobox
}

const ResultsList: FC<IResultsListProps> = ({
    combobox,
}) => {
    const meta = useAtomValue(metaAtom)
    const groups = useAtomValue(filteredGroupsAtom)
    const allGroups = useAtomValue(groupsAtom)

    console.log(allGroups)

    if (meta.rawQuery === "") return null

    if (meta.rawQuery.startsWith("?")) return (
        <div className="py-14 px-6 text-center text-sm sm:px-14">
            <LifebuoyIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">Help with searching</p>
            <p className="mt-2 text-gray-500">
                Use this tool to quickly search in our entire platform. You can also
                use the search modifiers found in the footer below to limit the results to just users or projects.
            </p>
            <p className="mt-8">
                <span className="font-medium">Shortcuts:</span> <br />
                {allGroups.filter(g => g.identifyer !== undefined)
                .map((g, i, arr) => (
                    <span key={g.identifyer} className="flex items-center min-w-[200px] mx-auto justify-between mt-2 w-fit">
                        {g.label}:
                        <kbd
                        className={classNames(
                            'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                            // false ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                            'border-gray-400 text-gray-900'
                        )}
                        >
                            {g.identifyer}
                        </kbd>
                    </span>
                ))}
            </p>
        </div>
    )

    if (meta.query !== '' && groups.length === 0) return (
        <div className="py-14 px-6 text-center text-sm sm:px-14">
            <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">No results found</p>
            <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
        </div>
    )

    console.debug(groups)

    return (
        <Combobox.Options
        static
        className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
        >
            {groups.map(({filteredResults, label, toCard, identifyer, }) => (
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
    groups: ReturnType<typeof createGroup>[]
}

const CommandPaletteComponent: FC<{}> = ({

}) => {
    const [isOpen, setIsOpen] = useAtom(isOpenAtom)
    const [rawQuery, setRawQuery] = useAtom(rawQueryAtom)
    const groups = useAtomValue(groupsAtom)

    
    useKeypress({
        meta: {
            k: () => setIsOpen(prev => !prev)
        }
    })
  
   
  
    return (
      <Transition.Root show={isOpen} as={Fragment} afterLeave={() => undefined} appear>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                            setRawQuery("")
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
                                value={rawQuery}
                                autoFocus 
                                onChange={(event) => setRawQuery(event.target.value)}
                                />
                            </div>

                            <ResultsList 
                            combobox={Combobox} 
                            />

                            {/* Footer */}
                            <div className={classNames("flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700 rounded-xl", rawQuery.length === 0 && "rounded-t-none border-t border-gray-100")}>
                                Type{' '}
                                <kbd
                                className={classNames(
                                    'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                                    rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                                )}
                                >
                                ?
                                </kbd>{' '}
                                for help and shortcuts.
                            </div>
                        </Combobox>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
      </Transition.Root>
    )
}

const CommandPalette: React.FC<Props> = (props) => {
   return (
    // @ts-ignore
    <Provider initialValues={[[groupsAtom, props.groups]]}>
        <CommandPaletteComponent />
    </Provider>
   )
}


export default CommandPalette