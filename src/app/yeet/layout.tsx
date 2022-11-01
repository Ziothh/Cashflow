import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import {} from "next-auth"

interface Props {
    
}


const Layout: React.FC<PropsWithChcildren<Props>> = async ({children}) => {
    // const {data} = useSession({
    //     required: true
    // })
    const session = await getServerAuthSession({

    })
    return (
        <div>
            {JSON.stringify(data)}
            {children}
        </div>
    )
}


export default Layout