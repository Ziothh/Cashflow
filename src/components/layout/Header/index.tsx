import { Menu, Transition } from "@headlessui/react"
import { Bars3CenterLeftIcon, BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { Fragment } from "react"
import { navbarAtom } from "../Navbar"
import SearchInput from "./SearchInput"

interface Props {
    
}


const Header: React.FC<Props> = ({}) => {
    const [_, setSidebarOpen] = useAtom(navbarAtom)
    const {data: session} = useSession()
    const user = session!.user!

    return (
        <div className="flex h-16 flex-shrink-0 border-b border-gray-200 z-[5] bg-white sticky top-0">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Search bar */}
        <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:px-8">
          <div className="flex flex-1">
            <SearchInput/>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.image!}
                    alt=""
                  />
                  <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                    <span className="sr-only">Open user menu for </span> {user.name}
                  </span>
                  <ChevronDownIcon
                    className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    )
}


export default Header