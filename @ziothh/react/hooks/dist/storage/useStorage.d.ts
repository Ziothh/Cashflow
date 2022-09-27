/** Returns the `key` value of the storage (or the given `defaultValue` if nothing was found)
 * as `[state, setState, remove]`
 *
 * `remove`: deletes the key value in the storage
*/
declare const useStorage: <T>(key: string, defaultValue: T, storageObject: Storage) => readonly [T | undefined, import("react").Dispatch<import("react").SetStateAction<T>>, () => void];
export default useStorage;
