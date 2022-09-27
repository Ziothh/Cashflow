import { Dialog, Transition } from "@headlessui/react"
import { ClockIcon, CogIcon, CreditCardIcon, DocumentChartBarIcon, HomeIcon, QuestionMarkCircleIcon, ScaleIcon, ShieldCheckIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { atom, useAtom } from "jotai"
import { Fragment } from "react"
import { AppRoutes } from "../../../config/routes"
import { ComponentPropsFrom } from "../../../utils/types"
import NavButton from "./NavButton"
import NavWalletList from "./NavWalletList"

const navigation: ComponentPropsFrom<typeof NavButton>[] = [
    { children: 'Home', href: AppRoutes.DASHBOARD, icon: HomeIcon, },
    { children: 'History', href: '#', icon: ClockIcon, },
    { children: 'Balances', href: '#', icon: ScaleIcon, },
    { children: 'Cards', href: '#', icon: CreditCardIcon, },
    { children: 'Recipients', href: '#', icon: UserGroupIcon, },
    { children: 'Reports', href: '#', icon: DocumentChartBarIcon, },
]
const secondaryNavigation: ComponentPropsFrom<typeof NavButton>[] = [
    { children: 'Settings', href: '#', icon: CogIcon },
    { children: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { children: 'Privacy', href: '#', icon: ShieldCheckIcon },
]

interface Props {
    
}

export const navbarAtom = atom(false)


const Navbar: React.FC<Props> = ({}) => {
    const [sidebarOpen, setSidebarOpen] = useAtom(navbarAtom)

    return (<>
        {/* Mobile navbar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
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
                        onClick={() => setSidebarOpen(false)}
                        >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    </Transition.Child>
                    <div className="flex flex-shrink-0 items-center px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                        alt="Easywire logo"
                    />
                    </div>
                    <nav
                    className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                    >
                    <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                            <NavButton 
                            key={typeof item.href === "string" ? item.href : item.href.href!} 
                            {...item}
                            />
                        ))}
                    </div>
                    <div className="mt-6 pt-6">
                        <div className="space-y-1 px-2">
                            {secondaryNavigation.map((item) => (
                                <NavButton 
                                key={typeof item.href === "string" ? item.href : item.href.href!} 
                                {...item}
                                />
                            ))}
                        </div>
                    </div>
                    </nav>
                </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
            </div>
            </Dialog>
        </Transition.Root>
        {/* Mobile navbar */}

        {/* Desktop navbar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                    alt="Easywire logo"
                />
                </div>
                <nav className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                        <NavButton 
                        key={typeof item.href === "string" ? item.href : item.href.href!} 
                        {...item}
                        />
                    ))}
                </div>
                <NavWalletList/>
                <div className="mt-6 pt-6">
                    <div className="space-y-1 px-2">
                    {secondaryNavigation.map((item) => (
                        <NavButton 
                        key={typeof item.href === "string" ? item.href : item.href.href!} 
                        {...item}
                        />
                    ))}
                    </div>
                </div>
                </nav>
            </div>
        </div>
        {/* Desktop navbar */}
    </>)
}


export default Navbar