import { ButtonProps as ButtonPropsAntd } from "antd";
import { ReactNode } from "react";
export interface ButtonProps extends ButtonPropsAntd {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
