import React from "react";
import cx from "classnames";

export type TextInputProps = Omit<React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>, "onChange" | "value" | "type"> & {
  onChange: (v: string) => void,
  deafultValue?: string,
  value?: string,
  type?: "password" | "text",
};

export const TextInput = ({
  onChange,
  deafultValue,
  value,
  type = "text",
  className,
  ...props
}: TextInputProps) => {
  return (
    <input
      className={cx(
        "bg-white text-main-500 px-4 py-2 rounded outline-none focus:ring-1 focus:ring-main-300",
        className,
      )}
      defaultValue={deafultValue}
      onChange={(v) => { onChange(v.target.value); }}
      value={value}
      type={type}
      {...props}
    />
  );
};
