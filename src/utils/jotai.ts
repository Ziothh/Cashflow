import { atom, useAtom,} from "jotai"

// export const createAtom = <
//     Value, 
//     Update, 
//     Result extends void | Promise<void> = void
// >(
//     ...params: Parameters<typeof atom<Value, Update, Result>>
// ) => {
//     const a = atom(...params)

//     return () => useAtom(a)
// }