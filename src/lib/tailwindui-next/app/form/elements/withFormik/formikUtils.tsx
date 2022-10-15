// type TUseFieldProps = ReturnType<>

import { FieldInputProps, useField } from "formik"
import { FC } from "react"

export const createFormikField = <T = any, P extends {name: string} = {name: string}>(Component: FC<P & FieldInputProps<T>>): FC<P> => (props: P) => {
    const [field, meta, helpers] = useField<T>(props.name)

    return <Component {...props} {...field} />
}