import { Form, Formik, FormikConfig, FormikProps, FormikSharedConfig, FormikValues } from "formik"
import { FC, Fragment, PropsWithChildren, ReactNode } from "react"

interface Props<Readonly extends boolean,> {
    title: ReactNode
    description?: ReactNode
    readonly?: Readonly
    enableReinitialize?: boolean

    buttons?: ReactNode | (() => ReactNode) | FC<{}> 
}


const FormGroup = <Readonly extends boolean = false, Values extends FormikValues = FormikValues, >({
    title,
    children,
    description,
    // @ts-ignore
    readonly = false,
    enableReinitialize = false,
    buttons,
    ...formikProps
}: PropsWithChildren<Props<Readonly>> & (Readonly extends false ? (Omit<FormikConfig<Values>, "children"> & {enableReinitialize?: boolean}) : {initialValues: Values})): JSX.Element => {
    const Wrapper: FC<PropsWithChildren> = readonly === false 
    // @ts-ignore
    ? ({children}) => <Formik {...formikProps} enableReinitialize={enableReinitialize}><Form>{children}</Form></Formik>
    : Fragment

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1 py-6">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-sm text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <Wrapper>
                    <div className="shadow rounded-md">
                        <div className={`space-y-6 bg-white px-4 py-5 sm:p-6 ${readonly ? "rounded-md" : "rounded-t-md"}`}>
                            {children}
                        </div>
                        {(readonly !== true || buttons) && (
                            <div className="bg-gray-50 px-4 py-3 text-right rounded-b-md sm:px-6 gap-2 flex justify-end">
                                {buttons && (
                                    typeof buttons === "function"
                                    ? buttons({})
                                    : buttons
                                )}
                                {readonly !== true && (
                                    <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </Wrapper>
            </div>
        </div>
    )
}


export default FormGroup