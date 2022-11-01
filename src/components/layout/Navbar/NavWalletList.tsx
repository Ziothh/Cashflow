import Link from "next/link"
import { useGetAllWalletsQuery } from "../../../data/queries/wallets"
import WalletColorDot from "../../../features/wallets/WalletColorDot"
import { trpc, useQuery } from "../../../utils/trpc"

interface Props {
    
}


const NavWalletList: React.FC<Props> = ({}) => {
    const {
        data, 
        isLoading,
    } = useGetAllWalletsQuery()

    return (
        <div className="">
            {/* <!-- Secondary navigation --> */}
            <h3 className="px-3 text-sm mb-1 font-medium text-gray-300">
                Wallets
            </h3>
            {data && (
            <ul>
                {data.map(w => (
                    (<Link
                        key={w.id}
                        href={`/wallets/${w.id}`}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">

                        <WalletColorDot wallet={w}/>
                        <span className="ml-4 truncate">{w.name}</span>

                    </Link>)
                ))}
            </ul>
            )}
        </div>
    );
}


export default NavWalletList