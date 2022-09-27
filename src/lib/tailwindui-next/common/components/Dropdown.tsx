import { AnchorHTMLAttributes, DetailedHTMLProps, FC, Fragment, PropsWithChildren, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'

interface Props {
    className?: string
    buttons: {
        label: ReactNode,
        onClick?: DetailedHTMLProps<AnchorHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>["onClick"]
        icon?: FC<{className: string}>
    }[][]
}


const Dropdown: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
    buttons = [],
}) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={classNames(
                    `inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100`,
                    children && "px-4",
                    !children && "px-2",
                    className,
                )}>
                    {children && children}
                    <ChevronDownIcon 
                    className={classNames(
                        "h-5 w-5", 
                        children && "-mr-1 ml-2",
                    )} 
                    aria-hidden="true" 
                    />
                </Menu.Button>
            </div>
    
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {buttons.map((g, gi) => (
                    <div key={gi} className="py-1 px-1">
                        {g.map((b, bi) => (
                            <Menu.Item key={typeof b.label === "string" ? b.label : `${gi}-${bi}`}>
                                {({ active }) => (
                                <button
                                    onClick={b.onClick}
                                    className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm w-full rounded-md'
                                    )}
                                >
                                    {b.icon && (
                                        <b.icon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                        />
                                    )}
                                    {b.label}
                                </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                ))}
            </Menu.Items>
            </Transition>
      </Menu>
    )
}


export default Dropdown