import { ChangeEvent, DetailedHTMLProps, FC, HTMLInputTypeAttribute, InputHTMLAttributes } from "react"

type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface IBaseInputProps extends Omit<TInputProps, "type"> {
    icon?: FC<{className?: string}>
    prefix?: string
    type?:
    // | 'button'
    // | 'checkbox'
    | 'color'
    // | 'date'
    // | 'datetime-local'
    | 'email'
    // | 'file'
    // | 'hidden'
    // | 'image'
    // | 'month'
    | 'number'
    | 'password'
    // | 'radio'
    // | 'range'
    // | 'reset'
    | 'search'
    // | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    // | 'week'
    | (string & {});
}

const BaseInput: React.FC<IBaseInputProps> = ({
    icon: Icon,
    prefix,
    type = "text",
    value,
    onChange,
    ...props
}) => {
    return (
        <label htmlFor={props.id} className="mt-1 flex rounded-md shadow-sm border 
        border-gray-300 
        bg-gray-50 
        focus-within:border-indigo-500 focus-within:ring-indigo-500 focus-within:ring-1
        
        ">
            {Icon && <span className="inline-flex items-center border-r !border-gray-200 px-2 py-1 text-sm text-gray-500 flex-shrink-0 first:rounded-l-md">
                <Icon/>
            </span>}
            {prefix && <span className="inline-flex items-center border-r !border-gray-200 bg-gray-50 px-3 text-sm text-gray-500 flex-shrink-0 first:rounded-l-md">
                {prefix}
            </span>}
            <input
            className="block w-full flex-1 rounded-none border-none focus:ring-0 sm:text-sm first:rounded-l-md last:rounded-r-md"
            type={type}
            value={value !== undefined 
                ? (prefix === undefined || typeof value !== "string" || !value.startsWith(prefix))
                    ? value
                    : value.slice(prefix.length, -1)
                : value
            }
            onChange={onChange !== undefined
            ? !prefix 
                ? onChange 
                : (e) => {
                    e.target.value = `${prefix}${e.target.value}`
                    onChange(e)
                }
            : undefined}
            {...props}
            />
        </label>
    )
}


export default BaseInput