import type { DependencyList } from "react";
declare const useFetch: <PromiseDataType, ErrorType = any>(url: string, options?: RequestInit | undefined, dependencies?: DependencyList) => {
    loading: boolean;
    error: ErrorType | undefined;
    data: PromiseDataType | undefined;
};
export default useFetch;
