import type { FC } from "react";

export type GetProps<Component extends FC<any>> = Parameters<Component>[0]
export type PickProps<Component extends FC<any>, Keys extends keyof GetProps<Component>> = Pick<GetProps<Component>, Keys>