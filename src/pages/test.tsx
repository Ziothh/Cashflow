import { useQuery } from "../utils/trpc"

interface Props {
    
}


const Page: React.FC<Props> = ({}) => {
    // const {data} = useQuery(["banking.test"], {
    //     refetchOnMount: false,
    //     staleTime: Infinity,
    //     refetchOnReconnect: false,
    //     refetchOnWindowFocus: false,
    // })

    return (
        <div className="">
            <pre>
                {/* {JSON.stringify(data, null, 4)} */}
            </pre>
        </div>
    )
}


export default Page