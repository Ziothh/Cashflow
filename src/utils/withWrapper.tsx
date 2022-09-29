import { FC, PropsWithChildren } from "react";

export const withWrapper = <Props extends Object = {},>(Component: FC<Props>, Wrapper: FC<PropsWithChildren<Props>>): FC<Props> => (props) => (
    <Wrapper {...props}>
        <Component {...props}/>
    </Wrapper>
)