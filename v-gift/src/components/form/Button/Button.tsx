import React from "react";
import cx from "classnames";

export type ButtonProps = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  value?: string,
  border?: boolean,
};

export const Button = ({ className, border = true, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(
        "rounded box-border px-3 py-1 duration-100",
        {
          "hover:bg-main-200": !props.disabled,
          border,
        },
        className,
      )}
      {...props}
    />
  );
};
