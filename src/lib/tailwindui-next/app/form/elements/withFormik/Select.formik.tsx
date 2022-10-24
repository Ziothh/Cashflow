import { useField } from "formik"
import { ReactNode } from "react"
import { ISelectWithLabelProps, ComboboxWithLabel } from "../withLabel"

type Props<T, Nullable extends boolean> = Omit<ISelectWithLabelProps<T, Nullable>, "value" | "onChange"> & {
    name: string,
}


const FormikSelect = <T, Nullable extends boolean>({
    name,
    ...props
}: Props<T, Nullable>): JSX.Element => {
    const [field, meta, helpers] = useField<Nullable extends true ? (T | null) : T>(name)

    return (
        // @ts-ignore
        <ComboboxWithLabel 
        value={field.value}
        onChange={v => {
            helpers.setValue(v as any)
            helpers.setTouched(true)
        }}
        {...props}
        />
    )
}


type TCreateProps<T, Nullable extends boolean> = Omit<Props<T, Nullable>, "value" | "optionsParser" | "options">
export const createFormikSelect = <T, Nullable extends boolean = false>(
    useData: () => {
        options: T[]
        optionParser: NonNullable<ISelectWithLabelProps<T, Nullable>["optionParser"]>,
        // optionsParser: (option: T) => {
        //     label: string
        //     before?: ReactNode
        //     after?: ReactNode
        // }
    },
    defaultOptions: TCreateProps<T, Nullable> & {placeholder: string}
) => (props: Partial<TCreateProps<T, Nullable>>) => {
    const data = useData()

    return (
        // @ts-ignore
        <FormikSelect
        {...defaultOptions}
        {...props}
        {...data}
        />
    )
} 

export default FormikSelect