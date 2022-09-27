/** Will run the given `callback` function after the given `delay`.
 *
 * Returns:
 *  - `clear`: a function that removes the current timeout.
 *  - `reset`: a function that removes the current timeout and starts a new one.
 */
declare const useTimeout: (callback: () => void, delay: number, runOnFirstComponentRender?: boolean) => {
    reset: () => void;
    clear: () => void;
};
export default useTimeout;
