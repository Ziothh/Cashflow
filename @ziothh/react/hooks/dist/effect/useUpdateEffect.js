import { useEffect, useRef } from "react";
/** A variation of the `useEffect` React hook.
 *
 * Doesn't run the first time the component renders and only runs when
 * a value inside de dependency list changes.
*/
const useUpdateEffect = (callback, dependencies) => {
    // Tells the function if the component is on it's first render
    const firstRenderRef = useRef(true);
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
};
export default useUpdateEffect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVXBkYXRlRWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VmZmVjdC91c2VVcGRhdGVFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFFekM7Ozs7RUFJRTtBQUNGLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBb0IsRUFBRSxZQUE0QixFQUFFLEVBQUU7SUFDM0UsOERBQThEO0lBQzlELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUduQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQ3hCLGNBQWMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO1lBQzlCLE9BQU07U0FDVDtRQUNELE9BQU8sUUFBUSxFQUFFLENBQUE7SUFDckIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELGVBQWUsZUFBZSxDQUFBIn0=