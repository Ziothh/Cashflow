import { ReactNode } from "react";

export const reactNodeRender = (node: ReactNode, wrapperClassName?: string) => {
    const nodeType = typeof node
    const Tag = (nodeType === "string" || nodeType === "number" || nodeType === "bigint")
    ? "p"
    : "div"

    return <Tag className={wrapperClassName}>{node}</Tag>
}