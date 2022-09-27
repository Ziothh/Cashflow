import { StateObject } from "./useStateObject";
declare const useResetableState: <T>(defaultValue: T) => {
    value: T;
    set: import("react").Dispatch<import("react").SetStateAction<T>>;
    reset: () => void;
};
export interface ResetableStateObject<T> extends StateObject<T> {
    reset: () => void;
}
export default useResetableState;
