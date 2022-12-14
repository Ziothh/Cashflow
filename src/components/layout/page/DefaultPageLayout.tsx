import classNames from "classnames"
import { PropsWithChildren, ReactNode } from "react"

interface Props {
    title: ReactNode
    headerText?: ReactNode
    buttons?: ReactNode
    /** @default false */
    scroll?: boolean
    className?: string
}


const DefaultPageLayout: React.FC<PropsWithChildren<Props>> = ({
    children,
    buttons,
    title,
    headerText,
    scroll = false,
    className,
}) => {
    return (
        <div className={classNames("px-4 sm:px-6 lg:px-8 py-10 max-w-full", scroll && "overflow-x-hidden overflow-y-auto", className)}>
        {/* // <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-full"> */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                    {headerText && (
                        <p className="mt-2 text-sm text-gray-700">
                            {headerText}
                        </p>
                    )}
                </div>
                {buttons && (
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2 flex-wrap">
                        {buttons}
                    </div>
                )}
            </div>
            <div className="mt-8 flex flex-col">
                {children}
            </div>
        </div>
    )
}


export default DefaultPageLayout