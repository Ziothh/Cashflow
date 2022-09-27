import type { DependencyList } from "react";
declare const useAsync: <PromiseDataType, ErrorType = any>(callback: () => Promise<PromiseDataType>, dependencies?: DependencyList) => {
    loading: boolean;
    error: ErrorType | undefined;
    data: PromiseDataType | undefined;
};
export default useAsync;
