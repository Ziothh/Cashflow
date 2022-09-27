import { useEffect, useRef } from "react"

const useEventListener = <T extends keyof DocumentEventMap, E extends HTMLElement | Document | Window | EventTarget = Document>(
    type: T, 
    listener: (e: DocumentEventMap[T] & {target: E}) => void,
    {
        autoAdd = true,
        // @ts-ignore
        element = document,
        fireOnce = false,
        force = false,
    }: {
        element?: E,
        fireOnce?: boolean
        autoAdd?: boolean,
        /** If this is set to true it wil not check if the element is null. */
        force?: boolean,
    } = {}
) => {
    const listenerRef = useRef<(e: any) => any>()
    listenerRef.current = listener

    const addEventListener = () => element.addEventListener(type, listenerRef.current!, {once: fireOnce})
    const removeEventListener = () => element.removeEventListener(type, listenerRef.current!)
   
    useEffect(() => {
        if (!force && element === null) return

        addEventListener()
        return removeEventListener
    }, [listenerRef, fireOnce, type, element, force])

    return {
        callback: listenerRef.current,
        add: addEventListener,
        remove: removeEventListener,
        firesOnce: fireOnce,
        element,
    } as const
}

export default useEventListener
