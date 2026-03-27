import { Input as InputAntd, InputProps } from "antd";

export const Input = ({ children, ...rest }: InputProps) => {
  return (
    <InputAntd
      classNames={{ input: "h-[39px]" }}
      {...rest}
    >
      {children}
    </InputAntd>
  );
};

Input.Password = InputAntd.Password;
Input.Search = InputAntd.Search;
Input.TextArea = InputAntd.TextArea;
Input.OTP = InputAntd.OTP;