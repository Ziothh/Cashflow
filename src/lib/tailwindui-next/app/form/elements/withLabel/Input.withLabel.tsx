import { ReactNode } from "react"
import {IBaseInputProps, BaseInput} from "../base"
import FormElementWrapper, { FormElementPropsWithWrapper } from "./FormElementWrapper"

export interface InputWithLabelProps extends FormElementPropsWithWrapper<IBaseInputProps> {
    label: ReactNode
}


const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    tip,
    ...inputProps
}) => {
    return (
        <FormElementWrapper
        label={label}
        id={inputProps.id}
        tip={tip}
        >
            <BaseInput
            {...inputProps}
            />
        </FormElementWrapper>
    )
}


export default InputWithLabel