import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"

interface Props {
    /** The amount in abs or percentage */
    amount: number
    positive?: "positive" | "negative"
    className?: string
    tag?: "p" | "div" | "span"
    mode?: "percentage" | "absolute"
}


const TrendStat: React.FC<Props> = ({
    amount,
    positive = "positive",
    className,
    tag: Tag = "p",
    mode = "percentage",
}) => {
    const threshHold = mode === "percentage"
    ? 100
    : 0 // Abs

    const isZero = amount === threshHold
    const isPositive = amount >= threshHold

    const Icon = isZero
    ? null
    : isPositive
        ? ArrowUpIcon
        : ArrowDownIcon
            
    return (
        <Tag className={classNames("ml-2 inline-flex text-sm font-semibold items-center  ", className, {
            "text-green-600": (!isZero && positive === "positive") ? isPositive : !isPositive,
            "text-red-500": (!isZero && positive === "positive") ? !isPositive : isPositive,
            "text-gray-500": isZero,
        })}>
            {Icon && <Icon className="h-4 w-4 flex-shrink-0 self-center text-current"/>}
            <span className="sr-only"> {amount >= 0 ? "In" : "De"}creased by </span>
            {(amount - 100).toFixed(2)}
        </Tag>
    )
}


export default TrendStat