/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import {
    XMarkIcon
} from '@heroicons/react/24/outline'
import { GetProps } from '@ziothh/tailwindui-next/common/utils/typescript'
import classNames from 'classnames'
import Link from 'next/link'
import { FC, Fragment, ReactNode } from 'react'
import { useLayoutCtx } from '../context'

type TNextLinkProps = GetProps<typeof Link>

interface INavButtonProps {
    name: ReactNode
    icon?: FC<{className?: string}>,
    href: TNextLinkProps["href"]
    as?: TNextLinkProps["as"]
}

interface INavElProps {
    links: (INavButtonProps[] | FC<{}>)[]
    logo?: ReactNode
    footer?: ReactNode
}

export interface ISidebarNavProps extends INavElProps {

}

const NavButtonGroup: FC<{links: INavButtonProps[]}> = ({
    links
}) => {
    return (
        <nav className="space-y-1">
            {links.map(l => <NavButton key={typeof l.name === "string" ? l.name : (typeof l.href === "string" ? l.href : l.href.href)} {...l}/>)}
        </nav>
    )
}

const NavButton: FC<INavButtonProps> = ({
    href,
    name,
    as,
    icon: Icon,
}) => {
    const current = false

    return (
        (<Link
            href={href}
            as={as}
            className={classNames(
                current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center py-2 px-2 text-base font-medium rounded-md'
            )}>

            {Icon && <Icon
                className={classNames(
                current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
            />}
            {name}

        </Link>)
    );
}

const NavEl: FC<INavElProps> = ({
    logo,
    links,
    footer: Footer,
}) => {
    return (
        <div className="flex w-64 flex-col h-full">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex h-full flex-1 flex-col bg-gray-800">
                <div className="flex flex-1 flex-col px-2 overflow-y-auto pt-5 pb-4">
                    {logo && <div className="flex flex-shrink-0 items-center px-2 mb-5">
                        {logo}
                    </div>}
                    {links.map((L, i) => <Fragment key={i}>
                        {i !== 0 && <hr className="border-gray-600 my-4 mx-2" />}
                        {
                            typeof L === "function"
                            ? <L/>
                            : <NavButtonGroup links={L} />
                        }
                    </Fragment>)}
                </div>
                
                {Footer && (
                    <div className="mt-auto">
                        {Footer}
                    </div>
                )}
            </div>
        </div>
    )
}

const SidebarNav: React.FC<ISidebarNavProps> = (props) => {
    const {navOpen} = useLayoutCtx()
    const RenderedNav = <NavEl {...props}/>

    return (<>
        {/* Mobile sidebar */}
        <Transition.Root show={navOpen.value} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={() => navOpen.set(false)}>
                <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    {/* The backdrop */}
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex flex-col bg-gray-800 h-full">
                            {/* Close button */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => navOpen.set(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                                </div>
                            </Transition.Child>

                            {RenderedNav}
                        </Dialog.Panel>
                    </Transition.Child>
                    <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
                </div>
            </Dialog>
        </Transition.Root>

        <div className="hidden md:flex">
            {RenderedNav}
        </div>
    </>)
}


export default SidebarNav