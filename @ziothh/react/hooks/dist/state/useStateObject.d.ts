declare const useStateObject: <T>(defaultValue: T) => StateObject<T>;
export declare type StateObject<T> = {
    value: T;
    set: React.Dispatch<React.SetStateAction<T>>;
};
export default useStateObject;
