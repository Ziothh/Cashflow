import { useField } from "formik"
import { ISelectWithLabelProps, SelectWithLabel } from "../withLabel"

type Props<EnumType, Nullable extends boolean> = Omit<ISelectWithLabelProps<keyof EnumType, Nullable>, "value" | "onChange" | "options"> & {
    name: string,
    enum: EnumType
}


const FormikEnumSelect = <EnumType extends Object, Nullable extends boolean>({
    name,
    enum: enumType,
    ...props
}: Props<EnumType, Nullable>): JSX.Element => {
    const [field, meta, helpers] = useField<Nullable extends true ? (EnumType | null) : EnumType>(name)

    return (
        // @ts-ignore
        <SelectWithLabel 
        value={field.value}
        options={Object.keys(enumType)}
        onChange={v => {
            helpers.setValue(v as any)
            helpers.setTouched(true)
        }}
        {...props}
        />
    )
}


export default FormikEnumSelect