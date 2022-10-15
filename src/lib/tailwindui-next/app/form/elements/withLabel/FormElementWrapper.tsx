import { reactNodeRender } from "@ziothh/tailwindui-next/common/utils/parsing"
import { PropsWithChildren, ReactNode } from "react"

export interface FormElementWrapperProps {
    label?: ReactNode
    id?: string
    tip?: ReactNode
}

export type FormElementPropsWithWrapper<Props extends Object = {}> = Props & FormElementWrapperProps


const FormElementWrapper: React.FC<PropsWithChildren<FormElementWrapperProps>> = ({
    label,
    children,
    id,
    tip,
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            {children}
            {tip && reactNodeRender(tip, "mt-2 text-sm text-gray-500")}
        </div>
    )
}


export default FormElementWrapper