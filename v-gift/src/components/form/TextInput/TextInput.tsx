import React from "react";
import cx from "classnames";

// export interface TextInputProps {
//   onChange: (v: string) => void;
//   deafultValue?: string;
//   value?: string;
//   type?: "password" | "text";
//   className?: string;
//   name?: string;
// }

export type TextInputProps = Omit<React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>, 'onChange' | 'value' | 'type'> & {
  onChange: (v: string) => void;
  deafultValue?: string;
  value?: string;
  type?: "password" | "text";
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
        "bg-neutral-900 border-neutral-600 text-neutral-100 px-4 py-1.5 border rounded-sm outline-none focus:border-blue-400",
        className
      )}
      defaultValue={deafultValue}
      onChange={(v) => onChange(v.target.value)}
      value={value}
      type={type}
      {...props}
    />
  );
};
