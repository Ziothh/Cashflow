import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import type { FC, PropsWithChildren } from "react"
import { ComponentPropsFrom } from "../../../utils/types"

interface Props {
    icon: FC<any>
    href: ComponentPropsFrom<typeof Link>["href"]
    as?: ComponentPropsFrom<typeof Link>["as"]

}


const NavButton: React.FC<PropsWithChildren<Props>> = ({
    icon: Icon,
    href,
    as,
    children
}) => {
    const isActive = useRouter().pathname === (typeof href === "string" ? href : href.pathname)

    return (
        (<Link
            href={href}
            as={as}
            className={classNames(
            isActive ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
            )}
            aria-current={isActive ? 'page' : undefined}>

            <Icon className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
            {children}

        </Link>)
    );
}


export default NavButton