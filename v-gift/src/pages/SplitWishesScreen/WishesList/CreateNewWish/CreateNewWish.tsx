import { Loader } from "@/components/common/Loader";
import { WishType } from "@/types/Wish";
import { AddBoxOutlined } from "@mui/icons-material";
import cx from "classnames";
import { useState } from "react";

export interface CreateNewWishProps {
  onCreated?: (wish: WishType) => void;
  editable: boolean;
  className?: string;
}

export const CreateNewWish = ({ editable, className }: CreateNewWishProps) => {
  const [loading, setLoading] = useState(false);
  if (!editable) {
    return null;
  }
  return (
    <div className={cx("m-1 mb-2 flex items-center", className)}>
      <Loader className={cx("opacity-0", { "opacity-100": loading })} />
      <AddBoxOutlined className="cursor-pointer" />
    </div>
  );
};
