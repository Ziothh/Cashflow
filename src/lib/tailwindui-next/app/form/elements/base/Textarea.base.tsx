import classNames from "classnames"
import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useLayoutEffect, useRef, } from "react"

type TTextareaProps = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>


export interface IBaseTextareaProps extends Omit<TTextareaProps, "className"> {
}


const Textarea: React.FC<IBaseTextareaProps> = (props) => {
    const ref = useRef<HTMLTextAreaElement | null>(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!props.readOnly || el === null) return


        const listener = () => {
            if (!el) return
            el.style.minHeight = `${el.scrollHeight + 3}px`;
        }

        listener()

        el.addEventListener("input", listener as any)
        return () => el.removeEventListener("input", listener as any)
    }, [ref, props.readOnly])

    return (
        <textarea 
        ref={ref}
        {...props}
        
        className={classNames(
            `mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`,
            !props.readOnly ? "focus:border-indigo-500 focus:ring-indigo-500" : "bg-gray-50  focus:!border-gray-300 focus:!ring-0 resize-none",
        )}
        >
            
        </textarea>
    )
}


export default Textarea