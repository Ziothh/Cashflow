// declare namespace MyTypes {
//     namespace ReactJS {
//         interface DefaultProps {
//             id?: string,
//             className?: string
//         }

//         interface PassedState<T> {
//             value: T
//             set: React.Dispatch<React.SetStateAction<T>>
//         }


//         type StateObject<T> = {
//             value: T
//             set: React.Dispatch<React.SetStateAction<T>>
//             options?: T extends any[]
//             ? T 
//             : T extends Set<any>
//                 ? any[]
//                 : T[]
//         }
//     }
// }

export interface DefaultProps {
    id?: string,
    className?: string
}

export interface PassedState<T> {
    value: T
    set: React.Dispatch<React.SetStateAction<T>>
}

export interface StateObject<T> {
    value: T
    set: React.Dispatch<React.SetStateAction<T>>
}