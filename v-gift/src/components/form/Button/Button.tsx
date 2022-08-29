import React from "react";
import cx from "classnames";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  value?: string;
};

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(
        "border rounded px-3 py-1 duration-100 hover:bg-main-250 ",
        className
      )}
      {...props}
    />
  );
};
