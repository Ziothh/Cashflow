import { createContext, useContext, useReducer } from "react";
const createStore = (reducer, initialState) => {
    const context = createContext(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const StoreProvider = ({ children }) => {
        return (<context.Provider value={{
                store: state,
                dispatch
            }}>
                {children}
            </context.Provider>);
    };
    const useDispatch = () => {
        const { dispatch } = useContext(context);
        return dispatch;
    };
    const useStore = () => {
        const { store } = useContext(context);
        return store;
    };
    return [StoreProvider, useStore, useDispatch];
};
export default createStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU3RvcmUuanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRleHQvY3JlYXRlU3RvcmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUc3RCxNQUFNLFdBQVcsR0FBRyxDQUloQixPQUFnQixFQUNoQixZQUFtQixFQUNyQixFQUFFO0lBQ0EsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUcxQixJQUFLLENBQUMsQ0FBQTtJQUVULE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUNoQyxPQUFPLEVBQ04sWUFBNEMsQ0FDaEQsQ0FBQTtJQUVELE1BQU0sYUFBYSxHQUFzQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtRQUN0RSxPQUFPLENBQ0gsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixLQUFLLEVBQUcsS0FBZTtnQkFDdkIsUUFBUTthQUNYLENBQUMsQ0FDRTtnQkFBQSxDQUFDLFFBQVEsQ0FDYjtZQUFBLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUN0QixDQUFBO0lBQ0wsQ0FBQyxDQUFBO0lBRUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3JCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDeEMsT0FBTyxRQUFRLENBQUE7SUFDbkIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkMsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBRUQsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFVLENBQUE7QUFDMUQsQ0FBQyxDQUFBO0FBRUQsZUFBZSxXQUFXLENBQUEifQ==