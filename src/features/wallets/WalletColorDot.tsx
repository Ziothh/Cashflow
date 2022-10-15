import { Wallet } from "@prisma/client"

interface Props {
    wallet: Wallet
}


const WalletColorDot: React.FC<Props> = ({
    wallet
}) => {
    return (
        <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: wallet.color}} aria-hidden="true"></span>
    )
}


export default WalletColorDot