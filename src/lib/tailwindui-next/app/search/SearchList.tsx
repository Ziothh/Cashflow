import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
    FunnelIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import { FC, ReactNode, useDeferredValue, useMemo, useState } from "react"



interface BaseProps<T, G> {
    title: ReactNode
    values: T[]
    groups?: G[]
    sort?: (a: T, b: T) => number
    description: ReactNode
    className?: string
    search: {
        placeholder?: string
        filter: G extends undefined
        ? ((query: {lower: string, raw: string}, value: T) => boolean)
        : ((query: {lower: string, raw: string}, value: T, group: G) => boolean)
    } 
}

interface PropsWithGroups<T, G> {
    /** @returns The index of the assigned group */
    getGroupIndex: (value: T, groups: G[]) => number

    getGroupLabel: (group: G) => string | number
    
    // groupBy?: (value: T) => {
    //     label: string
    //     value: G
    // }

    render: FC<{value: T, group: G, index: number, groupIndex: number}>
}

interface PropsWithoutGroups<T> {
    render: FC<{value: T, index: number}>

    // render: FC<{value: T, group: G, index: number, groupIndex: number}>
}

export type SearchListProps<T, G = undefined> = BaseProps<T, G> & (G extends undefined ? PropsWithoutGroups<T> : PropsWithGroups<T, G>)

const SearchList = <T, G = undefined>({
    className,
    title,
    description,
    search,
    render,
    values,
    groups,
    sort,
    ...props
}: SearchListProps<T, G>): JSX.Element => {
    const propsWithoutGroups = props as unknown as PropsWithoutGroups<T>
    const propsWithGroups = props as unknown as PropsWithGroups<T, G>

    // TODO: useSearchQuery
    const [query, setQuery] = useState("")

    const deferredQuery = useDeferredValue(query)

    const mappedGroups = useMemo(
        () => (groups !== undefined && groups[0] !== undefined)
        ? groups.map(g => ({
            value: g,
            label: propsWithGroups.getGroupLabel(g),
            children: [] as T[]
        })) : undefined, 
        [groups, propsWithGroups.getGroupLabel]
    )

    const sortedValues = useMemo(() => sort ? values.sort(sort) : values, [sort, values])
    const groupedValues = useMemo(() => {
        if (!mappedGroups) return {
            grouped: undefined,
            raw: sortedValues
        }

        const copy = mappedGroups.map(g => ({
            ...g,
            children: new Array<T>()
        }))
        // const mappedValues = sortedValues.ma
        sortedValues.forEach(v => {
            // this might do some funky things
            copy[propsWithGroups.getGroupIndex(v, groups!)]!.children.push(v)
        })

        return {
            grouped: copy,
            raw: undefined
        }
    }, 
    [sortedValues, mappedGroups])


    const filteredGroups = useMemo(() => {
        const cleanQuery = deferredQuery.trim().toLowerCase()
        const queryMap = {lower: cleanQuery, raw: deferredQuery}

        if (groupedValues.grouped === undefined) return {
            raw: groupedValues.raw.filter(
                // @ts-ignore
                v => search.filter(queryMap, v)
            ),
            grouped: undefined,
        }


        return {
            raw: undefined,
            grouped: groupedValues!.grouped!.map(g => ({
                ...g,
                children: g.children.filter(v => search.filter(queryMap, v, g.value))
            })).filter(g => g.children.length !== 0)
        }
    }, [groupedValues, deferredQuery])

    return (
        <aside className={classNames("hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col", className)}>
            <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
                {/* Search form */}
                <div className="mt-6 flex space-x-4">
                    <div className="min-w-0 flex-1">
                        <label htmlFor="search" className="sr-only">
                            {search.placeholder}
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <input
                                type="search"
                                name="search"
                                id="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                                placeholder={search.placeholder}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                        <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="sr-only">{search.placeholder}</span>
                    </button>
                </div>
            </div>
            {/* Directory list */}
            <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
                {(filteredGroups.grouped !== undefined) ? (
                    filteredGroups.grouped.map((g, gi) => (
                        <div key={g.label} className="relative">
                            <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                <h3>{g.label}</h3>
                            </div>
                            <ul role="list" className="relative z-0 divide-y divide-gray-200">
                                {g.children.map((c, ci) => (
                                    // todo label
                                    <li key={undefined}>
                                        {render({
                                            value: c,
                                            index: ci,
                                            group: g.value,
                                            groupIndex: gi,
                                        })}
                                    </li>
                                ))}
                            </ul>
                        </div> 
                    ))
                ) : (
                    <ul role="list" className="relative z-0 divide-y divide-gray-200">
                        {filteredGroups.raw.map((c, ci) => (
                            // todo label
                            <li key={undefined}>
                                {/* @ts-ignore */}
                                {render({
                                    value: c,
                                    index: ci,
                                })}
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </aside>
    )
}


export default SearchList