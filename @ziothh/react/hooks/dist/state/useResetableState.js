import { useState } from "react";
const useResetableState = (defaultValue) => {
    const [state, setState] = useState(defaultValue);
    return {
        value: state,
        set: setState,
        reset: () => setState(defaultValue)
    };
};
export default useResetableState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUmVzZXRhYmxlU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdGUvdXNlUmVzZXRhYmxlU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUdoQyxNQUFNLGlCQUFpQixHQUFHLENBQUksWUFBZSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUksWUFBWSxDQUFDLENBQUE7SUFFbkQsT0FBTztRQUNILEtBQUssRUFBRSxLQUFLO1FBQ1osR0FBRyxFQUFFLFFBQVE7UUFDYixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztLQUN0QyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBTUQsZUFBZSxpQkFBaUIsQ0FBQSJ9