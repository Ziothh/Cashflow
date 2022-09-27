import { useCallback, useEffect, useState } from "react";
/** Returns the `key` value of the storage (or the given `defaultValue` if nothing was found)
 * as `[state, setState, remove]`
 *
 * `remove`: deletes the key value in the storage
*/
const useStorage = (key, defaultValue, storageObject) => {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null)
            return JSON.parse(jsonValue);
        return typeof defaultValue === "function"
            ? defaultValue()
            : defaultValue;
    });
    useEffect(() => {
        if (value === undefined)
            return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);
    const remove = useCallback(() => {
        setValue(undefined);
    }, []);
    return [
        value,
        setValue,
        remove
    ];
};
export default useStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yYWdlL3VzZVN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBRXhEOzs7O0VBSUU7QUFDRixNQUFNLFVBQVUsR0FBRyxDQUFJLEdBQVcsRUFBRSxZQUFlLEVBQUUsYUFBc0IsRUFBRSxFQUFFO0lBQzNFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFnQixHQUFHLEVBQUU7UUFDbkQsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU1QyxJQUFJLFNBQVMsSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRW5ELE9BQU8sT0FBTyxZQUFZLEtBQUssVUFBVTtZQUNyQyxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ2hCLENBQUMsQ0FBQyxZQUFZLENBQUE7SUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsSUFBSSxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU3RCxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDckQsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBRS9CLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUVOLE9BQU87UUFDRixLQUF1QjtRQUN2QixRQUFvRDtRQUNyRCxNQUFNO0tBQ0EsQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQUVELGVBQWUsVUFBVSxDQUFBIn0=