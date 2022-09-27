declare const useArray: <T>(defaultValue: T[]) => {
    value: T[];
    push: (element: T) => void;
    remove: (index: number) => void;
    filter: (callback: (value: T, index: number, array: T[]) => unknown) => void;
    update: (index: number, newElement: T) => void;
};
export default useArray;
