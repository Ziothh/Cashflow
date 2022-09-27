import { useCallback, useEffect, useRef } from "react";
import { useUpdateEffect } from ".";
/** Will run the given `callback` function after the given `delay`.
 *
 * Returns:
 *  - `clear`: a function that removes the current timeout.
 *  - `reset`: a function that removes the current timeout and starts a new one.
 */
const useTimeout = (callback, delay, runOnFirstComponentRender = true) => {
    // Using refs instead of passing a function with useCallback when calling useTimeout
    const callbackRef = useRef(callback);
    const timeoutRef = useRef();
    // Updates the callback function everytime it changes changes 
    // ( => on component render)
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);
    /** Removes the set timeout. */
    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);
    // Should run on first component render or not
    const effectMethod = runOnFirstComponentRender ? useEffect : useUpdateEffect;
    effectMethod(() => {
        set();
        return clear;
    }, [delay, set, clear]);
    /** Removes the current timeout (if it hasn't completed yet)
     * and sets a new one. */
    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);
    return {
        reset,
        clear
    };
};
export default useTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZmZlY3QvdXNlVGltZW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEdBQUcsQ0FBQTtBQUVuQzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBb0IsRUFBRSxLQUFhLEVBQUUsNEJBQXFDLElBQUksRUFBRSxFQUFFO0lBQ2xHLG9GQUFvRjtJQUNwRixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxFQUFPLENBQUE7SUFFaEMsOERBQThEO0lBQzlELDRCQUE0QjtJQUM1QixTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsV0FBVyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7SUFDbEMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUdkLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDekIsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFFWCwrQkFBK0I7SUFDL0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUMzQixVQUFVLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDMUQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sOENBQThDO0lBQzlDLE1BQU0sWUFBWSxHQUFHLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQTtJQUU1RSxZQUFZLENBQUMsR0FBRyxFQUFFO1FBQ2QsR0FBRyxFQUFFLENBQUE7UUFDTCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFHdkI7NkJBQ3lCO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDM0IsS0FBSyxFQUFFLENBQUE7UUFDUCxHQUFHLEVBQUUsQ0FBQTtJQUNULENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBR2hCLE9BQU87UUFDSCxLQUFLO1FBQ0wsS0FBSztLQUNSLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFRCxlQUFlLFVBQVUsQ0FBQSJ9