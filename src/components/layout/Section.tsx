import { PropsWithChildren, ReactNode } from "react"

interface Props {
    title: ReactNode
}


const Section: React.FC<PropsWithChildren<Props>> = ({
    title,
    children,
}) => {
    return (
        <div className="">
            <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                {title}
            </h2>
            <div className="flex w-full group [&>*]:w-full">
                {children}
            </div>
        </div>
    )
}


export default Section