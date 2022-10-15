import { ChangeEvent, ReactNode, useMemo, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import classNames from "classnames"

type Test<T> = T extends Object ? "this is an object" : never

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More users...
]


const typeCeckers = {
    isNullable: (nullable: boolean): nullable is true => nullable === true,
    isNull: (value: any): value is null => value === null,
}

interface IBaseProps<T, Nullable extends boolean> {
    label: ReactNode
    options: T[]
    nullable?: Nullable
    value: Nullable extends true 
    ? (T | null) 
    : T
    onChange: (
        newValue: Nullable extends true ? (T | null) : T, 
        // e: ChangeEvent<HTMLSelectElement>
        ) => void
        
} 

type TOptionParser<T> = (option: T) => {
    label: string
    before?: ReactNode
    after?: ReactNode
}

export type ISelectWithLabelProps<T, Nullable extends boolean> = IBaseProps<T, Nullable>
& (T extends string ? {optionParser?: TOptionParser<T>,} : {optionParser: TOptionParser<T>,})
& (Nullable extends true ? {placeholder: ReactNode} : {})


const Select = <T, Nullable extends boolean = false>(
    {
        label,
        value,
        onChange,
        options,
        nullable = false as Nullable,
        optionParser = (o) => ({label: (o as string)}),
        ...conditionalProps
    }: ISelectWithLabelProps<T, Nullable> 
    
): JSX.Element => {
    const [query, setQuery] = useState('')

    const isNullable = typeCeckers.isNullable(nullable as Nullable) 
    const isDefaultValueNull = typeCeckers.isNull(value)

    const valueType = value === null
    ? options.length === 0
        ? null
        : typeof options[0]!
    : typeof value

    // const getOptionLabel: (option: T) => string = ((conditionalProps as any).optionLabelGetter as any) ?? ((option: T) => option)

    const parsedOptions = useMemo(() => options.map<ReturnType<TOptionParser<T>> & {value: T}>(o => ({
        value: o,
        ...optionParser(o) 
    })), [options, optionParser])

    const findIndexFn = valueType === null
    ? (value: T) => null
    :  typeof valueType === "string"  
        ? (value: T) => {
            const index = options.findIndex(o => o === value)
            return index >= 0 ? index : null
        } 
        : (value: T) => {
            // @ts-ignore
            const index = options.findIndex(o => getOptionLabel(o) === getOptionLabel(value))
            return index >= 0 ? index : null
        }


    // const getOptionDisplay = (option: T) => typeof option
    
    // const [currentIndex, setCurrentIndex] = useState<Nullable extends true ? number | null : number>(
    //     // @ts-ignore
    //     (isNullable && isDefaultValueNull)
    //     ? null
    //     : findIndexFn(defaultValue!)
    // )


    // const filteredPeople =
    //   query === ''
    //     ? people
    //     : people.filter((person) => {
    //         return person.name.toLowerCase().includes(query.toLowerCase())
    //       })

    const filteredOptions = useMemo(() => {
        const rawQuery = query.trim().toLowerCase()

        return rawQuery === ""
        ? parsedOptions
        : parsedOptions.filter(o => o.label.toLowerCase().includes(rawQuery))
    }, [parsedOptions, query])

  
    return (
        <Combobox as="div" 
        // @ts-ignore
        value={value as T} 
        // @ts-ignore
        onChange={onChange as (newValue: T) => void} 
        // @ts-ignore
        nullable={nullable as boolean}
        >
            <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
            <div className="relative mt-1">
                <Combobox.Button 
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 flex items-center shadow-sm 
                focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
                focus-within:border-indigo-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-500
                "
                >
                    <Combobox.Input
                    className={"p-0 !border-none !focus:outline-none sm:text-sm w-full !ring-transparent !ring-0"}
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={v => parsedOptions.find(
                            valueType === "string"
                            ? (o => o.value === v)
                            : (o => JSON.stringify(o.value) === JSON.stringify(v))
                        )!.label}
                    />
                    <div className="flex items-center rounded-r-md px-2 -mr-3 focus:">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                </Combobox.Button>
    
                {filteredOptions.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredOptions.map((option) => (
                        <Combobox.Option
                        key={valueType === "string" ? (option.value as string) : option.label}
                        value={option.value}
                        className={({ active }) =>
                            classNames(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            )
                        }
                        >
                            {({ active, selected }) => (
                                <>
                                <div className="flex items-center gap-3">
                                    {/* <img src={option.imageUrl} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                                    {option.before && option.before}
                                    <span className={classNames('truncate', selected && 'font-semibold')}>{option.label}</span>
                                    {option.after && option.after}
                                </div>
            
                                {selected && (
                                    <span
                                    className={classNames(
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                        active ? 'text-white' : 'text-indigo-600'
                                    )}
                                    >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                )}
                                </>
                            )}
                        </Combobox.Option>
                    ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}


export default Select