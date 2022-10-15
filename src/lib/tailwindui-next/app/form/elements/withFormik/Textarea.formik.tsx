import { useField } from "formik"
import { TextareaWithLabel, TextareaWithLabelProps } from "../withLabel"
interface Props extends Omit<TextareaWithLabelProps, "name" | "value" | "onChange" | "onBlur"> {
    name: string
}


const FormikTextarea: React.FC<Props> = ({
    name,
    ...props
}) => {
    const [field, meta, helpers] = useField<string>(name)

    return (
        <TextareaWithLabel
        {...props}
        {...field}
        />
    )
}


export default FormikTextarea