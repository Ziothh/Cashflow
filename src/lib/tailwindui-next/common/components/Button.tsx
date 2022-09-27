import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import Link from "next/link"
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, Fragment, PropsWithChildren, ReactNode } from "react"
import { GetProps } from "../utils/typescript"
import Dropdown from "./Dropdown"

const SIZE_STYLES = {
    xs: "px-2.5 py-1.5 text-xs h-min",
    sm: "px-3 py-2 text-sm h-min",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-2 text-base",
    xl: "px-6 py-3 text-base",
} as const

const COLOR_STYLES = {
    primary: "text-white bg-indigo-500 hover:bg-indigo-600",
    neutral: "border-transparent bg-gray-600 text-white hover:bg-gray-700 text-white",
} as const

const WRAPPER_STYLES: {[key in keyof typeof COLOR_STYLES]: string} = {
    neutral: "",
    primary: "",
} 

type THTMLButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

interface TButtonProps {
    onClick?: THTMLButtonProps["onClick"]
    icon?: FC<{className?: string}>
}

interface Props extends TButtonProps {
    // href: GetProps<typof Link>
    type?: THTMLButtonProps["type"]
    size?: keyof typeof SIZE_STYLES
    theme?: keyof typeof COLOR_STYLES
    // iconPosition?: "start" | "end"
    subButtons?: GetProps<typeof Dropdown>["buttons"]
}
`
inline-flex items-center 
rounded-md border border-transparent 
shadow-sm 
focus:outline-none focus:ring-2 focus:ring-offset-2

$ {SIZE_STYLES[size]}
text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500
`

const Button: React.FC<PropsWithChildren<Props>> = ({
    onClick,
    icon: Icon,
    children,
    type = "button",
    size = "md",
    theme = "primary",
    subButtons,
}) => {
    const Wrapper: FC<PropsWithChildren<{}>> = subButtons 
    ? ({children}) => <div children={children}
        className={`flex rounded-md ${WRAPPER_STYLES[theme]}`}
    />
    : Fragment

    return (
        <Wrapper>
            <button type={type}
            onClick={onClick}
            className={classNames(
                `
                inline-flex items-center 
                rounded-md border border-transparent 
                font-medium leading-4
                shadow-sm
                outline-none
                space-x-1
                `,
                subButtons && "rounded-r-none",
                SIZE_STYLES[size],
                COLOR_STYLES[theme]
            )}
            >
                {Icon && (
                    <Icon className="-ml-1 mr-2 h-[1.25em] text-sm"/>
                )}
                {children}
            </button>

            {subButtons && (
                <Dropdown className="rounded-l-none"
                buttons={subButtons}
                />
            )}
        </Wrapper>
    )
}

export default Button