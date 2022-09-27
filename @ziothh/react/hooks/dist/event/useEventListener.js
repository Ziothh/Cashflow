import { useEffect, useRef } from "react";
const useEventListener = (type, listener, { autoAdd = true, 
// @ts-ignore
element = document, fireOnce = false, force = false, } = {}) => {
    const listenerRef = useRef();
    listenerRef.current = listener;
    const addEventListener = () => element.addEventListener(type, listenerRef.current, { once: fireOnce });
    const removeEventListener = () => element.removeEventListener(type, listenerRef.current);
    useEffect(() => {
        if (!force && element === null)
            return;
        addEventListener();
        return removeEventListener;
    }, [listenerRef, fireOnce, type, element, force]);
    return {
        callback: listenerRef.current,
        add: addEventListener,
        remove: removeEventListener,
        firesOnce: fireOnce,
        element,
    };
};
export default useEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC91c2VFdmVudExpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBRXpDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDckIsSUFBTyxFQUNQLFFBQXdELEVBQ3hELEVBQ0ksT0FBTyxHQUFHLElBQUk7QUFDZCxhQUFhO0FBQ2IsT0FBTyxHQUFHLFFBQVEsRUFDbEIsUUFBUSxHQUFHLEtBQUssRUFDaEIsS0FBSyxHQUFHLEtBQUssTUFPYixFQUFFLEVBQ1IsRUFBRTtJQUNBLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBbUIsQ0FBQTtJQUM3QyxXQUFXLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtJQUU5QixNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQVEsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFBO0lBQ3JHLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsT0FBUSxDQUFDLENBQUE7SUFFekYsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNYLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUk7WUFBRSxPQUFNO1FBRXRDLGdCQUFnQixFQUFFLENBQUE7UUFDbEIsT0FBTyxtQkFBbUIsQ0FBQTtJQUM5QixDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUVqRCxPQUFPO1FBQ0gsUUFBUSxFQUFFLFdBQVcsQ0FBQyxPQUFPO1FBQzdCLEdBQUcsRUFBRSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixTQUFTLEVBQUUsUUFBUTtRQUNuQixPQUFPO0tBQ0QsQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQUVELGVBQWUsZ0JBQWdCLENBQUEifQ==