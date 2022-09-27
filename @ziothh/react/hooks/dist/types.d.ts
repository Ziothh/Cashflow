export interface DefaultProps {
    id?: string;
    className?: string;
}
export interface PassedState<T> {
    value: T;
    set: React.Dispatch<React.SetStateAction<T>>;
}
export interface StateObject<T> {
    value: T;
    set: React.Dispatch<React.SetStateAction<T>>;
}
