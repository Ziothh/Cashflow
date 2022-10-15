import { useField } from "formik"
import { InputWithLabel, InputWithLabelProps } from "../withLabel"
interface Props extends Omit<InputWithLabelProps, "name" | "value" | "onChange" | "onBlur"> {
    name: string
}


const FormikInput: React.FC<Props> = ({
    name,
    ...props
}) => {
    const [field, meta, helpers] = useField<string | number>(name)

    return (
        <InputWithLabel
        {...props}
        {...field}
        />
    )
}


export default FormikInput