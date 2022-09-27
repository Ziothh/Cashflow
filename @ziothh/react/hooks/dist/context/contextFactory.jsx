import { createContext, useRef, useContext } from "react";
const contextFactory = (contextValue) => {
    // const stateFunctionRef = useRef(state)
    const ctx = createContext(null);
    const CtxProvider = ({ children }) => {
        const stateFunctionRef = useRef();
        stateFunctionRef.current = contextValue;
        const value = stateFunctionRef.current();
        return <ctx.Provider value={value}>{children}</ctx.Provider>;
    };
    const useCtx = () => useContext(ctx);
    return [CtxProvider, useCtx];
};
export default contextFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dEZhY3RvcnkuanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRleHQvY29udGV4dEZhY3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUxRCxNQUFNLGNBQWMsR0FBRyxDQUFLLFlBQXFCLEVBQUUsRUFBRTtJQUNqRCx5Q0FBeUM7SUFFekMsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFJLElBQUssQ0FBQyxDQUFDO0lBRXBDLE1BQU0sV0FBVyxHQUFzQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtRQUNwRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sRUFBdUIsQ0FBQztRQUN2RCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBRXhDLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVyQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBVSxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVGLGVBQWUsY0FBYyxDQUFDIn0=