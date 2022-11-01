import "@node_modules/react-toastify/dist/ReactToastify.css";
import { inferProcedureInput, inferProcedureOutput, ProcedureRecord } from "@trpc/server";
import { useId } from "react";
import { toast } from "react-toastify";
import { AppRouter } from "../server/router";
import { useMutation } from "./trpc";

type inferProcedures<
  TObj extends ProcedureRecord<any, any, any, any, any, any>,
> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>;
    output: inferProcedureOutput<TObj[TPath]>;
  };
};

// @ts-ignore
type TUseMutation<TPath, TContext> = typeof useMutation<TPath, TContext>
// @ts-ignore
type TUseMutationParameters<TPath, TContext> = Parameters<TUseMutation<TPath, TContext>>
type TUseMutationReturn<TPath, TContext> = ReturnType<TUseMutation<TPath, TContext>>

type TUseMutationVariables<TPath, TContext> = Parameters<TUseMutationReturn<TPath, TContext>["mutateAsync"]>[0]

type TUseMutationOptions<TPath, TContext> = NonNullable<Parameters<TUseMutation<TPath, TContext>>[1]>

export const useToastifyMutation = <
    TPath extends keyof inferProcedures<AppRouter['_def']['mutations']> & string,
    TContext = unknown,
>(
    path: TUseMutationParameters<TPath, TContext>[0],
    messages: {
        pending?: ((variables: TUseMutationVariables<TPath, TContext>) => string) | string,
        success?: ((
            response: Parameters<NonNullable<TUseMutationOptions<TPath, TContext>["onSuccess"]>>["0"],
            variables: Parameters<NonNullable<TUseMutationOptions<TPath, TContext>["onSuccess"]>>["1"]
        ) => string) | string,
        error?: ((
            error: Parameters<NonNullable<TUseMutationOptions<TPath, TContext>["onError"]>>["0"],
            variables: Parameters<NonNullable<TUseMutationOptions<TPath, TContext>["onError"]>>["1"],
        ) => string) | string
    } = {},
    opts: TUseMutationParameters<TPath, TContext>[1] = {},
) => {
    // const toastIdRef = useRef<Id | null>(null)
    const id = useId()

    const parsedPath = typeof path === "string" ? path : JSON.stringify(path)

    return useMutation(path, {
        ...opts,

        onMutate(variables) {
            const pending = messages.pending ?? `Mutating ${parsedPath}`


            toast(
                typeof pending === "string"
                ? pending
                : pending(variables),
                {
                    isLoading: true,
                    toastId: id,
                    autoClose: 2000,
                    hideProgressBar: false,
                }
            )

            opts.onMutate?.(variables)
        },
        onSuccess(data, variables, context) {
            const success = messages.success ?? `Success while mutating ${parsedPath}`

            toast.update(id, {
                type: "success",
                isLoading: false,
                render: typeof success === "string" ? success : success(data, variables),
                autoClose: 2000,
                hideProgressBar: false, 
            })

            opts.onSuccess?.(data, variables, context)
        },
        onError(error, variables, context) {
            const errorMsg = messages.error ?? `Error while mutating ${parsedPath}.\n${error.message}`

            toast.update(id, {
                type: "error",
                isLoading: false,
                render: typeof errorMsg === "string" ? errorMsg : errorMsg(error, variables),
                autoClose: 2000,
                hideProgressBar: false, 
            })

            opts.onError?.(error, variables, context)
        },
    })
}
