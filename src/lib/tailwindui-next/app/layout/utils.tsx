import { Props } from "@headlessui/react/dist/types";
import { FC, PropsWithChildren } from "react";
import { LayoutContext } from "./context";

export const createLayout = <Props extends Object,>(LayoutComponent: FC<PropsWithChildren<Props>>): FC<PropsWithChildren<Props>> => (props) => (
    <LayoutContext>
        <LayoutComponent {...props} />
    </LayoutContext>
)