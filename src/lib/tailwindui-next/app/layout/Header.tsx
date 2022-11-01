/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { GetProps } from '@ziothh/tailwindui-next/common/utils/typescript'
import Link from 'next/link'
import { ReactNode } from 'react'

interface IBreadcrumbsProps {
    path: {
        name: string
        href: GetProps<typeof Link>["href"]
        as?: GetProps<typeof Link>["as"]
    }[]
    backUrl?: string
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({
    path,
    backUrl,
}) => {
    return (
        <div className="mb-2">
            {backUrl && (
                <nav className="sm:hidden" aria-label="Back">
                    <a href="#" className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
                        <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                        Back
                    </a>
                </nav>
            )}
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    {path.map((b, i) => (
                        <li key={b.name}>
                            <div className="flex items-center">
                                {i !== 0 && <ChevronRightIcon className="h-5 w-5 mr-4 flex-shrink-0 text-gray-500" aria-hidden="true" />}
                                <Link
                                    href={b.href}
                                    as={b.href}
                                    prefetch={false}
                                    className="text-sm font-medium text-gray-400 capitalize hover:text-gray-200">

                                    {b.name}

                                </Link>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}

interface Props {
    title: ReactNode
    breadcrumbs?: IBreadcrumbsProps["path"]
    buttons?: ReactNode
}

const Header: React.FC<Props> = ({
    title,
    breadcrumbs,
    buttons,
}) => {
    return (
        <div className="bg-gray-800 p-4 md:p-8 rounded-lg">
            {breadcrumbs && (
                <Breadcrumbs path={breadcrumbs}/>
            )}
            <div className="md:flex md:items-center md:justify-between text-white">
                <div className="min-w-0 flex-1 text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                    {typeof title === "string" ? (
                         <h2 className="text-2xl font-bold  text-white ">
                            {title}
                         </h2>
                    ) : title}
                </div>
                {buttons && (
                    <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4 space-x-3">
                        {buttons}
                    </div>
                )}
            </div>
        </div>
    )
}


export default Header