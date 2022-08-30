import { WishType } from "@/types/Wish";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Wish } from "./Wish";

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
  const moveDnd = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (!wishes_.length) return;
      const item = wishes_[dragIndex];
      wishes_[dragIndex] = wishes_[hoverIndex];
      wishes_[hoverIndex] = item;
      setWishes([...wishes_]);
    },
    [wishes_]
  );

  useEffect(() => {
    wishes_.length && !wishes.length && setWishes([...wishes_]);
  }, [wishes.length, wishes_]);

  const renderWish = useCallback(
    (wish: WishType, index: number) => {
      return (
        <Wish
          key={wish.id}
          wish={wish}
          editable={editable}
          moveDnd={moveDnd}
          index={index}
          dndnamespace={name}
        />
      );
    },
    [editable, moveDnd, name]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-2">
        <h1 className="text-3xl border-b border-main-250 mb-2">{name}</h1>
        {wishes?.map((wish, i) => renderWish(wish, i))}
      </div>
    </DndProvider>
  );
};
