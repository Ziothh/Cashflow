/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Menu, Transition } from '@headlessui/react'
import {
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/20/solid'
import {
    Bars3CenterLeftIcon,
    BellIcon, ScaleIcon
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import TransactionsTable from "../features/transactions/TransactionsTable"
import RecipientsShortList from "../features/recipients/RecipientsShortList"
import RemindersFeed from "../features/reminders/RemindersFeed"
import Section from "../components/layout/Section"


const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Spent this month', href: '#', icon: ScaleIcon, amount: '$30.45' },
  { name: 'Last income', href: '#', icon: ScaleIcon, amount: '$659.45' },
  // More items...
]

export default function Example() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

  const {data: session} = useSession()
  const user = session!.user!

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

        {/* Page header */}
        <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                    <img
                    className="hidden h-16 w-16 rounded-full sm:block"
                    src={user.image!}
                    alt=""
                    />
                    <div>
                    <div className="flex items-center">
                        <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src={user.image!}
                        alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Good morning, {user.name!}
                        </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                        <BuildingOfficeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                        />
                        Duke street studio
                        </dd>
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                        />
                        Verified account
                        </dd>
                    </dl>
                    </div>
                </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Add money
                </button>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Send money
                </button>
                </div>
            </div>
            </div>
        </div>

        <div className="my-8 px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <Section title="Overview">
                <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card */}
                    {cards.map((card) => (
                    <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                                <dd>
                                <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                                </dd>
                            </dl>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                            View all
                            </a>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </Section>

            <Section title="Recent activity">
                <TransactionsTable limit={10}/>

            </Section>

            <Section title="Feeds">
                <div className="flex flex-col sm:grid grid-cols-3 gap-5">
                    <div className="col-span-1">
                        <RecipientsShortList />
                    </div>
                    <div className="col-span-2">
                        <RemindersFeed/>
                    </div>
                </div>
            </Section>
        </div>
    </>
  )
}
