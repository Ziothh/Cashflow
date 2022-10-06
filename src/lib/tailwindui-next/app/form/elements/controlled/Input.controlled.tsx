import { InputWithLabel, InputWithLabelProps } from "../withLabel"

interface Props extends Omit<InputWithLabelProps, "name" | "value" | "onChange"> {
    name: string
}


const ControlledInput: React.FC<Props> = ({
    name,
    ...props
}) => {
    return (
        <InputWithLabel
        {...props}
        />
    )
}


export default ControlledInput