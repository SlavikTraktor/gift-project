import React from "react";
import cx from "classnames";

export type IconButtonProps = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  value?: string,
  border?: boolean,
};

export const IconButton = ({ className, border = false, ...props }: IconButtonProps) => {
  return (
    <button
      className={cx(
        "rounded-full box-border px-2 py-2 duration-100",
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
