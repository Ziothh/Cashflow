import { FC, ReactNode } from "react"

interface Props {
    href?: string
    title: ReactNode
    value: ReactNode
    icon: FC<{className: string}>
}


const SummaryCard: React.FC<Props> = ({
    title,
    value,
    href,
    icon: Icon
}) => {
    return (
        <div className="overflow-hidden w-full rounded-lg bg-white shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 flex-1 w-fit">
                        <dl>
                            <dt className="w-fit truncate text-sm font-medium text-gray-500">{title}</dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">{value}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 h-full">
                <div className="text-sm">
                    {href && (
                        <a href={href} className="font-medium text-cyan-700 hover:text-cyan-900">
                            View all
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}


export default SummaryCard