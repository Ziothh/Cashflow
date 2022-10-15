import { useField } from "formik"
import { ISelectWithLabelProps, SelectWithLabel } from "../withLabel"

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
        <SelectWithLabel 
        value={field.value}
        onChange={v => {
            helpers.setValue(v as any)
            helpers.setTouched(true)
        }}
        {...props}
        />
    )
}


export default FormikSelect