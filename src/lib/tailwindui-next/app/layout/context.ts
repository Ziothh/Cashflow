import { contextFactory, useStateObject } from "@ziothh/react-hooks";

export const [LayoutContext, useLayoutCtx] = contextFactory(() => {
    const navOpen = useStateObject(false)

    return {
        navOpen
    }
})