import { useEffect, useRef } from "react";
const useClickOutside = (elementRef, callback) => {
    const callbackRef = useRef();
    callbackRef.current = callback;
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (elementRef?.current?.contains(e.target))
                return;
            callbackRef.current(e);
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [callbackRef, elementRef]);
};
export default useClickOutside;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ2xpY2tPdXRzaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50L3VzZUNsaWNrT3V0c2lkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUV6QyxNQUFNLGVBQWUsR0FBRyxDQUNwQixVQUErQyxFQUMvQyxRQUFpQyxFQUNuQyxFQUFFO0lBQ0EsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUEyQixDQUFBO0lBQ3JELFdBQVcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBO0lBRTdCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWixNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDekMsSUFBSSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUMsTUFBa0IsQ0FBQztnQkFBRSxPQUFNO1lBQ2hFLFdBQVcsQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUU1RCxPQUFPLEdBQUcsRUFBRTtZQUNSLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbkUsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFBO0FBRUQsZUFBZSxlQUFlLENBQUEifQ==