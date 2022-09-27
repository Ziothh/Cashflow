import type { DependencyList } from "react";
/** A variation of the `useEffect` React hook.
 *
 * Doesn't run the first time the component renders and only runs when
 * a value inside de dependency list changes.
*/
declare const useUpdateEffect: (callback: () => void, dependencies: DependencyList) => void;
export default useUpdateEffect;
