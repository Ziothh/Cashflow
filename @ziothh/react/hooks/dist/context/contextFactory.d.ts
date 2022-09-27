declare const contextFactory: <T>(contextValue: () => T) => readonly [import("react").FC<{
    children?: import("react").ReactNode;
}>, () => T];
export default contextFactory;
