import useStorage from "./useStorage"

const useSessionStorage = <T>(key: string, defaultValue: T) => {
    return useStorage<T>(key, defaultValue, window.sessionStorage)
}

export default useSessionStorage
