import type { DependencyList } from "react";
/** Only runs the given `callback` function after the set delay.
 *
 * The countdown will start if one of the `dependencies` has changed.
 *
 * It will then restart everytime another change happens.
*/
declare const useDebounce: (callback: () => void, delay: number, dependencies?: DependencyList) => void;
export default useDebounce;
