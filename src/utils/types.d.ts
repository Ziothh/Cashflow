import type { FC } from "react";

export type ComponentPropsFrom<Component extends FC<any>> = Parameters<Component>[0]