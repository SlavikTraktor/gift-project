import { WishType } from "@/types/Wish";
import { useMemo } from "react";

export interface WishProps {
  editable: boolean;
  wish: WishType;
}

export const Wish = ({ wish, editable }: WishProps) => {
  const editableProps = useMemo(
    () => ({
      contentEditable: editable,
    }),
    [editable]
  );

  return (
    <div className="flex-1 text-center p-2">
      <h3
        className="mb-2 text-lg rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
        onInput={(e) => console.log(e.currentTarget.innerHTML)}
      >
        {wish.title}
      </h3>
      <div
        className="rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
      >
        {wish.description}
      </div>
    </div>
  );
};
