import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

interface Props {
    
}


const Layout: React.FC<PropsWithChildren<Props>> = ({children}) => {
    const {data} = useSession({
        required: true
    })

    return (
        <div>
            {JSON.stringify(data)}
            {children}
        </div>
    )
}


export default Layout