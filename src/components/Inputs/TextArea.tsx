import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";

export const TextArea = ({ ...rest }: TextAreaProps) => {
  return <Input.TextArea {...rest} />;
};
