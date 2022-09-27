declare const createStore: <State, Reducer extends import("react").Reducer<State, any>>(reducer: Reducer, initialState: State) => readonly [import("react").FC<{
    children?: import("react").ReactNode;
}>, () => State, () => import("react").Dispatch<import("react").ReducerAction<Reducer>>];
export default createStore;
