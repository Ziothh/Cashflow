import { ReactNode } from "react"
import {IBaseTextareaProps, BaseTextarea} from "../base"
import FormElementWrapper, { FormElementPropsWithWrapper } from "./FormElementWrapper"

export interface TextareaWithLabelProps extends FormElementPropsWithWrapper<IBaseTextareaProps> {
    label: ReactNode
}


const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
    label,
    tip, 
    ...textareaProps
}) => {
    return (
        <FormElementWrapper
        label={label}
        id={textareaProps.id}
        tip={tip}
        >
            <BaseTextarea
            {...textareaProps}
            />
        </FormElementWrapper>
    )
}


export default TextareaWithLabel