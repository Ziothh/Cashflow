import Link from "next/link"
import { trpc, useQuery } from "../../../utils/trpc"

interface Props {
    
}


const NavWalletList: React.FC<Props> = ({}) => {
    const {
        data, 
        isLoading,
    } = useQuery(["wallet.getAll"])

    return (
        <div className="">
            {/* <!-- Secondary navigation --> */}
            <h3 className="px-3 text-sm mb-1 font-medium text-gray-300">
                Wallets
            </h3>
            {data && (
            <ul>
                {data.map(w => (
                    <Link key={w.id} href={`/wallets/${w.id}`}>
                        <a className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            <span className="w-2.5 h-2.5 mr-4 rounded-full" style={{backgroundColor: w.color}} aria-hidden="true"></span>
                            <span className="truncate">{w.name}</span>
                        </a>
                    </Link>
                ))}
            </ul>
            )}
        </div>
    )
}


export default NavWalletList