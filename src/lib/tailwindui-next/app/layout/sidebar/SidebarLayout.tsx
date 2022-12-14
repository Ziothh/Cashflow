import { GetProps } from '@ziothh/tailwindui-next/common/utils/typescript'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { createLayout } from '../utils'
import SidebarNav from './SidebarNav'

interface Props {
    navbar: ReactNode
}

const SidebarLayout: FC<PropsWithChildren<PropsWithChildren<Props>>> = createLayout(({
    navbar: Navbar,
    children
}) => {
  return (
    <div className='min-h-screen max-h-screen overflow-y-auto bg-gray-100 flex'>
        {Navbar}


        <div className="flex flex-1 flex-col min-h-full max-h-screen overflow-y-auto">
            {children}
        </div>
    </div>
  )
})


export default SidebarLayout