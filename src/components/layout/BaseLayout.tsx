import SidebarLayout from "@ziothh/tailwindui-next/app/layout/sidebar/SidebarLayout"
import SidebarNav from "@ziothh/tailwindui-next/app/layout/sidebar/SidebarNav"
import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"
import { AppRoutes } from "../../config/routes"
import { ComponentPropsFrom } from "../../utils/types"
import Header from "./Header"
import Navbar from "./Navbar"
import { BanknotesIcon, CakeIcon, ClockIcon, CogIcon, CreditCardIcon, DocumentChartBarIcon, HomeIcon, QuestionMarkCircleIcon, ScaleIcon, ShieldCheckIcon, UserGroupIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import NavButton from "./Navbar/NavButton"
import NavWalletList from "./Navbar/NavWalletList"

const navigation: ComponentPropsFrom<typeof SidebarNav>["links"][number] = [
    { name: 'Home', href: AppRoutes.DASHBOARD, icon: HomeIcon, },
    { name: 'History', href: '#', icon: ClockIcon, },
    { name: 'Balances', href: '#', icon: ScaleIcon, },
    { name: 'Transactions', href: AppRoutes.TRANSACTIONS(), icon: BanknotesIcon, },
    { name: 'Wallets', href: '#', icon: WalletIcon, },
    { name: 'Recipients', href: AppRoutes.RECIPIENTS(), icon: UserGroupIcon, },
    { name: 'Wishlists', href: '#', icon: CakeIcon, },
    { name: 'Reports', href: '#', icon: DocumentChartBarIcon, },
]
const secondaryNavigation: ComponentPropsFrom<typeof SidebarNav>["links"][number] = [
    { name: 'Settings', href: '#', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]


interface Props {
    
}


const BaseLayout: React.FC<PropsWithChildren<Props>> = ({children}) => {
    const {data} = useSession({
        required: true
    })

    if (!data) return null // TODO: move this to middleware

    return (
        <SidebarLayout navbar={
            <SidebarNav 
            logo={(
                <div className="flex text-gray-100 font-extrabold text-xl items-center gap-4">
                    <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    />

                    <p>Cashflow</p>
                </div>
            )}
            links={[
                navigation,
                NavWalletList,
                secondaryNavigation,
            ]} 
            />
        }>
            
            
            {/* Content */}
            <div className="flex flex-1 flex-col">
                <Header/>

                <main className="flex-1 pb-8">
                
                {children}
                </main>
            </div>
        </SidebarLayout>
        
    )
}


export default BaseLayout