declare const useStateWithHistory: <T>(defaultValue: T, capacity?: number) => (T | import("react").Dispatch<import("react").SetStateAction<T>> | {
    history: T[];
    pointerRef: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
})[];
export default useStateWithHistory;
