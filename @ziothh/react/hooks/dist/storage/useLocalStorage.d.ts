declare const useLocalStorage: <T>(key: string, defaultValue: T) => readonly [T | undefined, import("react").Dispatch<import("react").SetStateAction<T>>, () => void];
export default useLocalStorage;
