import { useEffect, useRef } from "react"

interface IKeyMap {[key: string]: () => void}

const useKeypress = <Map extends {normal?: IKeyMap, meta?: IKeyMap}>(map: Map) => {
    const {meta, normal} = map

    // const heldKeysRef = useRef({
    //     cmd: false,
    // })

    const keydown = (e: KeyboardEvent) => {
        const mapVariant = e.metaKey ? meta : normal

        if (mapVariant === undefined) return 

        const action = mapVariant[e.key]

        if (action === undefined) return

        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        action()
    }
    // const keyup = (e: KeyboardEvent) => {

    // }
    const mount = () => {
        document.addEventListener("keydown", keydown)
        // document.addEventListener("keydown", keyup)
    }
    const unmount = () => {
        document.removeEventListener("keyup", keydown)
        // document.removeEventListener("keyup", keyup)
    }

    
    useEffect(() => {
        mount()

        return unmount
    }, [map])

    return {
        mount,
        unmount,
        map,
    }
}


export default useKeypress