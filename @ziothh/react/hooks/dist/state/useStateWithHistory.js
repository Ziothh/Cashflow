import { useCallback, useRef, useState } from "react";
const useStateWithHistory = (defaultValue, capacity = 10) => {
    const [state, setState] = useState(defaultValue);
    const historyRef = useRef([state]);
    const pointerRef = useRef(0);
    const setCurrentlyActiveValue = (index) => setState(historyRef.current[index]);
    /** Wrapper for the setState action */
    const setStateWrapper = useCallback((value) => {
        const resolvedValue = typeof value === "function" ? value(state) : value;
        if (historyRef.current[pointerRef.current] !== resolvedValue) {
            if (pointerRef.current < historyRef.current.length - 1) {
                historyRef.current.splice(pointerRef.current + 1);
            }
            historyRef.current.push(resolvedValue);
            while (historyRef.current.length > capacity) {
                // Remove the first state histories
                historyRef.current.shift();
            }
            pointerRef.current = historyRef.current.length - 1;
        }
        setState(resolvedValue);
    }, [state, capacity]);
    const back = useCallback(() => {
        if (pointerRef.current <= 0)
            return;
        pointerRef.current--;
        setCurrentlyActiveValue(pointerRef.current);
    }, []);
    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1)
            return;
        pointerRef.current++;
        setCurrentlyActiveValue(pointerRef.current);
    }, []);
    const go = useCallback((index) => {
        const historyLength = historyRef.current.length;
        if (index >= 0) {
            // Positive index
            if (index >= historyLength)
                return;
            pointerRef.current = index;
        }
        else {
            // Negative index
            const absIndex = Math.abs(index);
            if (absIndex > historyLength)
                return;
            pointerRef.current = historyLength - absIndex;
        }
        setCurrentlyActiveValue(pointerRef.current);
    }, []);
    return [
        state,
        setStateWrapper,
        {
            history: historyRef.current,
            pointerRef: pointerRef.current,
            back,
            forward,
            go
        }
    ];
};
export default useStateWithHistory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU3RhdGVXaXRoSGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdGF0ZS91c2VTdGF0ZVdpdGhIaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUVyRCxNQUFNLG1CQUFtQixHQUFHLENBQUksWUFBZSxFQUFFLFdBQW1CLEVBQUUsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRWhELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTVCLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFFdEYsc0NBQXNDO0lBQ3RDLE1BQU0sZUFBZSxHQUE0QyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNuRixNQUFNLGFBQWEsR0FBTSxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFFLEtBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBRXBGLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBYSxFQUFFO1lBQzFELElBQUksVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BELFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDcEQ7WUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUV0QyxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRTtnQkFDekMsbUNBQW1DO2dCQUNuQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO2FBQzdCO1lBRUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDckQ7UUFFRCxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDM0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFFckIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUMxQixJQUFJLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQztZQUFFLE9BQU07UUFFbkMsVUFBVSxDQUFDLE9BQU8sRUFBRyxDQUFBO1FBQ3JCLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFFTixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQzdCLElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTTtRQUUvRCxVQUFVLENBQUMsT0FBTyxFQUFHLENBQUE7UUFDckIsdUJBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUVOLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFBO1FBRS9DLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLGlCQUFpQjtZQUNqQixJQUFJLEtBQUssSUFBSSxhQUFhO2dCQUFFLE9BQU07WUFDbEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7U0FDN0I7YUFBTTtZQUNILGlCQUFpQjtZQUNqQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hDLElBQUksUUFBUSxHQUFHLGFBQWE7Z0JBQUUsT0FBTTtZQUNwQyxVQUFVLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUE7U0FDaEQ7UUFFRCx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sT0FBTztRQUNILEtBQUs7UUFDTCxlQUFlO1FBQ2Y7WUFDSSxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87WUFDM0IsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPO1lBQzlCLElBQUk7WUFDSixPQUFPO1lBQ1AsRUFBRTtTQUNMO0tBQ0osQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVELGVBQWUsbUJBQW1CLENBQUEifQ==