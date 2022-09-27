import { useEffect } from "react";
import { useTimeout } from ".";
/** Only runs the given `callback` function after the set delay.
 *
 * The countdown will start if one of the `dependencies` has changed.
 *
 * It will then restart everytime another change happens.
*/
const useDebounce = (callback, delay, dependencies = []) => {
    const { clear, reset } = useTimeout(callback, delay);
    // Will restart the countdown every time a change happens
    useEffect(reset, [...dependencies, reset]);
    // Prevents the countdown from starting by default.
    useEffect(clear, []);
};
export default useDebounce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWZmZWN0L3VzZURlYm91bmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsQ0FBQTtBQUc5Qjs7Ozs7RUFLRTtBQUNGLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBb0IsRUFBRSxLQUFhLEVBQUUsZUFBK0IsRUFBRSxFQUFFLEVBQUU7SUFDM0YsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRXBELHlEQUF5RDtJQUN6RCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUUxQyxtREFBbUQ7SUFDbkQsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFHRCxlQUFlLFdBQVcsQ0FBQSJ9