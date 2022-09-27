declare const useSessionStorage: <T>(key: string, defaultValue: T) => readonly [T | undefined, import("react").Dispatch<import("react").SetStateAction<T>>, () => void];
export default useSessionStorage;
