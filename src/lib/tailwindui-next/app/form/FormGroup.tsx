import { PropsWithChildren, ReactNode } from "react"

interface Props {
    title: ReactNode
    description?: ReactNode

}


const FormGroup: React.FC<PropsWithChildren<Props>> = ({
    title,
    children,
    description,
}) => {
    return (
        <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-lg font-medium leading-6 text-gray-900">{title}</h2>
                        {description && (
                            <p className="mt-1 text-sm text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                {children}
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default FormGroup