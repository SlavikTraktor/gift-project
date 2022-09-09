import { updateWishesOrder as updateWishesOrderApi } from "@/api/wish/updateWishesOrder";
import { WishType } from "@/types/Wish";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WishDraggable } from "./Wish";

import { useDebouncedCallback } from "use-debounce";
import { CreateNewWish } from "./CreateNewWish";

export interface WishesListProps {
  name: string;
  editable?: boolean;
  wishes: WishType[];
}

export const WishesList = ({
  name,
  editable = false,
  wishes: wishes_,
}: WishesListProps) => {
  const [wishes, setWishes] = useState<WishType[]>([]);

  const updateOrderMutation = useMutation((wishes: number[]) => {
    return updateWishesOrderApi(wishes);
  });

  const updateOrderDebounced = useDebouncedCallback((wishes: WishType[]) => {
    updateOrderMutation.mutate(wishes.map((v) => v.id));
  }, 2000);

  const onDndDrop = useCallback(() => {
    updateOrderDebounced(wishes);
  }, [updateOrderDebounced, wishes]);

  const moveDnd = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (!wishes.length) return;
      const item = wishes[dragIndex];
      wishes[dragIndex] = wishes[hoverIndex];
      wishes[hoverIndex] = item;
      setWishes([...wishes]);
    },
    [wishes]
  );

  useEffect(() => {
    wishes_.length && !wishes.length && setWishes([...wishes_]);
  }, [wishes.length, wishes_]);

  const renderWish = useCallback(
    (wish: WishType, index: number) => {
      return (
        <WishDraggable
          key={wish.id}
          wish={wish}
          editable={editable}
          moveDnd={moveDnd}
          index={index}
          dndnamespace={name}
          onDrop={onDndDrop}
        />
      );
    },
    [editable, moveDnd, name, onDndDrop]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-2">
        <div className="flex border-b border-main-250  mb-2">
          <h1 className="text-3xl flex-1">{name}</h1>
          <CreateNewWish editable={editable} />
        </div>
        {wishes?.map((wish, i) => renderWish(wish, i))}
      </div>
    </DndProvider>
  );
};
