"use client"

import { useState } from "react";

interface Props {
    
}


const Page: React.FC<Props> = ({}) => {
    console.log(process.env);
    // const data = await fetch("http://localhost:3000/api/test").then(res => res.json())
    const data = "client"

    const [show, setShow] = useState(true)

    console.log(data)
    return (
        <div>
            hiii
            {show && <pre>{JSON.stringify(data, null, 4)}</pre>}
        </div>
    )
}


export default Page