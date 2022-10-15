import InputWithLabel from "@ziothh/tailwindui-next/app/form/elements/withLabel/Input.withLabel"
import TextareaWithLabel from "@ziothh/tailwindui-next/app/form/elements/withLabel/Textarea.withLabel"
import FormGroup from "@ziothh/tailwindui-next/app/form/wrappers/FormGroup"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import DefaultPageLayout from "../../components/layout/page/DefaultPageLayout"
import { useGetAllWalletsQuery } from "../../data/queries/wallets"
import { transactionUpdateValidator } from "../../shared/validators"
import {toFormikValidationSchema} from "zod-formik-adapter"
import { useQuery } from "../../utils/trpc"
import { FormikInput, FormikSelect } from "@ziothh/tailwindui-next/app/form/elements/withFormik"
import FormikTextarea from "@ziothh/tailwindui-next/app/form/elements/withFormik/Textarea.formik"
import { SelectWithLabel } from "@ziothh/tailwindui-next/app/form/elements/withLabel"
import WalletColorDot from "../../features/wallets/WalletColorDot"
import FormikEnumSelect from "@ziothh/tailwindui-next/app/form/elements/withFormik/EnumSelect.formik.tsx"
import { TransactionStatus, TransactionType } from "@prisma/client"

const schema = toFormikValidationSchema(transactionUpdateValidator())

interface Props {
    
}


const Page: React.FC<Props> = ({}) => {
    const router = useRouter()
    const {data: wallets} = useGetAllWalletsQuery(true)

    const {data: transaction} = useQuery(["transaction.getOne.full", {
        id: router.query.id as string,
    }], {
        suspense: true,
    })

    if (!wallets || !transaction) return null

    return (
        <DefaultPageLayout
        title={`Edit transaction: ${transaction.name}`}
        >
            <pre>
                {JSON.stringify(transaction, null, 4)}
            </pre>
            <div className="grid grid-cols-1 auto-rows-auto gap-8">
                <FormGroup title="General"
                initialValues={transaction!}
                validationSchema={schema}
                onSubmit={(values, helpers,) => {
                    console.debug(values);
                }}
                >
                    <FormikInput
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="My transaction"
                    // tip="Write a few sentences about yourself."
                    />
                    <FormikInput
                    label="Amount"
                    type="number"
                    name="amount"
                    readOnly
                    // tip="Write a few sentences about yourself."
                    />
                    <FormikSelect
                    label="Wallet"
                    name="walletId"
                    // value={wallets.find(w => w.id === transaction.walletId)!}
                    options={wallets.map(w => w.id)}
                    // onChange={nv => console.log(nv)}
                    optionParser={id => {
                        const wallet = wallets.find(w => w.id === id)!

                        return {
                            label: wallet.name,
                            before: <WalletColorDot wallet={wallet} />
                        }
                    }}
                    />
                    <FormikEnumSelect
                    label="Type"
                    name="type"
                    enum={TransactionType}
                    /> 
                    <FormikEnumSelect
                    label="Status"
                    name="status"
                    enum={TransactionStatus}
                    /> 
                    <FormikTextarea
                    label="Description"
                    name="description"
                    />
                    <FormikInput
                    label="Bank reference ID"
                    type="text"
                    name="referenceId"
                    readOnly
                    // tip="Write a few sentences about yourself."
                    />
                </FormGroup>
                <FormGroup title={"Additional Information"}
                description="Inconsistent data received from the Open Banking API"
                initialValues={transaction!}
                readonly={true}
                >
                    <TextareaWithLabel
                    label={"Additional Information"}
                    value={
                        transaction.additionalInformation?.split(", ")
                        .join("\n")
                        .replaceAll("[", "[\n")
                        .replaceAll("]", "\n]")
                    }
                    readOnly
                    />
                </FormGroup>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Personal Information
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="last-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label
                                                    htmlFor="email-address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email-address"
                                                    id="email-address"
                                                    autoComplete="email"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="country"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Country
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6">
                                                <label
                                                    htmlFor="street-address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Street address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="street-address"
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label
                                                    htmlFor="city"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label
                                                    htmlFor="region"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    State / Province
                                                </label>
                                                <input
                                                    type="text"
                                                    name="region"
                                                    id="region"
                                                    autoComplete="address-level1"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label
                                                    htmlFor="postal-code"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    ZIP / Postal code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postal-code"
                                                    id="postal-code"
                                                    autoComplete="postal-code"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
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
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Decide which communications you&lsquo;`d like to receive and how.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                        <fieldset>
                                            <legend className="sr-only">By Email</legend>
                                            <div
                                                className="text-base font-medium text-gray-900"
                                                aria-hidden="true"
                                            >
                                                By Email
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            id="comments"
                                                            name="comments"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label
                                                            htmlFor="comments"
                                                            className="font-medium text-gray-700"
                                                        >
                                                            Comments
                                                        </label>
                                                        <p className="text-gray-500">
                                                            Get notified when someones posts a comment on a
                                                            posting.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            id="candidates"
                                                            name="candidates"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label
                                                            htmlFor="candidates"
                                                            className="font-medium text-gray-700"
                                                        >
                                                            Candidates
                                                        </label>
                                                        <p className="text-gray-500">
                                                            Get notified when a candidate applies for a job.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            id="offers"
                                                            name="offers"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label
                                                            htmlFor="offers"
                                                            className="font-medium text-gray-700"
                                                        >
                                                            Offers
                                                        </label>
                                                        <p className="text-gray-500">
                                                            Get notified when a candidate accepts or rejects an
                                                            offer.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="contents text-base font-medium text-gray-900">
                                                Push Notifications
                                            </legend>
                                            <p className="text-sm text-gray-500">
                                                These are delivered via SMS to your mobile phone.
                                            </p>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-everything"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="push-everything"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Everything
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-email"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="push-email"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Same as email
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="push-nothing"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        No push notifications
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
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
            </div>
        </DefaultPageLayout>
    )
}


export default Page