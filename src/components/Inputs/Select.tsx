import { Select as SelectAntd, SelectProps } from "antd";

export const Select = ({ className, ...rest }: SelectProps) => {
  return <SelectAntd {...rest} className={`h-[39px] w-full ${className}`} />;
};

Select.Option = SelectAntd.Option;
Select.OptGroup = SelectAntd.OptGroup;