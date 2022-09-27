declare const useEventListener: <T extends keyof DocumentEventMap, E extends Window | EventTarget | Document | HTMLElement = Document>(type: T, listener: (e: DocumentEventMap[T] & {
    target: E;
}) => void, { autoAdd, element, fireOnce, force, }?: {
    element?: E | undefined;
    fireOnce?: boolean | undefined;
    autoAdd?: boolean | undefined;
    /** If this is set to true it wil not check if the element is null. */
    force?: boolean | undefined;
}) => {
    readonly callback: (e: any) => any;
    readonly add: () => void;
    readonly remove: () => void;
    readonly firesOnce: boolean;
    readonly element: E;
};
export default useEventListener;
