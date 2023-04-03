/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/indent */
import React, { LegacyRef } from "react";
import cx from "classnames";

export type TextInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "type" | "ref"
> & {
  deafultValue?: string;
  value?: string;
  type?: "password" | "text";
};

export const TextInput = React.forwardRef(
  (
    { deafultValue, value, type = "text", className, ...props }: TextInputProps,
    ref?: LegacyRef<HTMLInputElement>,
  ) => {
    return (
      <input
        className={cx(
          "bg-white text-main-500 px-4 py-2 rounded outline-none focus:ring-1 focus:ring-main-300",
          className,
        )}
        defaultValue={deafultValue}
        value={value}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
