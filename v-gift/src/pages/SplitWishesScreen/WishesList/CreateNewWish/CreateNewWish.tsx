import { createWish, CreateWishParams } from "@/api/wish/createWish";
import { Loader } from "@/components/common/Loader";
import { WISHES_QUERY } from "@/constants/api";
import { WishType } from "@/types/Wish";
import { AddBoxOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cx from "classnames";
import { useCallback } from "react";

export interface CreateNewWishProps {
  onCreated?: (wish: WishType) => void;
  editable: boolean;
  className?: string;
}

export const CreateNewWish = ({ editable, className }: CreateNewWishProps) => {
  const queryClient = useQueryClient();

  const createWishMutation = useMutation(
    (wishParams?: CreateWishParams) => {
      return createWish(wishParams);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([WISHES_QUERY]);
      },
    }
  );

  const onCreateWish = useCallback(() => {
    createWishMutation.mutate(undefined);
  }, [createWishMutation]);

  if (!editable) {
    return null;
  }

  return (
    <div className={cx("m-1 mb-2 flex items-center", className)}>
      <Loader
        className={cx("opacity-0", {
          "opacity-100": createWishMutation.isLoading,
        })}
      />
      <AddBoxOutlined className="cursor-pointer" onClick={onCreateWish} />
    </div>
  );
};
